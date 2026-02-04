"""Rate limiting configuration."""

from slowapi import Limiter
from slowapi.util import get_remote_address
from fastapi import Request


def get_client_identifier(request: Request) -> str:
    """
    Get client identifier for rate limiting.
    Uses X-Forwarded-For if behind proxy, otherwise remote address.
    """
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return get_remote_address(request)


# Create limiter instance
limiter = Limiter(
    key_func=get_client_identifier,
    default_limits=["100/minute"],  # Global rate limit
    storage_uri="memory://",  # Use Redis in production
)
