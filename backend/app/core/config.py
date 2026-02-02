import secrets
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
    jwt_secret_key: str = secrets.token_urlsafe(32)
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    google_client_id: Optional[str] = None
    google_client_secret: Optional[str] = None
    google_redirect_uri: Optional[str] = None

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


settings = get_settings()
