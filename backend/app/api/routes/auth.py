from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.audit import record_audit_event
from app.core.config import settings
from app.core.oauth import resolve_google_profile
from app.core.rbac import Role
from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    get_password_hash,
    verify_password
)
from app.db.models import User
from app.db.session import get_session
from app.schemas.auth import AuthResponse, GoogleAuthRequest, RefreshRequest, TokenPair
from app.schemas.user import UserRegister

router = APIRouter(prefix="/auth", tags=["auth"])


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


def _issue_tokens(user: User) -> TokenPair:
    access_token = create_access_token(subject=user.id, role=user.role)
    refresh_token = create_refresh_token(subject=user.id, role=user.role)
    return TokenPair(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=settings.jwt_exp_minutes * 60
    )


def _role_from_email(email: str) -> Role:
    domain = email.split("@")[-1].lower()
    if domain in [d.lower() for d in settings.google_allowed_domains]:
        return Role.PARTNER
    return Role.OPERATIVE


@router.post("/register", response_model=AuthResponse)
def register(
    payload: UserRegister,
    db: Session = Depends(get_session)
) -> AuthResponse:
    email = payload.email.lower().strip()
    _password_policy(payload.password)

    existing_user = db.scalar(select(User).where(User.email == email))
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered."
        )

    user = User(
        email=email,
        full_name=payload.full_name,
        role=Role.OPERATIVE,
        hashed_password=get_password_hash(payload.password),
        is_active=True,
        last_login_at=datetime.now(timezone.utc)
    )
    db.add(user)
    record_audit_event(
        db,
        actor_id=user.id,
        action="register",
        resource="user",
        detail={"email": email}
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

    return AuthResponse(user=user, tokens=_issue_tokens(user))


@router.post("/token", response_model=TokenPair)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_session)
) -> TokenPair:
    user = db.scalar(select(User).where(User.email == form_data.username.lower()))
    if not user or not user.hashed_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials."
        )
    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials."
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User inactive."
        )

    user.last_login_at = datetime.now(timezone.utc)
    record_audit_event(
        db,
        actor_id=user.id,
        action="login",
        resource="user",
        detail={"method": "password"}
    )
    db.commit()
    return _issue_tokens(user)


@router.post("/google", response_model=AuthResponse)
def google_auth(
    payload: GoogleAuthRequest,
    db: Session = Depends(get_session)
) -> AuthResponse:
    profile = resolve_google_profile(
        code=payload.code,
        id_token=payload.id_token,
        redirect_uri=payload.redirect_uri
    )
    email = (profile.get("email") or "").lower()
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google profile missing email."
        )

    user = db.scalar(select(User).where(User.email == email))
    if not user:
        user = User(
            email=email,
            full_name=profile.get("name"),
            role=_role_from_email(email),
            is_active=True,
            last_login_at=datetime.now(timezone.utc)
        )
        db.add(user)
        record_audit_event(
            db,
            actor_id=user.id,
            action="register",
            resource="user",
            detail={"email": email, "method": "google"}
        )
    else:
        user.full_name = user.full_name or profile.get("name")
        user.last_login_at = datetime.now(timezone.utc)
        record_audit_event(
            db,
            actor_id=user.id,
            action="login",
            resource="user",
            detail={"method": "google"}
        )

    db.commit()
    db.refresh(user)
    return AuthResponse(user=user, tokens=_issue_tokens(user))


@router.post("/refresh", response_model=TokenPair)
def refresh_tokens(
    payload: RefreshRequest,
    db: Session = Depends(get_session)
) -> TokenPair:
    try:
        token_payload = decode_token(payload.refresh_token)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token."
        )
    if token_payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token."
        )

    user = db.scalar(select(User).where(User.id == token_payload.get("sub")))
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not authorized."
        )
    return _issue_tokens(user)
