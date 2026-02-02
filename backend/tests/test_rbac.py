import pytest

from app.core.security import hash_password
from app.models.user import User, UserRole


async def _create_user(session, email: str, role: UserRole):
    user = User(
        email=email,
        hashed_password=hash_password("password123"),
        role=role,
        is_active=True
    )
    session.add(user)
    await session.commit()


async def _login(client, email: str, password: str = "password123") -> str:
    response = await client.post(
        "/api/v1/auth/login",
        json={"email": email, "password": password}
    )
    assert response.status_code == 200
    return response.json()["access_token"]


@pytest.mark.asyncio
async def test_protected_requires_auth(client):
    response = await client.get("/api/v1/protected/me")
    assert response.status_code == 401
    assert response.json()["detail"] == "not_authenticated"


@pytest.mark.asyncio
async def test_admin_only_endpoint(client, async_session_factory):
    async with async_session_factory() as session:
        await _create_user(session, "admin@example.com", UserRole.ADMIN)
        await _create_user(session, "client@example.com", UserRole.CLIENT)

    admin_token = await _login(client, "admin@example.com")
    response = await client.get(
        "/api/v1/protected/admin",
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    assert response.status_code == 200

    client_token = await _login(client, "client@example.com")
    response = await client.get(
        "/api/v1/protected/admin",
        headers={"Authorization": f"Bearer {client_token}"}
    )
    assert response.status_code == 403
    assert response.json()["detail"] == "insufficient_permissions"


@pytest.mark.asyncio
async def test_client_only_endpoint(client, async_session_factory):
    async with async_session_factory() as session:
        await _create_user(session, "client2@example.com", UserRole.CLIENT)
        await _create_user(session, "user@example.com", UserRole.USER)

    client_token = await _login(client, "client2@example.com")
    response = await client.get(
        "/api/v1/protected/client",
        headers={"Authorization": f"Bearer {client_token}"}
    )
    assert response.status_code == 200

    user_token = await _login(client, "user@example.com")
    response = await client.get(
        "/api/v1/protected/client",
        headers={"Authorization": f"Bearer {user_token}"}
    )
    assert response.status_code == 403
    assert response.json()["detail"] == "insufficient_permissions"
