from fastapi import APIRouter

from app.api import auth, health, protected

api_router = APIRouter()

api_v1_router = APIRouter(prefix="/api/v1")
api_v1_router.include_router(health.router)
api_v1_router.include_router(auth.router)
api_v1_router.include_router(protected.router)

api_router.include_router(api_v1_router)
