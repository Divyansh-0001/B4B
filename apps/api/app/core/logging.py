import logging

from app.core.config import get_settings


def configure_logging() -> logging.Logger:
    settings = get_settings()
    level = logging.DEBUG if settings.environment == "development" else logging.INFO

    logging.basicConfig(
        level=level,
        format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    )

    return logging.getLogger("be4breach")
