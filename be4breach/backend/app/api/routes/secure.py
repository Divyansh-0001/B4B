from fastapi import APIRouter, Request

from app.services.auth_service import user_role_names

router = APIRouter(prefix="/secure", tags=["secure"])


@router.get("/status")
def secure_status(request: Request):
    user = request.state.user
    return {
        "message": "Secure route access granted.",
        "user_id": user.id,
        "roles": user_role_names(user),
    }
