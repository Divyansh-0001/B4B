"""Authentication API routes."""

from datetime import timedelta
from typing import Any
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse
import secrets

from app.core.config import settings
from app.core.security import create_access_token, create_refresh_token, decode_access_token
from app.core.logging import get_logger
from app.core.exceptions import AuthenticationError, ValidationError
from app.schemas.token import Token, TokenRefresh
from app.schemas.user import UserCreate, User as UserSchema
from app.services.user import UserService
from app.services.auth import google_oauth_service
from app.api.deps import DBSession

router = APIRouter()
logger = get_logger(__name__)

# In-memory state storage (use Redis in production)
oauth_states = {}


@router.post("/register", response_model=UserSchema, status_code=status.HTTP_201_CREATED)
async def register(user_create: UserCreate, db: DBSession) -> Any:
    """Register a new user."""
    try:
        # Check if user exists
        user = await UserService.get_by_email(db, user_create.email)
        if user:
            logger.warning("registration_failed_duplicate_email", email=user_create.email)
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create user
        user = await UserService.create(db, user_create)
        logger.info("user_registered", user_id=user.id, email=user.email, role=user.role)
        return user
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("registration_error", error=str(e), exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Registration failed"
        )


@router.post("/login", response_model=Token)
async def login(
    db: DBSession,
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """Login with email and password. Returns access and refresh tokens."""
    try:
        user = await UserService.authenticate(db, form_data.username, form_data.password)
        
        if not user:
            logger.warning("login_failed_invalid_credentials", email=form_data.username)
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        if not user.is_active:
            logger.warning("login_failed_inactive_user", user_id=user.id)
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Inactive user"
            )
        
        # Create tokens
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            subject=user.id,
            expires_delta=access_token_expires
        )
        
        refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
        refresh_token = create_refresh_token(
            subject=user.id,
            expires_delta=refresh_token_expires
        )
        
        logger.info("user_logged_in", user_id=user.id, email=user.email)
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("login_error", error=str(e), exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed"
        )


@router.post("/refresh", response_model=Token)
async def refresh_token(token_refresh: TokenRefresh, db: DBSession) -> Any:
    """Refresh access token using refresh token."""
    try:
        # Decode refresh token
        token_data = decode_access_token(token_refresh.refresh_token)
        
        # Verify it's a refresh token
        if token_data.type != "refresh":
            logger.warning("invalid_token_type", expected="refresh", got=token_data.type)
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        if not token_data.sub:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Get user
        user = await UserService.get_by_id(db, int(token_data.sub))
        if not user or not user.is_active:
            logger.warning("refresh_token_user_not_found_or_inactive", user_id=token_data.sub)
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found or inactive",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Create new tokens
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            subject=user.id,
            expires_delta=access_token_expires
        )
        
        refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
        new_refresh_token = create_refresh_token(
            subject=user.id,
            expires_delta=refresh_token_expires
        )
        
        logger.info("token_refreshed", user_id=user.id)
        
        return {
            "access_token": access_token,
            "refresh_token": new_refresh_token,
            "token_type": "bearer"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("token_refresh_error", error=str(e), exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.get("/google")
async def google_login() -> Any:
    """Initiate Google OAuth2 login."""
    try:
        if not settings.GOOGLE_CLIENT_ID or not settings.GOOGLE_CLIENT_SECRET:
            logger.warning("google_oauth_not_configured")
            raise HTTPException(
                status_code=status.HTTP_501_NOT_IMPLEMENTED,
                detail="Google OAuth2 is not configured"
            )
        
        # Generate state for CSRF protection
        state = secrets.token_urlsafe(32)
        oauth_states[state] = True
        
        # Get authorization URL
        auth_url = await google_oauth_service.get_authorization_url(state)
        
        logger.info("google_oauth_initiated", state=state)
        
        return {"authorization_url": auth_url}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("google_oauth_initiation_error", error=str(e), exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to initiate Google login"
        )


@router.get("/google/callback")
async def google_callback(code: str, state: str, db: DBSession) -> Any:
    """Handle Google OAuth2 callback."""
    try:
        # Verify state
        if state not in oauth_states:
            logger.warning("google_oauth_invalid_state", state=state)
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid state parameter"
            )
        
        # Clean up state
        del oauth_states[state]
        
        # Exchange code for token
        token_data = await google_oauth_service.get_access_token(code)
        if not token_data:
            logger.error("google_oauth_token_exchange_failed")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to get access token"
            )
        
        # Get user info
        user_info = await google_oauth_service.get_user_info(token_data["access_token"])
        if not user_info:
            logger.error("google_oauth_userinfo_failed")
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
        
        # Create tokens
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            subject=user.id,
            expires_delta=access_token_expires
        )
        
        refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
        refresh_token = create_refresh_token(
            subject=user.id,
            expires_delta=refresh_token_expires
        )
        
        logger.info("google_oauth_success", user_id=user.id, email=user.email)
        
        # Redirect to frontend with tokens
        return RedirectResponse(
            url=f"{settings.FRONTEND_URL}/auth/callback?access_token={access_token}&refresh_token={refresh_token}"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("google_oauth_callback_error", error=str(e), exc_info=True)
        # Redirect to frontend with error
        return RedirectResponse(
            url=f"{settings.FRONTEND_URL}/auth/error?message=google_oauth_failed"
        )
