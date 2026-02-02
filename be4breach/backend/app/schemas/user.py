from __future__ import annotations

from typing import List, Optional, Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=128)
    requested_role: Optional[Literal["member", "client"]] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str
    role: Optional[Literal["member", "client", "admin"]] = None


class UserRead(UserBase):
    id: str
    is_active: bool
    roles: List[str] = []
    oauth_provider: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
