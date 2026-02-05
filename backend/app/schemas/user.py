"""User schemas."""

from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    """Base user schema."""
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool = True


class UserCreate(BaseModel):
    """Schema for creating a user."""
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: Optional[str] = None
    role: Optional[str] = "user"  # Default role name


class UserUpdate(BaseModel):
    """Schema for updating a user."""
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(None, min_length=8)
    full_name: Optional[str] = None
    is_active: Optional[bool] = None


class RoleSchema(BaseModel):
    """Role schema."""
    id: int
    name: str
    description: Optional[str] = None
    
    model_config = {"from_attributes": True}


class UserInDB(UserBase):
    """Schema for user in database."""
    id: int
    is_verified: bool
    last_login_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    roles: List[str] = []  # List of role names

    model_config = {"from_attributes": True}


class User(UserInDB):
    """Public user schema."""
    pass


class UserLogin(BaseModel):
    """Schema for user login."""
    email: EmailStr
    password: str
