from fastapi import APIRouter, Depends
from sqlalchemy import text

from app.db.session import get_session
from app.schemas.system import HealthStatus

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthStatus)
async def health_check(db=Depends(get_session)) -> HealthStatus:
    await db.execute(text("SELECT 1"))
    return HealthStatus(status="ok")
