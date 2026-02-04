"""User service."""

from datetime import datetime, timezone
from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.models.role import Role
from app.models.user_role import UserRole
from app.models.oauth_account import OAuthAccount
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import get_password_hash, verify_password
from app.services.role import RoleService
from app.core.logging import get_logger

logger = get_logger(__name__)


class UserService:
    """User service for database operations."""

    @staticmethod
    async def get_by_email(db: AsyncSession, email: str) -> Optional[User]:
        """Get user by email."""
        result = await db.execute(select(User).filter(User.email == email))
        return result.scalar_one_or_none()

    @staticmethod
    async def get_by_id(db: AsyncSession, user_id: int) -> Optional[User]:
        """Get user by ID."""
        result = await db.execute(select(User).filter(User.id == user_id))
        return result.scalar_one_or_none()

    @staticmethod
    async def create(db: AsyncSession, user_create: UserCreate) -> User:
        """Create a new user with default role."""
        user = User(
            email=user_create.email,
            hashed_password=get_password_hash(user_create.password),
            full_name=user_create.full_name,
        )
        db.add(user)
        await db.flush()
        await db.refresh(user)
        
        # Assign default role
        role_name = user_create.role if hasattr(user_create, 'role') and user_create.role else "user"
        role = await RoleService.get_role_by_name(db, role_name)
        if role:
            await RoleService.assign_role_to_user(db, user.id, role.id)
        
        logger.info("user_created", user_id=user.id, email=user.email)
        return user

    @staticmethod
    async def create_oauth_user(
        db: AsyncSession,
        email: str,
        full_name: Optional[str],
        oauth_provider: str,
        oauth_provider_id: str,
        role_name: str = "user"
    ) -> User:
        """Create a user from OAuth."""
        user = User(
            email=email,
            full_name=full_name,
            is_verified=True,  # OAuth users are pre-verified
        )
        db.add(user)
        await db.flush()
        await db.refresh(user)
        
        # Create OAuth account link
        oauth_account = OAuthAccount(
            user_id=user.id,
            provider=oauth_provider,
            provider_user_id=oauth_provider_id,
            provider_email=email,
            provider_name=full_name,
        )
        db.add(oauth_account)
        
        # Assign default role
        role = await RoleService.get_role_by_name(db, role_name)
        if role:
            await RoleService.assign_role_to_user(db, user.id, role.id)
        
        await db.flush()
        logger.info("oauth_user_created", user_id=user.id, provider=oauth_provider)
        return user

    @staticmethod
    async def update(
        db: AsyncSession,
        user: User,
        user_update: UserUpdate
    ) -> User:
        """Update user."""
        update_data = user_update.model_dump(exclude_unset=True)
        
        if "password" in update_data:
            update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
        
        for field, value in update_data.items():
            setattr(user, field, value)
        
        await db.flush()
        await db.refresh(user)
        return user

    @staticmethod
    async def authenticate(
        db: AsyncSession,
        email: str,
        password: str
    ) -> Optional[User]:
        """Authenticate user with email and password."""
        user = await UserService.get_by_email(db, email)
        if not user:
            return None
        if not user.hashed_password:
            return None  # OAuth user
        if not verify_password(password, user.hashed_password):
            return None
        return user

    @staticmethod
    async def get_or_create_oauth_user(
        db: AsyncSession,
        email: str,
        full_name: Optional[str],
        oauth_provider: str,
        oauth_provider_id: str
    ) -> User:
        """Get existing OAuth user or create new one."""
        # Check for existing OAuth account
        result = await db.execute(
            select(OAuthAccount).filter(
                OAuthAccount.provider == oauth_provider,
                OAuthAccount.provider_user_id == oauth_provider_id
            )
        )
        oauth_account = result.scalar_one_or_none()
        
        if oauth_account:
            # Get the user
            user = await UserService.get_by_id(db, oauth_account.user_id)
            if user:
                # Update last login
                user.last_login_at = datetime.now(timezone.utc)
                await db.flush()
                return user
        
        # Try to find by email
        user = await UserService.get_by_email(db, email)
        
        if user:
            # Link OAuth account to existing user
            oauth_account = OAuthAccount(
                user_id=user.id,
                provider=oauth_provider,
                provider_user_id=oauth_provider_id,
                provider_email=email,
                provider_name=full_name,
            )
            db.add(oauth_account)
            user.is_verified = True
            user.last_login_at = datetime.now(timezone.utc)
            await db.flush()
            logger.info("oauth_account_linked", user_id=user.id, provider=oauth_provider)
            return user
        
        # Create new user with OAuth account
        return await UserService.create_oauth_user(
            db, email, full_name, oauth_provider, oauth_provider_id
        )
