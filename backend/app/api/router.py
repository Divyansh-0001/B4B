from __future__ import annotations

from fastapi import APIRouter

from app.api.routes import auth, health, users
from app.core.config import settings


api_router = APIRouter(prefix=settings.api_v1_prefix)
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(health.router, prefix="/health", tags=["health"])
