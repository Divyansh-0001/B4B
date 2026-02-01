from urllib.parse import urlencode

import logging

import httpx
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.core.config import get_settings
from app.core.security import (
    create_access_token,
    create_oauth_state,
    get_password_hash,
    verify_oauth_state,
    verify_password,
)
from app.models.user import User
from app.schemas.auth import GoogleAuthUrlResponse, LoginRequest, TokenResponse
from app.schemas.user import UserCreate, UserPublic
from app.services.google_oauth import build_google_auth_url, exchange_code_for_tokens, fetch_google_userinfo

router = APIRouter(prefix="/auth", tags=["auth"])
settings = get_settings()
logger = logging.getLogger("be4breach.auth")


@router.post("/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
def register_user(payload: UserCreate, db: Session = Depends(get_db)) -> User:
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    user = User(
        email=payload.email,
        full_name=payload.full_name,
        hashed_password=get_password_hash(payload.password),
    )
    try:
        db.add(user)
        db.commit()
        db.refresh(user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    except SQLAlchemyError as exc:
        db.rollback()
        logger.exception("User registration failed")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Registration failed") from exc
    return user


@router.post("/login", response_model=TokenResponse)
def login_user(payload: LoginRequest, db: Session = Depends(get_db)) -> TokenResponse:
    try:
        user = db.query(User).filter(User.email == payload.email).first()
    except SQLAlchemyError as exc:
        logger.exception("Login query failed")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Login failed") from exc
    if not user or not user.hashed_password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token({"sub": str(user.id), "email": user.email})
    return TokenResponse(access_token=token)


@router.get("/me", response_model=UserPublic)
def me(current_user: User = Depends(get_current_user)) -> User:
    return current_user


@router.get("/google/url", response_model=GoogleAuthUrlResponse)
def google_auth_url() -> GoogleAuthUrlResponse:
    if not settings.google_client_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Google SSO not configured")
    state = create_oauth_state()
    return GoogleAuthUrlResponse(authorization_url=build_google_auth_url(state), state=state)


@router.get("/google/callback", response_model=TokenResponse, include_in_schema=False)
async def google_callback(
    code: str,
    state: str,
    db: Session = Depends(get_db),
):
    if not verify_oauth_state(state):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid OAuth state")
    if not settings.google_client_id or not settings.google_client_secret:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Google SSO not configured")

    try:
        token_data = await exchange_code_for_tokens(code)
    except httpx.HTTPError as exc:
        logger.warning("Google token exchange failed: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Google authentication failed",
        ) from exc
    access_token = token_data.get("access_token")
    if not access_token:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to obtain access token")

    try:
        userinfo = await fetch_google_userinfo(access_token)
    except httpx.HTTPError as exc:
        logger.warning("Google userinfo request failed: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Google authentication failed",
        ) from exc
    email = userinfo.get("email")
    sub = userinfo.get("sub")
    full_name = userinfo.get("name")

    if not email or not sub:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incomplete Google profile")

    try:
        user = db.query(User).filter(User.email == email).first()
        if not user:
            user = User(email=email, full_name=full_name, oauth_provider="google", oauth_sub=sub)
            db.add(user)
        else:
            user.oauth_provider = "google"
            user.oauth_sub = sub
        db.commit()
        db.refresh(user)
    except SQLAlchemyError as exc:
        db.rollback()
        logger.exception("Google user persistence failed")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Authentication failed",
        ) from exc

    app_token = create_access_token({"sub": str(user.id), "email": user.email})

    if settings.frontend_url:
        query = urlencode({"token": app_token})
        return RedirectResponse(url=f"{settings.frontend_url}/auth/callback?{query}")

    return TokenResponse(access_token=app_token)
