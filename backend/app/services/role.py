"""Role management service."""

from typing import Optional, List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.role import Role
from app.models.user_role import UserRole
from app.models.user import User
from app.core.logging import get_logger

logger = get_logger(__name__)


class RoleService:
    """Service for role management."""

    @staticmethod
    async def get_role_by_name(db: AsyncSession, name: str) -> Optional[Role]:
        """Get role by name."""
        result = await db.execute(select(Role).filter(Role.name == name))
        return result.scalar_one_or_none()

    @staticmethod
    async def get_role_by_id(db: AsyncSession, role_id: int) -> Optional[Role]:
        """Get role by ID."""
        result = await db.execute(select(Role).filter(Role.id == role_id))
        return result.scalar_one_or_none()

    @staticmethod
    async def create_role(
        db: AsyncSession,
        name: str,
        description: Optional[str] = None
    ) -> Role:
        """Create a new role."""
        role = Role(name=name, description=description)
        db.add(role)
        await db.flush()
        await db.refresh(role)
        
        logger.info("role_created", role_id=role.id, name=name)
        return role

    @staticmethod
    async def assign_role_to_user(
        db: AsyncSession,
        user_id: int,
        role_id: int
    ) -> UserRole:
        """Assign a role to a user."""
        # Check if already assigned
        result = await db.execute(
            select(UserRole).filter(
                UserRole.user_id == user_id,
                UserRole.role_id == role_id
            )
        )
        existing = result.scalar_one_or_none()
        
        if existing:
            return existing
        
        user_role = UserRole(user_id=user_id, role_id=role_id)
        db.add(user_role)
        await db.flush()
        await db.refresh(user_role)
        
        logger.info(
            "role_assigned",
            user_id=user_id,
            role_id=role_id
        )
        return user_role

    @staticmethod
    async def remove_role_from_user(
        db: AsyncSession,
        user_id: int,
        role_id: int
    ) -> bool:
        """Remove a role from a user."""
        result = await db.execute(
            select(UserRole).filter(
                UserRole.user_id == user_id,
                UserRole.role_id == role_id
            )
        )
        user_role = result.scalar_one_or_none()
        
        if not user_role:
            return False
        
        await db.delete(user_role)
        logger.info("role_removed", user_id=user_id, role_id=role_id)
        return True

    @staticmethod
    async def get_user_roles(db: AsyncSession, user_id: int) -> List[Role]:
        """Get all roles for a user."""
        result = await db.execute(
            select(Role)
            .join(UserRole)
            .filter(UserRole.user_id == user_id)
        )
        return list(result.scalars().all())

    @staticmethod
    async def user_has_role(
        db: AsyncSession,
        user_id: int,
        role_name: str
    ) -> bool:
        """Check if user has a specific role."""
        result = await db.execute(
            select(UserRole)
            .join(Role)
            .filter(
                UserRole.user_id == user_id,
                Role.name == role_name
            )
        )
        return result.scalar_one_or_none() is not None

    @staticmethod
    async def ensure_default_roles(db: AsyncSession) -> None:
        """Ensure default roles exist in the database."""
        default_roles = [
            ("admin", "Full system access with all permissions"),
            ("client", "Limited access for client users"),
            ("user", "Basic access for regular users"),
        ]
        
        for name, description in default_roles:
            existing = await RoleService.get_role_by_name(db, name)
            if not existing:
                await RoleService.create_role(db, name, description)
                logger.info("default_role_created", name=name)
