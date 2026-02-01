from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    company: str | None = None
    message: str


class ContactResponse(ContactCreate):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
