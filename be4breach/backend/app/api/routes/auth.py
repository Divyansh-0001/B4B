from __future__ import annotations

import secrets

from fastapi import APIRouter, Depends, HTTPException, status
from jose import JWTError
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
)
from app.db.session import get_db
from app.models.user import User
from app.schemas.token import Token
from app.schemas.user import UserCreate, UserLogin, UserRead
from app.services.auth_service import (
    assign_default_role,
    authenticate_user,
    create_user,
    get_user_by_email,
    user_role_names,
    update_oauth_profile,
)
from app.services.google_oauth import (
    build_authorization_url,
    exchange_code_for_tokens,
    fetch_userinfo,
)

router = APIRouter(prefix="/auth", tags=["auth"])


class RefreshTokenRequest(BaseModel):
    refresh_token: str


def _token_response(user: User) -> Token:
    roles = user_role_names(user)
    access_token = create_access_token(user.id, {"email": user.email, "roles": roles})
    refresh_token = create_refresh_token(user.id, {"email": user.email})
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    existing = get_user_by_email(db, user_in.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered.",
        )
    user = create_user(db, user_in)
    return UserRead(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        is_active=user.is_active,
        roles=user_role_names(user),
        oauth_provider=user.oauth_provider,
    )


@router.post("/login", response_model=Token)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = authenticate_user(db, credentials.email, credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )
    return _token_response(user)


@router.post("/refresh", response_model=Token)
def refresh_token(payload: RefreshTokenRequest, db: Session = Depends(get_db)):
    try:
        decoded = decode_token(payload.refresh_token)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token.",
        )
    if decoded.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token type.",
        )
    user_id = decoded.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token payload.",
        )
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found.",
        )
    return _token_response(user)


@router.get("/me", response_model=UserRead)
def me(user=Depends(get_current_user)):
    return UserRead(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        is_active=user.is_active,
        roles=user_role_names(user),
        oauth_provider=user.oauth_provider,
    )


@router.get("/google/login")
def google_login():
    if not settings.google_oauth_enabled:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Google OAuth is not configured.",
        )
    state = secrets.token_urlsafe(16)
    authorization_url = build_authorization_url(state=state)
    return {"authorization_url": authorization_url, "state": state}


@router.get("/google/callback", response_model=Token)
def google_callback(code: str, db: Session = Depends(get_db)):
    if not settings.google_oauth_enabled:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Google OAuth is not configured.",
        )
    try:
        token_payload = exchange_code_for_tokens(code)
    except Exception as exc:  # pragma: no cover - network error
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unable to exchange Google authorization code.",
        ) from exc
    access_token = token_payload.get("access_token")
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google token response missing access token.",
        )
    try:
        profile = fetch_userinfo(access_token)
    except Exception as exc:  # pragma: no cover - network error
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unable to fetch Google profile.",
        ) from exc
    email = profile.get("email")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google profile missing email address.",
        )
    user = get_user_by_email(db, email)
    if not user:
        user = User(
            email=email,
            full_name=profile.get("name"),
            is_active=True,
        )
        db.add(user)
        db.flush()
        assign_default_role(db, user)
    elif not user.roles:
        assign_default_role(db, user)
    update_oauth_profile(db, user, "google", profile.get("sub"))
    db.commit()
    db.refresh(user)
    return _token_response(user)
