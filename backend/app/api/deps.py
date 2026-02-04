"""API dependencies."""

from typing import Annotated, List
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.core.security import get_current_user, get_current_active_superuser
from app.models.user import User

# Type aliases for cleaner dependency injection
DBSession = Annotated[AsyncSession, Depends(get_db)]
CurrentUser = Annotated[User, Depends(get_current_user)]
CurrentSuperUser = Annotated[User, Depends(get_current_active_superuser)]


async def get_current_user_with_roles(user: CurrentUser) -> User:
    """Get current user and populate roles list."""
    # Extract role names from user_roles relationship
    user.roles = [ur.role.name for ur in user.user_roles]
    return user
