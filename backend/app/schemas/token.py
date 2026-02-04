"""Token schemas."""

from typing import Optional, Literal
from pydantic import BaseModel


class Token(BaseModel):
    """Token response."""
    access_token: str
    refresh_token: str
    token_type: str


class TokenRefresh(BaseModel):
    """Token refresh request."""
    refresh_token: str


class TokenPayload(BaseModel):
    """Token payload."""
    sub: Optional[str] = None
    exp: Optional[int] = None
    type: Optional[Literal["access", "refresh"]] = None
