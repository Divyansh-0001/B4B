from __future__ import annotations

import logging
from typing import AsyncGenerator

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.core.config import settings


logger = logging.getLogger(__name__)

try:
    async_engine = create_async_engine(
        settings.database_url,
        echo=settings.db_echo,
        pool_pre_ping=True,
    )
except Exception as exc:  # pragma: no cover - defensive
    logger.warning("invalid_database_url_fallback", extra={"error": str(exc)})
    async_engine = create_async_engine(
        "sqlite+aiosqlite:///./be4breach.db",
        echo=settings.db_echo,
        pool_pre_ping=True,
    )

AsyncSessionLocal = async_sessionmaker(
    async_engine,
    expire_on_commit=False,
    class_=AsyncSession,
)


async def check_database() -> bool:
    try:
        async with async_engine.connect() as connection:
            await connection.execute(text("SELECT 1"))
        return True
    except Exception as exc:  # pragma: no cover - defensive
        logger.warning("database_check_failed", extra={"error": str(exc)})
        return False


async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session
