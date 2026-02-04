"""Contact inquiry schemas."""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class ContactInquiryCreate(BaseModel):
    """Schema for creating a contact inquiry."""
    name: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=50)
    company: Optional[str] = Field(None, max_length=255)
    subject: str = Field(..., min_length=3, max_length=255)
    message: str = Field(..., min_length=10)


class ContactInquiryResponse(BaseModel):
    """Response after creating contact inquiry."""
    id: int
    name: str
    email: str
    subject: str
    created_at: datetime
    
    model_config = {"from_attributes": True}


class ContactInquiryAdmin(BaseModel):
    """Admin view of contact inquiry."""
    id: int
    name: str
    email: str
    phone: Optional[str]
    company: Optional[str]
    subject: str
    message: str
    ip_address: Optional[str]
    is_read: bool
    is_responded: bool
    created_at: datetime
    responded_at: Optional[datetime]
    
    model_config = {"from_attributes": True}
