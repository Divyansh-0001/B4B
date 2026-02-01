from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.contact import ContactMessage
from app.schemas.contact import ContactCreate, ContactResponse

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def create_contact(payload: ContactCreate, db: Session = Depends(get_db)) -> ContactMessage:
    message = ContactMessage(
        name=payload.name,
        email=payload.email,
        company=payload.company,
        message=payload.message,
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message
