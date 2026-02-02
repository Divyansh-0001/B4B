from typing import Optional

from authlib.integrations.starlette_client import OAuth

from app.core.config import settings


def get_google_oauth() -> Optional[OAuth]:
    if not settings.google_client_id or not settings.google_client_secret:
        return None

    oauth = OAuth()
    oauth.register(
        name="google",
        client_id=settings.google_client_id,
        client_secret=settings.google_client_secret,
        server_metadata_url=(
            "https://accounts.google.com/.well-known/openid-configuration"
        ),
        client_kwargs={"scope": "openid email profile"},
        redirect_uri=settings.google_redirect_uri
    )
    return oauth
