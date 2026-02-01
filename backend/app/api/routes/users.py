from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_db, require_roles
from app.models.user import User
from app.schemas.user import UserPublic


router = APIRouter()


@router.get("", response_model=list[UserPublic])
async def list_users(
    session: AsyncSession = Depends(get_db),
    user: User = Depends(require_roles("admin")),
):
    result = await session.execute(select(User).order_by(User.created_at.desc()))
    return result.scalars().all()
