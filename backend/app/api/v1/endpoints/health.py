from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class HealthCheck(BaseModel):
    """Health check response."""
    status: str
    version: str


@router.get("", response_model=HealthCheck)
async def health_check() -> HealthCheck:
    """Health check endpoint."""
    return HealthCheck(status="healthy", version="1.0.0")
