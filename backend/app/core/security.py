from __future__ import annotations

import secrets
import uuid
from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import settings
from app.core.rbac import Role

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def _create_token(
    subject: str,
    role: Role,
    expires_delta: timedelta,
    token_type: str,
    session_id: str,
    token_id: str
) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": subject,
        "role": role.value,
        "type": token_type,
        "sid": session_id,
        "jti": token_id,
        "iat": int(now.timestamp()),
        "exp": int((now + expires_delta).timestamp())
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def create_access_token(subject: str, role: Role, session_id: str) -> str:
    return _create_token(
        subject,
        role,
        timedelta(minutes=settings.jwt_exp_minutes),
        "access",
        session_id,
        str(uuid.uuid4())
    )


def create_refresh_token(subject: str, role: Role, session_id: str) -> str:
    return _create_token(
        subject,
        role,
        timedelta(minutes=settings.jwt_refresh_exp_minutes),
        "refresh",
        session_id,
        str(uuid.uuid4())
    )


def create_token_pair(subject: str, role: Role) -> tuple[str, str, str]:
    session_id = str(uuid.uuid4())
    access_token = create_access_token(subject, role, session_id)
    refresh_token = create_refresh_token(subject, role, session_id)
    return access_token, refresh_token, session_id


def generate_csrf_token() -> str:
    return secrets.token_urlsafe(32)


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
    except JWTError as exc:  # pragma: no cover - handled by caller
        raise ValueError("Invalid token") from exc
