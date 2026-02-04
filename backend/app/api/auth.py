"""Authentication API routes."""

from datetime import timedelta
from typing import Any
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse
import secrets

from app.core.config import settings
from app.core.security import create_access_token
from app.schemas.token import Token
from app.schemas.user import UserCreate, User as UserSchema
from app.services.user import UserService
from app.services.auth import google_oauth_service
from app.api.deps import DBSession

router = APIRouter()

# In-memory state storage (use Redis in production)
oauth_states = {}


@router.post("/register", response_model=UserSchema, status_code=status.HTTP_201_CREATED)
async def register(user_create: UserCreate, db: DBSession) -> Any:
    """Register a new user."""
    # Check if user exists
    user = await UserService.get_by_email(db, user_create.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    user = await UserService.create(db, user_create)
    return user


@router.post("/login", response_model=Token)
async def login(
    db: DBSession,
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """Login with email and password."""
    user = await UserService.authenticate(db, form_data.username, form_data.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user.id,
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.get("/google")
async def google_login() -> Any:
    """Initiate Google OAuth2 login."""
    if not settings.GOOGLE_CLIENT_ID or not settings.GOOGLE_CLIENT_SECRET:
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail="Google OAuth2 is not configured"
        )
    
    # Generate state for CSRF protection
    state = secrets.token_urlsafe(32)
    oauth_states[state] = True
    
    # Get authorization URL
    auth_url = await google_oauth_service.get_authorization_url(state)
    return {"authorization_url": auth_url}


@router.get("/google/callback")
async def google_callback(code: str, state: str, db: DBSession) -> Any:
    """Handle Google OAuth2 callback."""
    # Verify state
    if state not in oauth_states:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid state parameter"
        )
    
    # Clean up state
    del oauth_states[state]
    
    # Exchange code for token
    token_data = await google_oauth_service.get_access_token(code)
    if not token_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to get access token"
        )
    
    # Get user info
    user_info = await google_oauth_service.get_user_info(token_data["access_token"])
    if not user_info:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to get user info"
        )
    
    # Get or create user
    user = await UserService.get_or_create_oauth_user(
        db,
        email=user_info["email"],
        full_name=user_info.get("name"),
        oauth_provider="google",
        oauth_id=user_info["id"]
    )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user.id,
        expires_delta=access_token_expires
    )
    
    # Redirect to frontend with token
    return RedirectResponse(
        url=f"{settings.FRONTEND_URL}/auth/callback?token={access_token}"
    )
