"""Contact inquiry API routes."""

from typing import Any, List
from fastapi import APIRouter, HTTPException, status, Request
from sqlalchemy import select

from app.core.logging import get_logger
from app.core.rate_limit import limiter
from app.core.sanitization import sanitize_string, sanitize_email
from app.models.contact_inquiry import ContactInquiry
from app.schemas.contact import ContactInquiryCreate, ContactInquiryResponse, ContactInquiryAdmin
from app.services.audit import AuditService
from app.api.deps import DBSession, CurrentSuperUser

router = APIRouter()
logger = get_logger(__name__)


@router.post("/", response_model=ContactInquiryResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("3/minute")  # Rate limit: 3 contact submissions per minute per IP
async def create_contact_inquiry(
    request: Request,
    inquiry: ContactInquiryCreate,
    db: DBSession
) -> Any:
    """Submit a contact inquiry."""
    ip_address, user_agent = AuditService.get_request_info(request)
    
    try:
        # Sanitize inputs
        name = sanitize_string(inquiry.name)
        email = sanitize_email(inquiry.email)
        subject = sanitize_string(inquiry.subject)
        message = sanitize_string(inquiry.message)
        phone = sanitize_string(inquiry.phone) if inquiry.phone else None
        company = sanitize_string(inquiry.company) if inquiry.company else None
        
        # Create inquiry
        contact_inquiry = ContactInquiry(
            name=name,
            email=email,
            phone=phone,
            company=company,
            subject=subject,
            message=message,
            ip_address=ip_address,
            user_agent=user_agent,
        )
        
        db.add(contact_inquiry)
        await db.flush()
        await db.refresh(contact_inquiry)
        
        # Log the inquiry
        logger.info(
            "contact_inquiry_created",
            inquiry_id=contact_inquiry.id,
            email=email,
            subject=subject
        )
        
        # Audit log
        await AuditService.log_action(
            db,
            action="contact_inquiry",
            status="success",
            resource_type="contact_inquiry",
            resource_id=contact_inquiry.id,
            details={"email": email, "subject": subject},
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        await db.commit()
        
        return contact_inquiry
        
    except ValueError as e:
        logger.warning("contact_inquiry_validation_failed", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error("contact_inquiry_error", error=str(e), exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to submit contact inquiry"
        )


@router.get("/", response_model=List[ContactInquiryAdmin])
async def list_contact_inquiries(
    db: DBSession,
    admin: CurrentSuperUser,
    skip: int = 0,
    limit: int = 50,
    unread_only: bool = False
) -> Any:
    """List all contact inquiries (admin only)."""
    try:
        query = select(ContactInquiry)
        
        if unread_only:
            query = query.filter(ContactInquiry.is_read == False)
        
        query = query.order_by(ContactInquiry.created_at.desc()).offset(skip).limit(limit)
        
        result = await db.execute(query)
        inquiries = result.scalars().all()
        
        logger.info(
            "contact_inquiries_listed",
            admin_id=admin.id,
            count=len(inquiries),
            unread_only=unread_only
        )
        
        return inquiries
        
    except Exception as e:
        logger.error("list_contact_inquiries_error", error=str(e), exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve contact inquiries"
        )


@router.put("/{inquiry_id}/mark-read")
async def mark_inquiry_read(
    inquiry_id: int,
    db: DBSession,
    admin: CurrentSuperUser
) -> Any:
    """Mark contact inquiry as read (admin only)."""
    try:
        result = await db.execute(
            select(ContactInquiry).filter(ContactInquiry.id == inquiry_id)
        )
        inquiry = result.scalar_one_or_none()
        
        if not inquiry:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact inquiry not found"
            )
        
        inquiry.is_read = True
        await db.commit()
        
        logger.info("contact_inquiry_marked_read", inquiry_id=inquiry_id, admin_id=admin.id)
        
        return {"status": "success"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("mark_inquiry_read_error", error=str(e), exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update inquiry"
        )
