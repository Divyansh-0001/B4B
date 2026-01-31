from __future__ import annotations

from fastapi import APIRouter, Request


router = APIRouter()


@router.get("")
async def health_check(request: Request):
    db_available = bool(getattr(request.app.state, "db_available", False))
    return {
        "status": "ok" if db_available else "degraded",
        "database": "available" if db_available else "unavailable",
    }
