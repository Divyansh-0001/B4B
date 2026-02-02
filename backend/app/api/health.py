from fastapi import APIRouter

router = APIRouter()


@router.get("/health/live", tags=["health"])
def live() -> dict:
    return {"status": "ok"}


@router.get("/health/ready", tags=["health"])
def ready() -> dict:
    return {"status": "ok"}
