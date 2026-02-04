"""User API routes."""

from typing import Any, List
from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select

from app.schemas.user import User as UserSchema, UserUpdate
from app.models.user import User
from app.services.user import UserService
from app.api.deps import DBSession, CurrentUser, CurrentSuperUser

router = APIRouter()


@router.get("/me", response_model=UserSchema)
async def read_user_me(current_user: CurrentUser) -> Any:
    """Get current user."""
    return current_user


@router.put("/me", response_model=UserSchema)
async def update_user_me(
    user_update: UserUpdate,
    current_user: CurrentUser,
    db: DBSession
) -> Any:
    """Update current user."""
    # Users can't change their own role
    if user_update.role is not None and user_update.role != current_user.role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot change your own role"
        )
    
    user = await UserService.update(db, current_user, user_update)
    return user


@router.get("/", response_model=List[UserSchema])
async def read_users(
    db: DBSession,
    current_user: CurrentSuperUser,
    skip: int = 0,
    limit: int = 100
) -> Any:
    """Get all users (admin only)."""
    result = await db.execute(select(User).offset(skip).limit(limit))
    users = result.scalars().all()
    return users


@router.get("/{user_id}", response_model=UserSchema)
async def read_user(
    user_id: int,
    db: DBSession,
    current_user: CurrentSuperUser
) -> Any:
    """Get user by ID (admin only)."""
    user = await UserService.get_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user


@router.put("/{user_id}", response_model=UserSchema)
async def update_user(
    user_id: int,
    user_update: UserUpdate,
    db: DBSession,
    current_user: CurrentSuperUser
) -> Any:
    """Update user (admin only)."""
    user = await UserService.get_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user = await UserService.update(db, user, user_update)
    return user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: int,
    db: DBSession,
    current_user: CurrentSuperUser
) -> None:
    """Delete user (admin only)."""
    user = await UserService.get_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Prevent deleting yourself
    if user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete yourself"
        )
    
    await db.delete(user)
