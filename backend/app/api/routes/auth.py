from __future__ import annotations

import logging
from typing import Any, Dict

import httpx
from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import create_access_token, create_refresh_token
from app.dependencies import get_current_user, get_db
from app.models.user import User
from app.schemas.auth import LoginRequest, SignupRequest, Token
from app.schemas.user import UserPublic
from app.services.auth_service import authenticate_user, create_user, get_user_by_email, get_or_create_oauth_user


logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(get_db),
):
    user = await authenticate_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect credentials")
    access_token = create_access_token(user.email, user.role)
    refresh_token = create_refresh_token(user.email, user.role)
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=settings.access_token_expire_minutes * 60,
    )


@router.post("/login", response_model=Token)
async def login_json(payload: LoginRequest, session: AsyncSession = Depends(get_db)):
    user = await authenticate_user(session, payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect credentials")
    access_token = create_access_token(user.email, user.role)
    refresh_token = create_refresh_token(user.email, user.role)
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=settings.access_token_expire_minutes * 60,
    )


@router.post("/signup", response_model=UserPublic)
async def signup(payload: SignupRequest, session: AsyncSession = Depends(get_db)):
    if not settings.allow_signup:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Signup disabled")
    existing = await get_user_by_email(session, payload.email)
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Account already exists")
    user = await create_user(
        session=session,
        email=payload.email,
        password=payload.password,
        full_name=payload.full_name,
        role="user",
    )
    return UserPublic.model_validate(user, from_attributes=True)


@router.get("/me", response_model=UserPublic)
async def me(user: User = Depends(get_current_user)):
    return UserPublic.model_validate(user, from_attributes=True)


@router.get("/google/login")
async def google_login() -> Dict[str, Any]:
    if not (settings.google_client_id and settings.google_redirect_uri):
        return {"enabled": False, "url": None}
    params = {
        "client_id": settings.google_client_id,
        "redirect_uri": settings.google_redirect_uri,
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "online",
        "prompt": "select_account",
    }
    url = httpx.URL(settings.google_auth_url).copy_add_params(params)
    return {"enabled": True, "url": str(url)}


@router.get("/google/callback", response_model=Token)
async def google_callback(
    code: str | None = Query(default=None),
    session: AsyncSession = Depends(get_db),
):
    if not (settings.google_client_id and settings.google_client_secret and settings.google_redirect_uri):
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Google SSO disabled")
    if not code:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing authorization code")

    token_payload = {
        "code": code,
        "client_id": settings.google_client_id,
        "client_secret": settings.google_client_secret,
        "redirect_uri": settings.google_redirect_uri,
        "grant_type": "authorization_code",
    }

    async with httpx.AsyncClient(timeout=10) as client:
        token_response = await client.post(settings.google_token_url, data=token_payload)
        if token_response.status_code >= 400:
            logger.warning(
                "google_token_exchange_failed",
                extra={"status_code": token_response.status_code},
            )
            raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="SSO token exchange failed")
        token_data = token_response.json()
        access_token = token_data.get("access_token")
        if not access_token:
            raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="SSO token missing")

        userinfo_response = await client.get(
            "https://openidconnect.googleapis.com/v1/userinfo",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        if userinfo_response.status_code >= 400:
            logger.warning(
                "google_userinfo_failed",
                extra={"status_code": userinfo_response.status_code},
            )
            raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="SSO userinfo failed")
        userinfo = userinfo_response.json()

    email = userinfo.get("email")
    subject = userinfo.get("sub")
    full_name = userinfo.get("name")
    if not email or not subject:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="SSO profile incomplete")

    user = await get_or_create_oauth_user(
        session=session,
        provider="google",
        subject=subject,
        email=email,
        full_name=full_name,
    )
    issued_access = create_access_token(user.email, user.role)
    issued_refresh = create_refresh_token(user.email, user.role)
    return Token(
        access_token=issued_access,
        refresh_token=issued_refresh,
        expires_in=settings.access_token_expire_minutes * 60,
    )
