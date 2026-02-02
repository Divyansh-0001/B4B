from fastapi import APIRouter

from app.api import health

api_router = APIRouter()

api_v1_router = APIRouter(prefix="/api/v1")
api_v1_router.include_router(health.router)

api_router.include_router(api_v1_router)
