"""Token schemas."""

from typing import Optional
from pydantic import BaseModel


class Token(BaseModel):
    """Token response."""
    access_token: str
    token_type: str


class TokenPayload(BaseModel):
    """Token payload."""
    sub: Optional[str] = None
    exp: Optional[int] = None
