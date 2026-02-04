"""User service."""

from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User, UserRole
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import get_password_hash, verify_password


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
        """Create a new user."""
        user = User(
            email=user_create.email,
            hashed_password=get_password_hash(user_create.password),
            full_name=user_create.full_name,
            role=user_create.role,
        )
        db.add(user)
        await db.flush()
        await db.refresh(user)
        return user

    @staticmethod
    async def create_oauth_user(
        db: AsyncSession,
        email: str,
        full_name: Optional[str],
        oauth_provider: str,
        oauth_id: str,
        role: UserRole = UserRole.USER
    ) -> User:
        """Create a user from OAuth."""
        user = User(
            email=email,
            full_name=full_name,
            oauth_provider=oauth_provider,
            oauth_id=oauth_id,
            role=role,
            is_verified=True,  # OAuth users are pre-verified
        )
        db.add(user)
        await db.flush()
        await db.refresh(user)
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
        oauth_id: str
    ) -> User:
        """Get existing OAuth user or create new one."""
        # Try to find by email first
        user = await UserService.get_by_email(db, email)
        
        if user:
            # Update OAuth info if not set
            if not user.oauth_provider:
                user.oauth_provider = oauth_provider
                user.oauth_id = oauth_id
                user.is_verified = True
                await db.flush()
                await db.refresh(user)
            return user
        
        # Create new user
        return await UserService.create_oauth_user(
            db, email, full_name, oauth_provider, oauth_id
        )
