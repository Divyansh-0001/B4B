import os

os.environ.setdefault("BE4BREACH_JWT_SECRET_KEY", "test-secret")
os.environ.setdefault("BE4BREACH_JWT_REFRESH_SECRET_KEY", "test-refresh-secret")
os.environ.setdefault("BE4BREACH_ENVIRONMENT", "test")
os.environ.setdefault("BE4BREACH_LOG_LEVEL", "CRITICAL")

import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.core.config import get_settings
from app.db.base import Base
from app.db.session import get_db
from app.main import create_app


@pytest_asyncio.fixture
async def async_session_factory():
    get_settings.cache_clear()
    engine = create_async_engine("sqlite+aiosqlite:///:memory:", future=True)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    session_factory = async_sessionmaker(engine, expire_on_commit=False)
    try:
        yield session_factory
    finally:
        await engine.dispose()


@pytest_asyncio.fixture
async def app(async_session_factory):
    get_settings.cache_clear()
    app = create_app()

    async def _get_db_override():
        async with async_session_factory() as session:
            yield session

    app.dependency_overrides[get_db] = _get_db_override
    return app


@pytest_asyncio.fixture
async def client(app):
    transport = ASGITransport(app=app, lifespan="on")
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        yield client
