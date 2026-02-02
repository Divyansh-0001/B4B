from datetime import datetime, timezone

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_refresh_token,
    hash_password,
    verify_password
)
from app.models.refresh_token import RefreshToken
from app.models.user import User, UserRole


async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def create_user(
    db: AsyncSession,
    email: str,
    password: str,
    role: UserRole = UserRole.USER
) -> User:
    user = User(
        email=email,
        hashed_password=hash_password(password),
        role=role,
        is_active=True
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


async def authenticate_user(
    db: AsyncSession,
    email: str,
    password: str
) -> User:
    user = await get_user_by_email(db, email)
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid_credentials"
        )
    if not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid_credentials"
        )
    return user


async def issue_tokens(db: AsyncSession, user: User) -> dict:
    access_token, access_exp = create_access_token(str(user.id))
    refresh_token, refresh_exp = create_refresh_token(str(user.id))
    token_hash = hash_refresh_token(refresh_token)

    db.add(
        RefreshToken(
            user_id=user.id,
            token_hash=token_hash,
            expires_at=refresh_exp
        )
    )
    await db.commit()

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "expires_in": int((access_exp - datetime.now(timezone.utc)).total_seconds()),
        "refresh_expires_in": int(
            (refresh_exp - datetime.now(timezone.utc)).total_seconds()
        )
    }


async def rotate_refresh_token(db: AsyncSession, refresh_token: str) -> dict:
    from app.core.security import decode_refresh_token

    payload = decode_refresh_token(refresh_token)
    user_id = int(payload["sub"])
    token_hash = hash_refresh_token(refresh_token)

    result = await db.execute(
        select(RefreshToken).where(RefreshToken.token_hash == token_hash)
    )
    stored = result.scalar_one_or_none()
    now = datetime.now(timezone.utc)
    if not stored or stored.revoked_at is not None or stored.expires_at <= now:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid_refresh_token"
        )

    user = await db.get(User, user_id)
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="user_inactive"
        )

    stored.revoked_at = now
    db.add(stored)

    access_token, access_exp = create_access_token(str(user_id))
    new_refresh_token, refresh_exp = create_refresh_token(str(user_id))
    db.add(
        RefreshToken(
            user_id=user_id,
            token_hash=hash_refresh_token(new_refresh_token),
            expires_at=refresh_exp
        )
    )
    await db.commit()

    return {
        "access_token": access_token,
        "refresh_token": new_refresh_token,
        "expires_in": int((access_exp - now).total_seconds()),
        "refresh_expires_in": int((refresh_exp - now).total_seconds())
    }


async def revoke_refresh_token(db: AsyncSession, refresh_token: str) -> None:
    token_hash = hash_refresh_token(refresh_token)
    result = await db.execute(
        select(RefreshToken).where(RefreshToken.token_hash == token_hash)
    )
    stored = result.scalar_one_or_none()
    if not stored:
        return
    stored.revoked_at = datetime.now(timezone.utc)
    db.add(stored)
    await db.commit()
