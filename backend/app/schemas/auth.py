from __future__ import annotations

from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class Token(BaseModel):
    model_config = ConfigDict(extra="allow")

    access_token: str
    refresh_token: Optional[str] = None
    token_type: str = "bearer"
    expires_in: int


class TokenPayload(BaseModel):
    model_config = ConfigDict(extra="allow")

    sub: str
    role: str
    type: str = Field(default="access")


class LoginRequest(BaseModel):
    model_config = ConfigDict(extra="allow")

    email: EmailStr
    password: str


class SignupRequest(BaseModel):
    model_config = ConfigDict(extra="allow")

    email: EmailStr
    password: str
    full_name: Optional[str] = None
