from pathlib import Path

from sqlalchemy import text

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


def init_database() -> None:
    _ensure_sqlite_directory()
    Base.metadata.create_all(bind=engine)
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
