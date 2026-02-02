from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import hash_password, verify_password
from app.models.role import Role
from app.models.user import User, UserRole
from app.schemas.user import UserCreate


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.scalar(select(User).where(User.email == email))


def get_user_by_id(db: Session, user_id: str) -> User | None:
    return db.scalar(select(User).where(User.id == user_id))


def _ensure_role(db: Session, name: str, description: str) -> Role:
    role = db.scalar(select(Role).where(Role.name == name))
    if role:
        return role
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


def create_user(db: Session, user_in: UserCreate) -> User:
    user = User(
        email=user_in.email,
        full_name=user_in.full_name,
        hashed_password=hash_password(user_in.password),
        is_active=True,
    )
    db.add(user)
    db.flush()
    assign_default_role(db, user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, email: str, password: str) -> User | None:
    user = get_user_by_email(db, email)
    if not user or not user.hashed_password:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def user_role_names(user: User) -> list[str]:
    return [assignment.role.name for assignment in user.roles if assignment.role]


def assign_default_role(db: Session, user: User) -> None:
    member_role = _ensure_role(
        db, "member", "Standard access for security operators."
    )
    _assign_role(db, user, member_role)


def update_oauth_profile(
    db: Session, user: User, provider: str, sub: str | None
) -> None:
    user.oauth_provider = provider
    if sub:
        user.oauth_sub = sub
    db.add(user)
