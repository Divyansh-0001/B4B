from datetime import timedelta
from time import time
from urllib.parse import parse_qs, urlencode, urlparse, urlunparse
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, EmailStr

from app.auth.google_oauth import build_google_auth_url, exchange_code_for_profile
from app.auth.jwt import get_current_user, require_roles
from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_refresh_token,
    get_password_hash,
    verify_password,
)
from app.models.user import Token, UserPublic, UserRole

router = APIRouter()


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class OAuthCallback(BaseModel):
    code: str
    state: str | None = None


class RefreshRequest(BaseModel):
    refresh_token: str


class SSOExchangeRequest(BaseModel):
    exchange_code: str


SSO_STATE_STORE: dict[str, dict[str, str | float]] = {}
SSO_EXCHANGE_STORE: dict[str, dict[str, object]] = {}


DEMO_USERS = {
    "admin@be4breach.com": {
        "password_hash": get_password_hash("AdminPassword123!"),
        "role": UserRole.ADMIN,
        "full_name": "Admin Operator",
    },
    "analyst@be4breach.com": {
        "password_hash": get_password_hash("AnalystPassword123!"),
        "role": UserRole.USER,
        "full_name": "Security Analyst",
    },
}


def _prune_store(store: dict[str, dict[str, object]], ttl_seconds: int) -> None:
    now = time()
    expired = [
        key
        for key, payload in store.items()
        if now - float(payload["ts"]) > ttl_seconds
    ]
    for key in expired:
        store.pop(key, None)


def _validate_redirect_target(redirect_url: str) -> str:
    parsed = urlparse(redirect_url)
    if not parsed.scheme or not parsed.netloc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid redirect target.",
        )
    origin = f"{parsed.scheme}://{parsed.netloc}"
    if origin != settings.frontend_origin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid redirect target.",
        )
    return redirect_url


def _append_query_param(url: str, key: str, value: str) -> str:
    parsed = urlparse(url)
    query = parse_qs(parsed.query)
    query[key] = [value]
    return urlunparse(parsed._replace(query=urlencode(query, doseq=True)))


def _build_token_response(email: str, role: UserRole) -> Token:
    access_expires = timedelta(minutes=settings.access_token_expire_minutes)
    refresh_expires = timedelta(days=settings.refresh_token_expire_days)
    access_token = create_access_token(
        subject=email, role=role.value, expires_delta=access_expires
    )
    refresh_token = create_refresh_token(subject=email, role=role.value)
    return Token(
        access_token=access_token,
        role=role,
        expires_in=int(access_expires.total_seconds()),
        refresh_token=refresh_token,
        refresh_expires_in=int(refresh_expires.total_seconds()),
    )


@router.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@router.post("/auth/login", response_model=Token)
def login(payload: LoginRequest) -> Token:
    record = DEMO_USERS.get(payload.email)
    if not record or not verify_password(payload.password, record["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials.",
        )
    return _build_token_response(payload.email, record["role"])


@router.get("/auth/me", response_model=UserPublic)
def read_me(user: UserPublic = Depends(get_current_user)) -> UserPublic:
    return user


@router.get("/admin/overview", response_model=dict)
def helpdesk_overview(
    _user: UserPublic = Depends(require_roles(UserRole.ADMIN)),
) -> dict[str, str]:
    return {
        "status": "restricted",
        "message": "Admin access verified.",
    }


@router.post("/auth/refresh", response_model=Token)
def refresh_token(payload: RefreshRequest) -> Token:
    try:
        data = decode_refresh_token(payload.refresh_token)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token.",
        ) from exc

    email = data.get("sub")
    role = data.get("role")
    if not email or not role:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token.",
        )
    try:
        role_value = UserRole(role)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token.",
        ) from exc

    return _build_token_response(email, role_value)


@router.get("/auth/google")
def google_login(redirect: str | None = None) -> dict[str, str]:
    state = uuid4().hex
    if redirect:
        _prune_store(SSO_STATE_STORE, settings.sso_state_ttl_seconds)
        safe_redirect = _validate_redirect_target(redirect)
        SSO_STATE_STORE[state] = {"redirect": safe_redirect, "ts": time()}
    return {"auth_url": build_google_auth_url(state)}


@router.get("/auth/google/callback", include_in_schema=False)
async def google_callback_get(code: str | None = None, state: str | None = None):
    if not code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google authentication failed.",
        )
    return await _handle_google_callback(code, state)


@router.post("/auth/google/callback", response_model=Token)
async def google_callback_post(payload: OAuthCallback) -> Token:
    return await _handle_google_callback(payload.code, None)


@router.post("/auth/google/exchange", response_model=Token)
def google_exchange(payload: SSOExchangeRequest) -> Token:
    _prune_store(SSO_EXCHANGE_STORE, settings.sso_exchange_ttl_seconds)
    exchange_payload = SSO_EXCHANGE_STORE.pop(payload.exchange_code, None)
    if not exchange_payload:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired SSO exchange code.",
        )
    token_data = exchange_payload.get("token")
    if not isinstance(token_data, dict):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired SSO exchange code.",
        )
    return Token(**token_data)


async def _handle_google_callback(code: str, state: str | None) -> Token | RedirectResponse:
    try:
        profile = await exchange_code_for_profile(code)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google authentication failed.",
        ) from exc

    token = _build_token_response(profile["email"], UserRole.USER)
    if not state:
        return token

    _prune_store(SSO_STATE_STORE, settings.sso_state_ttl_seconds)
    redirect_payload = SSO_STATE_STORE.pop(state, None)
    if not redirect_payload:
        return token

    redirect_url = redirect_payload.get("redirect")
    if not isinstance(redirect_url, str):
        return token

    exchange_code = uuid4().hex
    _prune_store(SSO_EXCHANGE_STORE, settings.sso_exchange_ttl_seconds)
    SSO_EXCHANGE_STORE[exchange_code] = {
        "token": token.model_dump(),
        "ts": time(),
    }
    redirect_target = _append_query_param(redirect_url, "exchange_code", exchange_code)
    return RedirectResponse(url=redirect_target, status_code=302)
