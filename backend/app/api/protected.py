from fastapi import APIRouter, Depends

from app.api.deps import get_current_user, require_roles
from app.models.user import User, UserRole

router = APIRouter(prefix="/protected", tags=["protected"])


@router.get("/me")
async def me(user: User = Depends(get_current_user)) -> dict:
    return {
        "id": user.id,
        "email": user.email,
        "role": user.role.value,
        "is_active": user.is_active
    }


@router.get("/admin")
async def admin_only(
    user: User = Depends(require_roles(UserRole.ADMIN))
) -> dict:
    return {"status": "ok", "role": user.role.value}


@router.get("/client")
async def client_only(
    user: User = Depends(require_roles(UserRole.CLIENT))
) -> dict:
    return {"status": "ok", "role": user.role.value}


@router.get("/user")
async def user_only(
    user: User = Depends(require_roles(UserRole.USER))
) -> dict:
    return {"status": "ok", "role": user.role.value}
