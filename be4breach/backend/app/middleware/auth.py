from __future__ import annotations

from typing import Iterable

from fastapi import Request, status
from fastapi.responses import JSONResponse
from jose import JWTError
from starlette.middleware.base import BaseHTTPMiddleware

from app.core.security import decode_token
from app.db.session import SessionLocal
from app.services.auth_service import get_user_by_id


class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, protected_prefixes: Iterable[str]) -> None:
        super().__init__(app)
        self.protected_prefixes = tuple(protected_prefixes)

    async def dispatch(self, request: Request, call_next):
        if request.method == "OPTIONS":
            return await call_next(request)
        if request.url.path.startswith(self.protected_prefixes):
            auth_header = request.headers.get("Authorization", "")
            if not auth_header.lower().startswith("bearer "):
                return JSONResponse(
                    {"detail": "Not authenticated."},
                    status_code=status.HTTP_401_UNAUTHORIZED,
                )
            token = auth_header.split(" ", 1)[1]
            try:
                payload = decode_token(token)
            except JWTError:
                return JSONResponse(
                    {"detail": "Invalid authentication token."},
                    status_code=status.HTTP_401_UNAUTHORIZED,
                )
            user_id = payload.get("sub")
            if not user_id:
                return JSONResponse(
                    {"detail": "Invalid authentication payload."},
                    status_code=status.HTTP_401_UNAUTHORIZED,
                )
            db = SessionLocal()
            try:
                user = get_user_by_id(db, user_id)
                if not user or not user.is_active:
                    return JSONResponse(
                        {"detail": "Inactive or missing user."},
                        status_code=status.HTTP_401_UNAUTHORIZED,
                    )
                request.state.user = user
            finally:
                db.close()
        return await call_next(request)
