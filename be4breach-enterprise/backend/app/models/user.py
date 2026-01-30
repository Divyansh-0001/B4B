from enum import Enum

from pydantic import BaseModel, EmailStr, Field


class UserRole(str, Enum):
    USER = "USER"
    ADMIN = "ADMIN"


class UserBase(BaseModel):
    email: EmailStr
    full_name: str | None = None
    role: UserRole = UserRole.USER
    is_active: bool = True


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserPublic(UserBase):
    pass


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: UserRole
    expires_in: int
