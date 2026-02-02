from typing import AsyncGenerator, Optional

from fastapi import HTTPException, status
from sqlalchemy.engine import URL, make_url
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine
)

from app.core.config import settings


def get_async_database_url() -> Optional[URL]:
    if not settings.database_url:
        return None
    url = make_url(str(settings.database_url))
    if url.drivername.startswith("postgresql") and "+psycopg" not in url.drivername:
        url = url.set(drivername="postgresql+psycopg")
    return url


database_url = get_async_database_url()
engine = create_async_engine(database_url, pool_pre_ping=True) if database_url else None

SessionLocal: Optional[async_sessionmaker[AsyncSession]] = (
    async_sessionmaker(bind=engine, expire_on_commit=False)
    if engine
    else None
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    if SessionLocal is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database not configured"
        )
    async with SessionLocal() as session:
        yield session
