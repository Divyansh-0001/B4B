import logging
from logging.config import dictConfig

from app.core.config import get_settings


def configure_logging() -> None:
    settings = get_settings()
    log_level = settings.log_level
    dictConfig(
        {
            "version": 1,
            "disable_existing_loggers": False,
            "formatters": {
                "default": {
                    "format": (
                        "time=%(asctime)s level=%(levelname)s "
                        "name=%(name)s message=%(message)s"
                    ),
                    "datefmt": "%Y-%m-%dT%H:%M:%S%z"
                }
            },
            "handlers": {
                "console": {
                    "class": "logging.StreamHandler",
                    "formatter": "default",
                    "stream": "ext://sys.stdout"
                }
            },
            "root": {
                "level": log_level,
                "handlers": ["console"]
            },
            "loggers": {
                "uvicorn": {
                    "level": log_level,
                    "handlers": ["console"],
                    "propagate": False
                },
                "uvicorn.error": {
                    "level": log_level,
                    "handlers": ["console"],
                    "propagate": False
                },
                "uvicorn.access": {
                    "level": "WARNING",
                    "handlers": ["console"],
                    "propagate": False
                }
            }
        }
    )
    logging.getLogger(__name__).debug("logging_configured level=%s", log_level)
