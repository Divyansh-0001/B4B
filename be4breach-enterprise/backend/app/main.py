from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response

from app.api.routes import router as api_router
from app.core.config import settings
from app.core.rate_limiter import InMemoryRateLimiter, RateLimitRule

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    description="Enterprise cybersecurity SaaS API",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept"],
)

app.include_router(api_router, prefix=settings.api_v1_prefix)

rate_limiter = InMemoryRateLimiter()
general_rule = RateLimitRule(
    max_requests=settings.rate_limit_per_minute, window_seconds=60
)
auth_rule = RateLimitRule(
    max_requests=settings.auth_rate_limit_per_minute, window_seconds=60
)


def _apply_security_headers(response: Response, request: Request) -> Response:
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
    response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
    response.headers["Cross-Origin-Resource-Policy"] = "same-origin"
    response.headers["Cross-Origin-Embedder-Policy"] = "require-corp"
    if request.url.scheme == "https" or settings.environment == "production":
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response


@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    if request.method == "OPTIONS":
        response = await call_next(request)
        return _apply_security_headers(response, request)

    client_host = request.client.host if request.client else "unknown"
    scope = (
        "auth"
        if request.url.path.startswith(f"{settings.api_v1_prefix}/auth")
        else "general"
    )
    rule = auth_rule if scope == "auth" else general_rule
    if rate_limiter.is_limited(f"{client_host}:{scope}", rule):
        response = JSONResponse(
            status_code=429,
            content={"detail": "Too many requests. Please try again later."},
        )
        return _apply_security_headers(response, request)

    response = await call_next(request)
    return _apply_security_headers(response, request)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    response = JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred."},
    )
    return _apply_security_headers(response, request)


@app.get("/health")
def root_health() -> dict[str, str]:
    return {"status": "ok"}
