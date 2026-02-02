from typing import Optional

from authlib.integrations.starlette_client import OAuth

from app.core.config import get_settings


def get_google_oauth() -> Optional[OAuth]:
    settings = get_settings()
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
        redirect_uri=str(settings.google_redirect_uri)
        if settings.google_redirect_uri
        else None
    )
    return oauth
