import asyncio
from pathlib import Path

from sqlalchemy import text
from sqlalchemy.exc import OperationalError

from app.core.config import settings
from app.db.base import Base
from app.db.session import engine


def _ensure_sqlite_directory() -> None:
    if not settings.database_url.startswith("sqlite:///"):
        return
    path = settings.database_url.replace("sqlite:///", "", 1)
    if path.startswith("./"):
        path = path[2:]
    db_path = Path(path)
    if db_path.parent:
        db_path.parent.mkdir(parents=True, exist_ok=True)


async def init_database() -> None:
    _ensure_sqlite_directory()
    attempts = settings.db_retry_attempts
    delay = settings.db_retry_backoff_seconds
    last_error: Exception | None = None

    for attempt in range(1, attempts + 1):
        try:
            async with engine.begin() as connection:
                await connection.run_sync(Base.metadata.create_all)
                await connection.execute(text("SELECT 1"))
            return
        except OperationalError as exc:
            last_error = exc
            if attempt == attempts:
                break
            await asyncio.sleep(delay * attempt)

    if last_error:
        raise last_error


async def close_database() -> None:
    await engine.dispose()
