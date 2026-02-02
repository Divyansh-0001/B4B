import secrets

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.responses import RedirectResponse

from app.core.config import get_settings
from app.core.oauth import get_google_oauth
from app.db.session import get_db
from app.schemas.auth import LoginRequest, RefreshRequest, TokenResponse
from app.services.auth import (
    authenticate_user,
    create_user,
    get_user_by_email,
    issue_tokens,
    rotate_refresh_token
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
async def login(
    payload: LoginRequest,
    db: AsyncSession = Depends(get_db)
) -> TokenResponse:
    user = await authenticate_user(db, payload.email, payload.password)
    tokens = await issue_tokens(db, user)
    return TokenResponse(**tokens)


@router.post("/refresh", response_model=TokenResponse)
async def refresh(
    payload: RefreshRequest,
    db: AsyncSession = Depends(get_db)
) -> TokenResponse:
    tokens = await rotate_refresh_token(db, payload.refresh_token)
    return TokenResponse(**tokens)


@router.get("/google/login")
async def google_login(request: Request) -> RedirectResponse:
    oauth = get_google_oauth()
    if not oauth:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="google_oauth_not_configured"
        )
    settings = get_settings()
    redirect_uri = (
        str(settings.google_redirect_uri) if settings.google_redirect_uri else None
    )
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/google/callback", response_model=TokenResponse)
async def google_callback(
    request: Request,
    db: AsyncSession = Depends(get_db)
) -> TokenResponse:
    oauth = get_google_oauth()
    if not oauth:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="google_oauth_not_configured"
        )
    token = await oauth.google.authorize_access_token(request)
    user_info = token.get("userinfo")
    if not user_info:
        response = await oauth.google.get("userinfo", token=token)
        user_info = response.json()

    email = user_info.get("email") if isinstance(user_info, dict) else None
    email_verified = (
        user_info.get("email_verified", True) if isinstance(user_info, dict) else False
    )
    if not email or not email_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="invalid_google_account"
        )

    user = await get_user_by_email(db, email)
    if not user:
        user = await create_user(db, email, secrets.token_urlsafe(32))
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="user_inactive"
        )
    tokens = await issue_tokens(db, user)
    return TokenResponse(**tokens)
