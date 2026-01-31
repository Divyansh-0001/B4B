from __future__ import annotations

import uuid
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import text
from starlette.middleware.trustedhost import TrustedHostMiddleware

from app.api.routes import auth, health, intel, users
from app.core.config import settings
from app.core.errors import ErrorResponse
from app.core.logging import configure_logging, logger
from app.db.init_db import close_database, init_database
from app.db.session import get_session
from app.schemas.system import HealthStatus


@asynccontextmanager
async def lifespan(app: FastAPI):
    configure_logging(settings.log_level)
    await init_database()
    logger.info("Be4Breach command core initialized.")
    yield
    await close_database()
    logger.info("Be4Breach command core shutdown complete.")


app = FastAPI(
    title=settings.app_name,
    openapi_url=f"{settings.api_v1_prefix}/openapi.json",
    docs_url=f"{settings.api_v1_prefix}/docs",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.add_middleware(TrustedHostMiddleware, allowed_hosts=settings.allowed_hosts)


@app.middleware("http")
async def request_id_middleware(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID") or str(uuid.uuid4())
    request.state.request_id = request_id
    try:
        response = await call_next(request)
    except Exception as exc:  # pragma: no cover - defensive guardrail
        logger.exception("Unhandled middleware error [%s]: %s", request_id, exc)
        payload = ErrorResponse(
            error="internal_error",
            detail="An internal error occurred.",
            request_id=request_id
        )
        response = JSONResponse(status_code=500, content=payload.model_dump())
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["Permissions-Policy"] = (
        "camera=(), microphone=(), geolocation=(), interest-cohort=()"
    )
    response.headers["Cross-Origin-Resource-Policy"] = "same-site"
    response.headers["Content-Security-Policy"] = (
        "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'"
    )
    response.headers["Cache-Control"] = "no-store"
    if settings.is_production:
        response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains"
    return response


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    request_id = getattr(request.state, "request_id", str(uuid.uuid4()))
    payload = ErrorResponse(
        error="request_error",
        detail=str(exc.detail),
        request_id=request_id
    )
    return JSONResponse(status_code=exc.status_code, content=payload.model_dump())


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    request_id = getattr(request.state, "request_id", str(uuid.uuid4()))
    payload = ErrorResponse(
        error="validation_error",
        detail=str(exc),
        request_id=request_id
    )
    return JSONResponse(status_code=422, content=payload.model_dump())


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    request_id = getattr(request.state, "request_id", str(uuid.uuid4()))
    logger.exception("Unhandled error [%s]: %s", request_id, exc)
    payload = ErrorResponse(
        error="internal_error",
        detail="An internal error occurred.",
        request_id=request_id
    )
    return JSONResponse(status_code=500, content=payload.model_dump())


app.include_router(health.router, prefix=settings.api_v1_prefix)
app.include_router(auth.router, prefix=settings.api_v1_prefix)
app.include_router(users.router, prefix=settings.api_v1_prefix)
app.include_router(intel.router, prefix=settings.api_v1_prefix)


@app.get("/health", include_in_schema=False, response_model=HealthStatus)
async def root_health(session=Depends(get_session)) -> HealthStatus:
    await session.execute(text("SELECT 1"))
    return HealthStatus(status="ok")
