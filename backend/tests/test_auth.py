from datetime import timedelta

import pytest

from app.core.security import create_refresh_token, hash_password
from app.models.user import User, UserRole


@pytest.mark.asyncio
async def test_login_and_refresh(client, async_session_factory):
    async with async_session_factory() as session:
        user = User(
            email="user@example.com",
            hashed_password=hash_password("password123"),
            role=UserRole.USER,
            is_active=True
        )
        session.add(user)
        await session.commit()

    response = await client.post(
        "/api/v1/auth/login",
        json={"email": "user@example.com", "password": "password123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["token_type"] == "bearer"
    assert data["access_token"]
    assert data["refresh_token"]

    refresh_response = await client.post(
        "/api/v1/auth/refresh",
        json={"refresh_token": data["refresh_token"]}
    )
    assert refresh_response.status_code == 200
    refreshed = refresh_response.json()
    assert refreshed["access_token"]
    assert refreshed["refresh_token"]


@pytest.mark.asyncio
async def test_login_invalid_password(client, async_session_factory):
    async with async_session_factory() as session:
        user = User(
            email="user2@example.com",
            hashed_password=hash_password("password123"),
            role=UserRole.USER,
            is_active=True
        )
        session.add(user)
        await session.commit()

    response = await client.post(
        "/api/v1/auth/login",
        json={"email": "user2@example.com", "password": "wrongpassword"}
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_refresh_rejects_expired_token(client):
    expired_token, _ = create_refresh_token(
        "1",
        expires_delta=timedelta(days=-1)
    )
    response = await client.post(
        "/api/v1/auth/refresh",
        json={"refresh_token": expired_token}
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "token_expired"


@pytest.mark.asyncio
async def test_google_oauth_not_configured(client):
    response = await client.get("/api/v1/auth/google/login")
    assert response.status_code == 503
