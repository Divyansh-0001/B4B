from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.concurrency import run_in_threadpool

from app.core.audit import record_audit_event
from app.core.config import settings
from app.core.oauth import resolve_google_profile
from app.core.rbac import Role
from app.core.security import (
    create_token_pair,
    generate_csrf_token,
    decode_token,
    get_password_hash,
    verify_password
)
from app.core.rate_limiter import rate_limit_auth
from app.db.models import User
from app.db.session import get_session
from app.schemas.auth import AuthResponse, GoogleAuthRequest, RefreshRequest, TokenPair
from app.schemas.user import UserRegister

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    dependencies=[Depends(rate_limit_auth)]
)


def _password_policy(password: str) -> None:
    if len(password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters."
        )
    if password.lower() == password or password.upper() == password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must include upper and lower case letters."
        )
    if not any(char.isdigit() for char in password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must include at least one digit."
        )


def _issue_tokens(user: User) -> tuple[TokenPair, str]:
    access_token, refresh_token, _ = create_token_pair(
        subject=user.id,
        role=user.role
    )
    csrf_token = generate_csrf_token()
    tokens = TokenPair(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=settings.jwt_exp_minutes * 60
    )
    return tokens, csrf_token


def _set_auth_cookies(response: Response, tokens: TokenPair, csrf_token: str) -> None:
    refresh_max_age = settings.jwt_refresh_exp_minutes * 60
    response.set_cookie(
        key=settings.auth_cookie_access_name,
        value=tokens.access_token,
        httponly=True,
        secure=settings.auth_cookie_secure,
        samesite=settings.auth_cookie_samesite,
        max_age=tokens.expires_in,
        path="/",
        domain=settings.auth_cookie_domain
    )
    response.set_cookie(
        key=settings.auth_cookie_refresh_name,
        value=tokens.refresh_token,
        httponly=True,
        secure=settings.auth_cookie_secure,
        samesite=settings.auth_cookie_samesite,
        max_age=refresh_max_age,
        path="/",
        domain=settings.auth_cookie_domain
    )
    response.set_cookie(
        key=settings.auth_cookie_csrf_name,
        value=csrf_token,
        httponly=False,
        secure=settings.auth_cookie_secure,
        samesite=settings.auth_cookie_samesite,
        max_age=refresh_max_age,
        path="/",
        domain=settings.auth_cookie_domain
    )
    response.headers[settings.csrf_header_name] = csrf_token


def _role_from_email(email: str) -> Role:
    domain = email.split("@")[-1].lower()
    if domain in [d.lower() for d in settings.google_allowed_domains]:
        return Role.PARTNER
    return Role.OPERATIVE


@router.post("/register", response_model=AuthResponse)
async def register(
    payload: UserRegister,
    response: Response,
    db: AsyncSession = Depends(get_session)
) -> AuthResponse:
    email = payload.email.lower().strip()
    _password_policy(payload.password)

    existing_user_result = await db.execute(select(User).where(User.email == email))
    existing_user = existing_user_result.scalar_one_or_none()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered."
        )

    hashed_password = await run_in_threadpool(get_password_hash, payload.password)
    user = User(
        email=email,
        full_name=payload.full_name,
        role=Role.OPERATIVE,
        hashed_password=hashed_password,
        is_active=True,
        last_login_at=datetime.now(timezone.utc)
    )
    db.add(user)
    record_audit_event(
        db,
        actor_id=user.id,
        action="register",
        resource="user",
        detail={"email": email}
    )
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered."
        )
    await db.refresh(user)

    tokens, csrf_token = _issue_tokens(user)
    _set_auth_cookies(response, tokens, csrf_token)
    return AuthResponse(user=user, tokens=tokens)


@router.post("/token", response_model=TokenPair)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    response: Response,
    db: AsyncSession = Depends(get_session)
) -> TokenPair:
    if not form_data.username or not form_data.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username and password are required."
        )
    result = await db.execute(select(User).where(User.email == form_data.username.lower()))
    user = result.scalar_one_or_none()
    if not user or not user.hashed_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials."
        )
    password_valid = await run_in_threadpool(
        verify_password,
        form_data.password,
        user.hashed_password
    )
    if not password_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials."
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User inactive."
        )

    user.last_login_at = datetime.now(timezone.utc)
    record_audit_event(
        db,
        actor_id=user.id,
        action="login",
        resource="user",
        detail={"method": "password"}
    )
    await db.commit()
    tokens, csrf_token = _issue_tokens(user)
    _set_auth_cookies(response, tokens, csrf_token)
    return tokens


@router.post("/google", response_model=AuthResponse)
async def google_auth(
    payload: GoogleAuthRequest,
    response: Response,
    db: AsyncSession = Depends(get_session)
) -> AuthResponse:
    profile = await resolve_google_profile(
        code=payload.code,
        id_token=payload.id_token,
        redirect_uri=payload.redirect_uri
    )
    email = (profile.get("email") or "").lower()
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google profile missing email."
        )

    user_result = await db.execute(select(User).where(User.email == email))
    user = user_result.scalar_one_or_none()
    if not user:
        user = User(
            email=email,
            full_name=profile.get("name"),
            role=_role_from_email(email),
            is_active=True,
            last_login_at=datetime.now(timezone.utc)
        )
        db.add(user)
        record_audit_event(
            db,
            actor_id=user.id,
            action="register",
            resource="user",
            detail={"email": email, "method": "google"}
        )
    else:
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User inactive."
            )
        user.full_name = user.full_name or profile.get("name")
        user.last_login_at = datetime.now(timezone.utc)
        record_audit_event(
            db,
            actor_id=user.id,
            action="login",
            resource="user",
            detail={"method": "google"}
        )

    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        user_result = await db.execute(select(User).where(User.email == email))
        user = user_result.scalar_one_or_none()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered."
            )
    await db.refresh(user)
    tokens, csrf_token = _issue_tokens(user)
    _set_auth_cookies(response, tokens, csrf_token)
    return AuthResponse(user=user, tokens=tokens)


@router.post("/refresh", response_model=TokenPair)
async def refresh_tokens(
    payload: RefreshRequest,
    response: Response,
    db: AsyncSession = Depends(get_session)
) -> TokenPair:
    try:
        token_payload = decode_token(payload.refresh_token)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token."
        )
    if token_payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token."
        )

    user_id = token_payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token."
        )
    user_result = await db.execute(select(User).where(User.id == user_id))
    user = user_result.scalar_one_or_none()
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not authorized."
        )
    tokens, csrf_token = _issue_tokens(user)
    _set_auth_cookies(response, tokens, csrf_token)
    return tokens
