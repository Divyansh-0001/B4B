from __future__ import annotations

import logging
import os
import uuid
from contextlib import asynccontextmanager
from typing import Callable

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware

from app.api.router import api_router
from app.core.config import settings
from app.core.errors import error_payload
from app.core.headers import SecurityHeadersMiddleware
from app.core.logging import log_exception, setup_logging
from app.core.rate_limit import RateLimiter
from app.db.base import Base
from app.db.session import async_engine, check_database
import app.models  # noqa: F401


logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging(settings.log_level)
    app.state.rate_limiter = RateLimiter(settings.rate_limit_per_minute)
    app.state.db_available = await check_database()
    if not os.getenv("JWT_SECRET"):
        logger.warning("jwt_secret_missing_defaulted")

    if app.state.db_available:
        try:
            async with async_engine.begin() as connection:
                await connection.run_sync(Base.metadata.create_all)
        except Exception as exc:  # pragma: no cover - defensive
            logger.warning("db_schema_init_failed", extra={"error": str(exc)})
            app.state.db_available = False

    yield
    await async_engine.dispose()


app = FastAPI(title=settings.app_name, lifespan=lifespan)

origins = settings.cors_origins or ["*"]
allow_credentials = False if "*" in origins else True

app.add_middleware(TrustedHostMiddleware, allowed_hosts=settings.trusted_host_patterns)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(SecurityHeadersMiddleware, is_production=settings.env.lower() == "production")


def resolve_client_ip(request: Request) -> str:
    forwarded_for = request.headers.get("x-forwarded-for")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    if request.client:
        return request.client.host
    return "unknown"


@app.middleware("http")
async def request_context_middleware(request: Request, call_next: Callable):
    request_id = request.headers.get("x-request-id", str(uuid.uuid4()))
    limiter: RateLimiter | None = getattr(request.app.state, "rate_limiter", None)
    if limiter is None:
        limiter = RateLimiter(settings.rate_limit_per_minute)
        request.app.state.rate_limiter = limiter
    client_key = f"{resolve_client_ip(request)}:{request.url.path}"
    rate_status = limiter.check(client_key)
    if not rate_status.allowed:
        return JSONResponse(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            content=error_payload("rate_limited", "Too many requests", request_id),
            headers={
                "X-RateLimit-Remaining": str(rate_status.remaining),
                "X-RateLimit-Reset": str(rate_status.reset_in_seconds),
                "X-Request-ID": request_id,
            },
        )

    logger.info(
        "request_start",
        extra={"request_id": request_id, "path": request.url.path, "method": request.method},
    )
    try:
        response = await call_next(request)
    except RequestValidationError:
        log_exception("validation_error", request_id, level="warning")
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content=error_payload("validation_error", "Invalid request payload", request_id),
            headers={"X-Request-ID": request_id},
        )
    except HTTPException as exc:
        log_exception(
            "http_exception",
            request_id,
            status_code=exc.status_code,
            detail=str(exc.detail),
            level="warning",
        )
        return JSONResponse(
            status_code=exc.status_code,
            content=error_payload("http_error", exc.detail, request_id),
            headers={"X-Request-ID": request_id},
        )
    except SQLAlchemyError as exc:
        log_exception("database_error", request_id, exc=exc, level="warning")
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content=error_payload("database_unavailable", "Database unavailable", request_id),
            headers={"X-Request-ID": request_id},
        )
    except Exception as exc:
        log_exception("unhandled_exception", request_id, exc=exc)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=error_payload("internal_error", "Unexpected server error", request_id),
            headers={"X-Request-ID": request_id},
        )

    response.headers["X-Request-ID"] = request_id
    response.headers["X-RateLimit-Remaining"] = str(rate_status.remaining)
    response.headers["X-RateLimit-Reset"] = str(rate_status.reset_in_seconds)
    logger.info(
        "request_complete",
        extra={
            "request_id": request_id,
            "status_code": response.status_code,
            "path": request.url.path,
        },
    )
    return response


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    request_id = request.headers.get("x-request-id")
    log_exception("validation_error", request_id, level="warning")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=error_payload("validation_error", "Invalid request payload", request_id),
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    request_id = request.headers.get("x-request-id")
    log_exception(
        "http_exception",
        request_id,
        status_code=exc.status_code,
        detail=str(exc.detail),
        level="warning",
    )
    return JSONResponse(
        status_code=exc.status_code,
        content=error_payload("http_error", exc.detail, request_id),
    )


@app.get("/")
async def root_status():
    return {"name": settings.app_name, "status": "online"}


app.include_router(api_router)
