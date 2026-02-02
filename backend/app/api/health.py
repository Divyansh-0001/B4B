from fastapi import APIRouter

router = APIRouter()


@router.get("/health", tags=["health"])
def health() -> dict:
    return {"status": "ok"}


@router.get("/ready", tags=["health"])
def ready() -> dict:
    return {"status": "ok"}
