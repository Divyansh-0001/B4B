import secrets

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from fastapi.responses import JSONResponse
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

ACCESS_COOKIE_NAME = "be4breach_access_token"
REFRESH_COOKIE_NAME = "be4breach_refresh_token"


def _set_auth_cookies(
    response: Response,
    access_token: str,
    refresh_token: str
) -> None:
    settings = get_settings()
    secure = settings.environment == "production"
    response.set_cookie(
        ACCESS_COOKIE_NAME,
        access_token,
        httponly=True,
        secure=secure,
        samesite="lax",
        path="/"
    )
    response.set_cookie(
        REFRESH_COOKIE_NAME,
        refresh_token,
        httponly=True,
        secure=secure,
        samesite="lax",
        path="/"
    )


def _clear_auth_cookies(response: Response) -> None:
    response.delete_cookie(ACCESS_COOKIE_NAME, path="/")
    response.delete_cookie(REFRESH_COOKIE_NAME, path="/")


@router.post("/login", response_model=TokenResponse)
async def login(
    payload: LoginRequest,
    response: Response,
    db: AsyncSession = Depends(get_db)
) -> TokenResponse:
    user = await authenticate_user(db, payload.email, payload.password)
    tokens = await issue_tokens(db, user)
    _set_auth_cookies(response, tokens["access_token"], tokens["refresh_token"])
    return TokenResponse(**tokens)


@router.post("/refresh", response_model=TokenResponse)
async def refresh(
    payload: RefreshRequest,
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_db)
) -> TokenResponse:
    refresh_token = payload.refresh_token or request.cookies.get(REFRESH_COOKIE_NAME)
    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid_refresh_token"
        )
    tokens = await rotate_refresh_token(db, refresh_token)
    _set_auth_cookies(response, tokens["access_token"], tokens["refresh_token"])
    return TokenResponse(**tokens)


@router.get("/google/login")
async def google_login(
    request: Request,
    redirect: str | None = None
) -> RedirectResponse:
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
    state = None
    if redirect and settings.frontend_url and redirect.startswith(
        str(settings.frontend_url)
    ):
        state = redirect
    return await oauth.google.authorize_redirect(request, redirect_uri, state=state)


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
    state = request.query_params.get("state")
    if state:
        response = RedirectResponse(url=state)
        _set_auth_cookies(response, tokens["access_token"], tokens["refresh_token"])
        return response
    response = JSONResponse(content=TokenResponse(**tokens).model_dump())
    _set_auth_cookies(response, tokens["access_token"], tokens["refresh_token"])
    return response


@router.post("/logout")
async def logout(response: Response) -> dict:
    _clear_auth_cookies(response)
    return {"status": "ok"}
