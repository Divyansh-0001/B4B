from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import hash_password
from app.db.session import engine, SessionLocal
from app.models.base import Base
from app.models.role import Role
from app.models.user import User, UserRole


def _ensure_role(db: Session, name: str, description: str) -> Role:
    existing = db.scalar(select(Role).where(Role.name == name))
    if existing:
        return existing
    role = Role(name=name, description=description)
    db.add(role)
    db.flush()
    return role


def _assign_role(db: Session, user: User, role: Role) -> None:
    existing = db.scalar(
        select(UserRole).where(
            UserRole.user_id == user.id, UserRole.role_id == role.id
        )
    )
    if not existing:
        db.add(UserRole(user_id=user.id, role_id=role.id))


def init_db() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        admin_role = _ensure_role(
            db, "admin", "Full administrative access to the platform."
        )
        _ensure_role(db, "member", "Standard access for security operators.")
        _ensure_role(db, "client", "Customer-facing access for stakeholders.")

        if settings.ADMIN_BOOTSTRAP_EMAIL and settings.ADMIN_BOOTSTRAP_PASSWORD:
            user = db.scalar(
                select(User).where(User.email == settings.ADMIN_BOOTSTRAP_EMAIL)
            )
            if not user:
                user = User(
                    email=settings.ADMIN_BOOTSTRAP_EMAIL,
                    full_name="Admin User",
                    hashed_password=hash_password(
                        settings.ADMIN_BOOTSTRAP_PASSWORD
                    ),
                    is_active=True,
                )
                db.add(user)
                db.flush()
            _assign_role(db, user, admin_role)
        db.commit()
    finally:
        db.close()
