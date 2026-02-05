"""Authentication service."""

from typing import Optional, Dict, Any
from authlib.integrations.httpx_client import AsyncOAuth2Client
import httpx

from app.core.config import settings


class GoogleOAuthService:
    """Google OAuth2 authentication service."""

    AUTHORIZATION_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth"
    TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token"
    USERINFO_ENDPOINT = "https://www.googleapis.com/oauth2/v2/userinfo"

    def __init__(self):
        self.client_id = settings.GOOGLE_CLIENT_ID
        self.client_secret = settings.GOOGLE_CLIENT_SECRET
        self.redirect_uri = settings.GOOGLE_REDIRECT_URI

    async def get_authorization_url(self, state: str) -> str:
        """Get Google OAuth2 authorization URL."""
        client = AsyncOAuth2Client(
            client_id=self.client_id,
            redirect_uri=self.redirect_uri,
            scope="openid email profile",
        )
        
        uri, _ = client.create_authorization_url(
            self.AUTHORIZATION_ENDPOINT,
            state=state,
        )
        return uri

    async def get_access_token(self, code: str) -> Optional[Dict[str, Any]]:
        """Exchange authorization code for access token."""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                self.TOKEN_ENDPOINT,
                data={
                    "client_id": self.client_id,
                    "client_secret": self.client_secret,
                    "code": code,
                    "grant_type": "authorization_code",
                    "redirect_uri": self.redirect_uri,
                },
            )
            
            if response.status_code != 200:
                return None
            
            return response.json()

    async def get_user_info(self, access_token: str) -> Optional[Dict[str, Any]]:
        """Get user information from Google."""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                self.USERINFO_ENDPOINT,
                headers={"Authorization": f"Bearer {access_token}"},
            )
            
            if response.status_code != 200:
                return None
            
            return response.json()


google_oauth_service = GoogleOAuthService()
