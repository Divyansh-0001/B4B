import asyncio
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import api_router
from app.core.config import get_settings, validate_settings
from app.core.exceptions import register_exception_handlers
from app.core.logging import configure_logging

logger = logging.getLogger("be4breach")


def create_app() -> FastAPI:
    configure_logging()
    settings = get_settings()

    app = FastAPI(title=settings.project_name)
    app.state.settings = settings

    register_exception_handlers(app)

    if settings.cors_allowed_origins:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=[str(origin) for origin in settings.cors_allowed_origins],
            allow_credentials=True,
            allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
            allow_headers=["Authorization", "Content-Type"]
        )
        logger.info(
            "cors_enabled origins=%s",
            ",".join(str(origin) for origin in settings.cors_allowed_origins)
        )
    else:
        logger.info("cors_disabled reason=no_allowed_origins_configured")

    @app.on_event("startup")
    async def startup_event() -> None:
        try:
            validate_settings(settings)
        except Exception as exc:
            logger.error("startup_validation_failed error=%s", exc)
            raise

        loop = asyncio.get_running_loop()
        loop.set_exception_handler(_handle_async_exception)

        if not settings.database_url:
            logger.warning(
                "database_unconfigured detail=BE4BREACH_DATABASE_URL not set"
            )
        logger.info("startup_complete environment=%s", settings.environment)

    @app.get("/health", tags=["health"])
    def health() -> dict:
        return {"status": "ok"}

    @app.get("/ready", tags=["health"])
    def ready() -> dict:
        return {"status": "ok"}

    app.include_router(api_router)
    return app


def _handle_async_exception(loop: asyncio.AbstractEventLoop, context: dict) -> None:
    msg = context.get("message", "asyncio_exception")
    exc = context.get("exception")
    logger.error("asyncio_exception message=%s", msg, exc_info=exc)
