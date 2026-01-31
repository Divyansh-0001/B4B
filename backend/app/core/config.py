from __future__ import annotations

import secrets
from typing import List

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_ignore_empty=True,
        extra="allow",
    )

    app_name: str = "be4breach API"
    env: str = "development"
    log_level: str = "INFO"
    api_v1_prefix: str = "/api/v1"

    jwt_secret: str = Field(default_factory=lambda: secrets.token_urlsafe(32))
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    refresh_token_expire_minutes: int = 60 * 24 * 7

    database_url: str = "sqlite+aiosqlite:///./be4breach.db"
    db_echo: bool = False

    cors_origins: List[str] = ["http://localhost:3000"]
    trusted_host_patterns: List[str] = ["*"]
    rate_limit_per_minute: int = 120

    google_client_id: str | None = None
    google_client_secret: str | None = None
    google_redirect_uri: str | None = None
    google_auth_url: str = "https://accounts.google.com/o/oauth2/v2/auth"
    google_token_url: str = "https://oauth2.googleapis.com/token"

    allow_signup: bool = True

    @field_validator("cors_origins", "trusted_host_patterns", mode="before")
    @classmethod
    def split_csv(cls, value):
        if isinstance(value, str):
            return [item.strip() for item in value.split(",") if item.strip()]
        return value


settings = Settings()
