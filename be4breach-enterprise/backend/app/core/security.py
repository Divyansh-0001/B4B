from datetime import datetime, timedelta, timezone
from typing import Any, Literal

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import settings

ALGORITHM = "HS256"
TOKEN_TYPE_ACCESS = "access"
TOKEN_TYPE_REFRESH = "refresh"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def _create_token(
    subject: str,
    role: str,
    expires_delta: timedelta,
    token_type: Literal["access", "refresh"],
) -> str:
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode: dict[str, Any] = {
        "sub": subject,
        "role": role,
        "typ": token_type,
        "exp": expire,
    }
    return jwt.encode(to_encode, settings.secret_key, algorithm=ALGORITHM)


def create_access_token(
    subject: str,
    role: str,
    expires_delta: timedelta | None = None,
) -> str:
    if expires_delta is None:
        expires_delta = timedelta(minutes=settings.access_token_expire_minutes)
    return _create_token(subject, role, expires_delta, TOKEN_TYPE_ACCESS)


def create_refresh_token(subject: str, role: str) -> str:
    expires_delta = timedelta(days=settings.refresh_token_expire_days)
    return _create_token(subject, role, expires_delta, TOKEN_TYPE_REFRESH)


def _decode_token(token: str, expected_type: str | None = None) -> dict[str, Any]:
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[ALGORITHM])
    except JWTError as exc:
        raise ValueError("Invalid or expired token.") from exc

    if expected_type and payload.get("typ") != expected_type:
        raise ValueError("Invalid token type.")
    return payload


def decode_access_token(token: str) -> dict[str, Any]:
    return _decode_token(token, TOKEN_TYPE_ACCESS)


def decode_refresh_token(token: str) -> dict[str, Any]:
    return _decode_token(token, TOKEN_TYPE_REFRESH)
