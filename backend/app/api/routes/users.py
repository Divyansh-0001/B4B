from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_roles
from app.core.audit import record_audit_event
from app.core.rbac import Role
from app.core.security import get_password_hash
from app.db.models import User
from app.db.session import get_session
from app.schemas.user import UserCreate, UserPublic, UserRoleUpdate

router = APIRouter(prefix="/users", tags=["users"])


def _password_policy(password: str) -> None:
    if len(password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters."
        )
    if password.lower() == password or password.upper() == password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must include upper and lower case letters."
        )
    if not any(char.isdigit() for char in password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must include at least one digit."
        )


@router.get("/me", response_model=UserPublic)
def read_users_me(current_user: User = Depends(get_current_user)) -> User:
    return current_user


@router.get("", response_model=list[UserPublic])
def list_users(
    db: Session = Depends(get_session),
    _: User = Depends(require_roles(Role.COMMAND))
) -> list[User]:
    return db.scalars(select(User).order_by(User.created_at.desc())).all()


@router.post("", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
def create_user(
    payload: UserCreate,
    db: Session = Depends(get_session),
    current_user: User = Depends(require_roles(Role.COMMAND))
) -> User:
    email = payload.email.lower().strip()
    existing = db.scalar(select(User).where(User.email == email))
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered."
        )

    _password_policy(payload.password)

    user = User(
        email=email,
        full_name=payload.full_name,
        role=payload.role,
        hashed_password=get_password_hash(payload.password),
        is_active=payload.is_active,
        last_login_at=None
    )
    db.add(user)
    record_audit_event(
        db,
        actor_id=current_user.id,
        action="create_user",
        resource="user",
        detail={"created": email, "role": payload.role.value}
    )
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered."
        )
    db.refresh(user)
    return user


@router.patch("/{user_id}/role", response_model=UserPublic)
def update_user_role(
    user_id: str,
    payload: UserRoleUpdate,
    db: Session = Depends(get_session),
    current_user: User = Depends(require_roles(Role.COMMAND))
) -> User:
    user = db.scalar(select(User).where(User.id == user_id))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )
    user.role = payload.role
    user.last_login_at = user.last_login_at or datetime.now(timezone.utc)
    record_audit_event(
        db,
        actor_id=current_user.id,
        action="update_role",
        resource="user",
        detail={"target": user.email, "role": payload.role.value}
    )
    db.commit()
    db.refresh(user)
    return user
