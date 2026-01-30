from __future__ import annotations

from typing import Any

import httpx
from fastapi import HTTPException, status

from app.core.config import settings

GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_TOKENINFO_URL = "https://oauth2.googleapis.com/tokeninfo"
GOOGLE_USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo"


def _require_google_config() -> None:
    if not settings.google_client_id or not settings.google_client_secret:
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail="Google OAuth is not configured."
        )


def exchange_code_for_tokens(code: str, redirect_uri: str) -> dict[str, Any]:
    _require_google_config()
    payload = {
        "code": code,
        "client_id": settings.google_client_id,
        "client_secret": settings.google_client_secret,
        "redirect_uri": redirect_uri,
        "grant_type": "authorization_code"
    }
    with httpx.Client(timeout=10) as client:
        response = client.post(GOOGLE_TOKEN_URL, data=payload)
    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google authorization failed."
        )
    return response.json()


def verify_id_token(id_token: str) -> dict[str, Any]:
    _require_google_config()
    with httpx.Client(timeout=10) as client:
        response = client.get(GOOGLE_TOKENINFO_URL, params={"id_token": id_token})
    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google ID token."
        )
    data = response.json()
    if data.get("aud") != settings.google_client_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google token audience mismatch."
        )
    return data


def fetch_userinfo(access_token: str) -> dict[str, Any]:
    with httpx.Client(timeout=10) as client:
        response = client.get(
            GOOGLE_USERINFO_URL,
            headers={"Authorization": f"Bearer {access_token}"}
        )
    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unable to fetch Google user profile."
        )
    return response.json()


def resolve_google_profile(
    code: str | None,
    id_token: str | None,
    redirect_uri: str | None
) -> dict[str, Any]:
    if not code and not id_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Provide either authorization code or ID token."
        )

    access_token: str | None = None
    if code:
        if not redirect_uri:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="redirect_uri is required when using authorization code."
            )
        token_data = exchange_code_for_tokens(code, redirect_uri)
        id_token = token_data.get("id_token")
        access_token = token_data.get("access_token")

    token_profile = verify_id_token(id_token or "")
    if access_token:
        user_profile = fetch_userinfo(access_token)
        token_profile.update(user_profile)

    return token_profile
