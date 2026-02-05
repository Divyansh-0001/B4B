"""User API routes."""

from typing import Any, List
from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select

from app.core.logging import get_logger
from app.schemas.user import User as UserSchema, UserUpdate
from app.models.user import User
from app.services.user import UserService
from app.api.deps import DBSession, CurrentUser, CurrentSuperUser

router = APIRouter()
logger = get_logger(__name__)


@router.get("/me", response_model=UserSchema)
async def read_user_me(current_user: CurrentUser) -> Any:
    """Get current user."""
    try:
        logger.debug("get_current_user", user_id=current_user.id)
        return current_user
    except Exception as e:
        logger.error("get_current_user_error", error=str(e), exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve user"
        )


@router.put("/me", response_model=UserSchema)
async def update_user_me(
    user_update: UserUpdate,
    current_user: CurrentUser,
    db: DBSession
) -> Any:
    """Update current user."""
    try:
        # Users can't change their own role
        if user_update.role is not None and user_update.role != current_user.role:
            logger.warning("user_attempted_role_change", user_id=current_user.id)
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Cannot change your own role"
            )
        
        user = await UserService.update(db, current_user, user_update)
        logger.info("user_updated_self", user_id=user.id)
        return user
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("update_user_error", user_id=current_user.id, error=str(e), exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update user"
        )


@router.get("/", response_model=List[UserSchema])
async def read_users(
    db: DBSession,
    current_user: CurrentSuperUser,
    skip: int = 0,
    limit: int = 100
) -> Any:
    """Get all users (admin only)."""
    try:
        logger.info("list_users", admin_user_id=current_user.id, skip=skip, limit=limit)
        result = await db.execute(select(User).offset(skip).limit(limit))
        users = result.scalars().all()
        return users
        
    except Exception as e:
        logger.error("list_users_error", error=str(e), exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve users"
        )


@router.get("/{user_id}", response_model=UserSchema)
async def read_user(
    user_id: int,
    db: DBSession,
    current_user: CurrentSuperUser
) -> Any:
    """Get user by ID (admin only)."""
    try:
        user = await UserService.get_by_id(db, user_id)
        if not user:
            logger.warning("user_not_found", user_id=user_id, admin_user_id=current_user.id)
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        logger.debug("get_user", user_id=user_id, admin_user_id=current_user.id)
        return user
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("get_user_error", user_id=user_id, error=str(e), exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve user"
        )


@router.put("/{user_id}", response_model=UserSchema)
async def update_user(
    user_id: int,
    user_update: UserUpdate,
    db: DBSession,
    current_user: CurrentSuperUser
) -> Any:
    """Update user (admin only)."""
    try:
        user = await UserService.get_by_id(db, user_id)
        if not user:
            logger.warning("update_user_not_found", user_id=user_id, admin_user_id=current_user.id)
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        user = await UserService.update(db, user, user_update)
        logger.info("user_updated_by_admin", user_id=user_id, admin_user_id=current_user.id)
        return user
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("update_user_error", user_id=user_id, error=str(e), exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update user"
        )


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: int,
    db: DBSession,
    current_user: CurrentSuperUser
) -> None:
    """Delete user (admin only)."""
    try:
        user = await UserService.get_by_id(db, user_id)
        if not user:
            logger.warning("delete_user_not_found", user_id=user_id, admin_user_id=current_user.id)
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Prevent deleting yourself
        if user.id == current_user.id:
            logger.warning("admin_attempted_self_delete", admin_user_id=current_user.id)
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot delete yourself"
            )
        
        await db.delete(user)
        logger.info("user_deleted_by_admin", user_id=user_id, admin_user_id=current_user.id)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("delete_user_error", user_id=user_id, error=str(e), exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete user"
        )
