from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.schemas.user import UserRead
from app.services.auth_service import user_role_names

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserRead)
def read_current_user(user=Depends(get_current_user)):
    return UserRead(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        is_active=user.is_active,
        roles=user_role_names(user),
        oauth_provider=user.oauth_provider,
    )
