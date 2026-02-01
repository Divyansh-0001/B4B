from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class UserBase(BaseModel):
    model_config = ConfigDict(extra="allow")

    id: str
    email: EmailStr
    full_name: str | None = None
    role: str
    is_active: bool
    created_at: datetime


class UserPublic(UserBase):
    pass
