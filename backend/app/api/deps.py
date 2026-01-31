from __future__ import annotations

from typing import Callable

from fastapi import Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.rbac import Role
from app.core.security import decode_token
from app.db.models import User
from app.db.session import get_session

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"{settings.api_v1_prefix}/auth/token",
    auto_error=False
)

SAFE_METHODS = {"GET", "HEAD", "OPTIONS"}


def _extract_token(request: Request, header_token: str | None) -> tuple[str | None, str | None]:
    if header_token:
        return header_token, "header"
    cookie_token = request.cookies.get(settings.auth_cookie_access_name)
    if cookie_token:
        return cookie_token, "cookie"
    return None, None


def _enforce_csrf(request: Request) -> None:
    if request.method in SAFE_METHODS:
        return
    csrf_cookie = request.cookies.get(settings.auth_cookie_csrf_name)
    csrf_header = request.headers.get(settings.csrf_header_name)
    if not csrf_cookie or not csrf_header or csrf_cookie != csrf_header:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="CSRF validation failed."
        )


async def get_current_user(
    request: Request,
    db: AsyncSession = Depends(get_session),
    header_token: str | None = Depends(oauth2_scheme)
) -> User:
    token, source = _extract_token(request, header_token)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authentication token."
        )
    if source == "cookie":
        _enforce_csrf(request)

    try:
        payload = decode_token(token)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token."
        )

    if payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid access token."
        )

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing subject."
        )

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not authorized."
        )
    token_role = payload.get("role")
    if token_role and token_role != user.role.value:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token role mismatch."
        )
    return user


def require_roles(*roles: Role) -> Callable[[User], User]:
    async def dependency(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions."
            )
        return current_user

    return dependency
