from __future__ import annotations

from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import hash_password, verify_password
from app.models.user import User


async def get_user_by_email(session: AsyncSession, email: str) -> Optional[User]:
    result = await session.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def authenticate_user(session: AsyncSession, email: str, password: str) -> Optional[User]:
    user = await get_user_by_email(session, email)
    if not user or not user.hashed_password or not user.is_active:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


async def create_user(
    session: AsyncSession,
    email: str,
    password: str | None,
    full_name: str | None = None,
    role: str = "user",
    oauth_provider: str | None = None,
    oauth_subject: str | None = None,
) -> User:
    user = User(
        email=email,
        full_name=full_name,
        role=role,
        hashed_password=hash_password(password) if password else None,
        oauth_provider=oauth_provider,
        oauth_subject=oauth_subject,
    )
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user


async def get_or_create_oauth_user(
    session: AsyncSession,
    provider: str,
    subject: str,
    email: str,
    full_name: str | None,
) -> User:
    result = await session.execute(
        select(User).where(User.oauth_provider == provider, User.oauth_subject == subject)
    )
    user = result.scalar_one_or_none()
    if user:
        return user

    existing = await get_user_by_email(session, email)
    if existing:
        existing.oauth_provider = provider
        existing.oauth_subject = subject
        if full_name and not existing.full_name:
            existing.full_name = full_name
        await session.commit()
        await session.refresh(existing)
        return existing

    return await create_user(
        session=session,
        email=email,
        password=None,
        full_name=full_name,
        role="user",
        oauth_provider=provider,
        oauth_subject=subject,
    )
