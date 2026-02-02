from functools import lru_cache
from typing import Literal, Optional

from pydantic import AnyHttpUrl, PostgresDsn, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="BE4BREACH_",
        case_sensitive=False
    )

    project_name: str = "Be4Breach API"
    environment: Literal["development", "staging", "production", "test"] = "development"
    log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"] = "INFO"
    database_url: Optional[PostgresDsn] = None
    cors_allowed_origins: list[AnyHttpUrl] = []
    jwt_secret_key: Optional[str] = None
    jwt_refresh_secret_key: Optional[str] = None
    jwt_algorithm: Literal["HS256"] = "HS256"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7
    google_client_id: Optional[str] = None
    google_client_secret: Optional[str] = None
    google_redirect_uri: Optional[AnyHttpUrl] = None
    frontend_url: Optional[AnyHttpUrl] = None

    @field_validator("cors_allowed_origins", mode="before")
    @classmethod
    def parse_origins(cls, value: object) -> list[str] | object:
        if value is None or value == "":
            return []
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value

    @field_validator("cors_allowed_origins")
    @classmethod
    def block_wildcard(cls, value: list[AnyHttpUrl]) -> list[AnyHttpUrl]:
        if any(str(origin) == "*" for origin in value):
            raise ValueError("Wildcard CORS origins are not allowed.")
        return value


@lru_cache
def get_settings() -> Settings:
    return Settings()


def validate_settings(settings: Settings) -> None:
    if settings.environment == "production" and not settings.cors_allowed_origins:
        raise ValueError("CORS allowed origins must be set in production.")
    if not settings.jwt_secret_key:
        raise ValueError("BE4BREACH_JWT_SECRET_KEY is required.")
    if not settings.jwt_refresh_secret_key:
        raise ValueError("BE4BREACH_JWT_REFRESH_SECRET_KEY is required.")
    if settings.access_token_expire_minutes <= 0:
        raise ValueError("Access token expiration must be positive.")
    if settings.refresh_token_expire_days <= 0:
        raise ValueError("Refresh token expiration must be positive.")
    google_fields = [
        settings.google_client_id,
        settings.google_client_secret,
        settings.google_redirect_uri
    ]
    if any(google_fields) and not all(google_fields):
        raise ValueError(
            "Google OAuth requires client id, client secret, and redirect uri."
        )


