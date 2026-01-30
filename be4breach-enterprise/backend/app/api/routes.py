from datetime import timedelta
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr

from app.auth.google_oauth import build_google_auth_url, exchange_code_for_profile
from app.auth.jwt import get_current_user, require_roles
from app.core.config import settings
from app.core.security import create_access_token, get_password_hash, verify_password
from app.models.user import Token, UserPublic, UserRole

router = APIRouter()


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class OAuthCallback(BaseModel):
    code: str
    state: str | None = None


DEMO_USERS = {
    "admin@be4breach.com": {
        "password_hash": get_password_hash("AdminPassword123!"),
        "role": UserRole.ADMIN,
        "full_name": "Admin Operator",
    },
    "analyst@be4breach.com": {
        "password_hash": get_password_hash("AnalystPassword123!"),
        "role": UserRole.USER,
        "full_name": "Security Analyst",
    },
}


@router.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@router.post("/auth/login", response_model=Token)
def login(payload: LoginRequest) -> Token:
    record = DEMO_USERS.get(payload.email)
    if not record or not verify_password(payload.password, record["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    expires = timedelta(minutes=settings.access_token_expire_minutes)
    token = create_access_token(
        subject=payload.email, role=record["role"].value, expires_delta=expires
    )
    return Token(
        access_token=token,
        role=record["role"],
        expires_in=int(expires.total_seconds()),
    )


@router.get("/auth/me", response_model=UserPublic)
def read_me(user: UserPublic = Depends(get_current_user)) -> UserPublic:
    return user


@router.get("/admin/overview", response_model=dict)
def helpdesk_overview(
    _user: UserPublic = Depends(require_roles(UserRole.ADMIN)),
) -> dict[str, str]:
    return {
        "status": "restricted",
        "message": "Admin access verified.",
    }


@router.get("/auth/google")
def google_login() -> dict[str, str]:
    state = uuid4().hex
    return {"auth_url": build_google_auth_url(state)}


@router.post("/auth/google/callback", response_model=Token)
async def google_callback(payload: OAuthCallback) -> Token:
    try:
        profile = await exchange_code_for_profile(payload.code)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)
        ) from exc

    expires = timedelta(minutes=settings.access_token_expire_minutes)
    token = create_access_token(
        subject=profile["email"], role=UserRole.USER.value, expires_delta=expires
    )
    return Token(
        access_token=token,
        role=UserRole.USER,
        expires_in=int(expires.total_seconds()),
    )
