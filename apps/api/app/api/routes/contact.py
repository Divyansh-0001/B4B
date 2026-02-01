import logging

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.contact import ContactRequest
from app.schemas.contact import ContactCreate, ContactResponse

router = APIRouter(prefix="/contact", tags=["contact"])
logger = logging.getLogger("be4breach.contact")


@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def create_contact(payload: ContactCreate, db: Session = Depends(get_db)) -> ContactRequest:
    message = ContactRequest(
        name=payload.name,
        email=payload.email,
        company=payload.company,
        message=payload.message,
    )
    try:
        db.add(message)
        db.commit()
        db.refresh(message)
    except SQLAlchemyError as exc:
        db.rollback()
        logger.exception("Contact submission failed")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to submit request",
        ) from exc
    return message
