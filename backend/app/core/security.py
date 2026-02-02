import hashlib
import secrets
from datetime import datetime, timedelta, timezone
from typing import Optional

import bcrypt
from fastapi import HTTPException, status
from jose import JWTError, jwt
from jose.exceptions import ExpiredSignatureError

from app.core.config import get_settings

MAX_PASSWORD_BYTES = 72


def hash_password(password: str) -> str:
    password_bytes = password.encode("utf-8")
    if len(password_bytes) > MAX_PASSWORD_BYTES:
        raise ValueError("password_too_long")
    return bcrypt.hashpw(password_bytes, bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, hashed_password: str) -> bool:
    password_bytes = password.encode("utf-8")
    if len(password_bytes) > MAX_PASSWORD_BYTES:
        return False
    try:
        return bcrypt.checkpw(password_bytes, hashed_password.encode("utf-8"))
    except ValueError:
        return False


def hash_refresh_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def _get_access_secret() -> str:
    settings = get_settings()
    if not settings.jwt_secret_key:
        raise RuntimeError("JWT access secret is not configured.")
    return settings.jwt_secret_key


def _get_refresh_secret() -> str:
    settings = get_settings()
    if not settings.jwt_refresh_secret_key:
        raise RuntimeError("JWT refresh secret is not configured.")
    return settings.jwt_refresh_secret_key


def create_access_token(
    subject: str,
    expires_delta: Optional[timedelta] = None
) -> tuple[str, datetime]:
    settings = get_settings()
    now = datetime.now(timezone.utc)
    expire = now + (
        expires_delta
        if expires_delta is not None
        else timedelta(minutes=settings.access_token_expire_minutes)
    )
    to_encode = {
        "sub": subject,
        "iat": int(now.timestamp()),
        "exp": int(expire.timestamp()),
        "type": "access"
    }
    token = jwt.encode(to_encode, _get_access_secret(), algorithm=settings.jwt_algorithm)
    return token, expire


def create_refresh_token(
    subject: str,
    expires_delta: Optional[timedelta] = None
) -> tuple[str, datetime]:
    settings = get_settings()
    now = datetime.now(timezone.utc)
    expire = now + (
        expires_delta
        if expires_delta is not None
        else timedelta(days=settings.refresh_token_expire_days)
    )
    to_encode = {
        "sub": subject,
        "iat": int(now.timestamp()),
        "exp": int(expire.timestamp()),
        "type": "refresh",
        "jti": secrets.token_urlsafe(16)
    }
    token = jwt.encode(to_encode, _get_refresh_secret(), algorithm=settings.jwt_algorithm)
    return token, expire


def decode_access_token(token: str) -> dict:
    return _decode_token(token, _get_access_secret(), "access")


def decode_refresh_token(token: str) -> dict:
    return _decode_token(token, _get_refresh_secret(), "refresh")


def _decode_token(token: str, secret: str, expected_type: str) -> dict:
    settings = get_settings()
    try:
        payload = jwt.decode(token, secret, algorithms=[settings.jwt_algorithm])
    except ExpiredSignatureError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="token_expired"
        ) from exc
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid_token"
        ) from exc

    if payload.get("type") != expected_type:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid_token_type"
        )
    return payload
