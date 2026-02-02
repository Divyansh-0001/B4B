from fastapi import APIRouter, Depends

from app.api.deps import require_roles
from app.services.auth_service import user_role_names

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/overview")
def admin_overview(user=Depends(require_roles("admin"))):
    return {
        "message": "Admin access granted.",
        "user_id": user.id,
        "roles": user_role_names(user),
    }
