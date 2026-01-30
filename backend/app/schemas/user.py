from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.core.rbac import Role


class UserBase(BaseModel):
    email: EmailStr
    full_name: str | None = None
    role: Role
    is_active: bool


class UserPublic(UserBase):
    id: str
    created_at: datetime
    last_login_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str | None = None
    password: str = Field(min_length=8)
    role: Role = Role.OPERATIVE
    is_active: bool = True


class UserRegister(BaseModel):
    email: EmailStr
    full_name: str | None = None
    password: str = Field(min_length=8)


class UserRoleUpdate(BaseModel):
    role: Role
