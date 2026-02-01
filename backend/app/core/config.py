from __future__ import annotations

import logging
import secrets
from typing import List

from pydantic import Field, ValidationError, ValidationInfo, field_validator
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
    def split_csv(cls, value, info: ValidationInfo):
        defaults = {
            "cors_origins": ["http://localhost:3000"],
            "trusted_host_patterns": ["*"],
        }
        default = defaults.get(info.field_name, [])
        if value is None:
            return default
        if isinstance(value, str):
            items = [item.strip() for item in value.split(",") if item.strip()]
            return items or default
        if isinstance(value, (list, tuple, set)):
            items = [str(item).strip() for item in value if str(item).strip()]
            return items or default
        return default

    @field_validator(
        "access_token_expire_minutes",
        "refresh_token_expire_minutes",
        "rate_limit_per_minute",
        mode="before",
    )
    @classmethod
    def parse_ints(cls, value, info: ValidationInfo):
        defaults = {
            "access_token_expire_minutes": 60,
            "refresh_token_expire_minutes": 60 * 24 * 7,
            "rate_limit_per_minute": 120,
        }
        default = defaults.get(info.field_name, 1)
        try:
            parsed = int(value)
        except (TypeError, ValueError):
            return default
        return max(1, parsed)

    @field_validator("db_echo", "allow_signup", mode="before")
    @classmethod
    def parse_bools(cls, value, info: ValidationInfo):
        defaults = {"db_echo": False, "allow_signup": True}
        default = defaults.get(info.field_name, False)
        if isinstance(value, bool):
            return value
        if value is None:
            return default
        if isinstance(value, str):
            normalized = value.strip().lower()
            if normalized in {"1", "true", "yes", "on"}:
                return True
            if normalized in {"0", "false", "no", "off"}:
                return False
        return default

    @field_validator("log_level", mode="before")
    @classmethod
    def normalize_log_level(cls, value):
        if value is None:
            return "INFO"
        normalized = str(value).strip().upper()
        valid = {"CRITICAL", "ERROR", "WARNING", "INFO", "DEBUG"}
        return normalized if normalized in valid else "INFO"

    @field_validator("env", "api_v1_prefix", "jwt_algorithm", "database_url", mode="before")
    @classmethod
    def normalize_strings(cls, value, info: ValidationInfo):
        defaults = {
            "env": "development",
            "api_v1_prefix": "/api/v1",
            "jwt_algorithm": "HS256",
            "database_url": "sqlite+aiosqlite:///./be4breach.db",
        }
        default = defaults.get(info.field_name, "")
        if value is None:
            return default
        text = str(value).strip()
        return text or default


def load_settings() -> Settings:
    try:
        return Settings()
    except ValidationError as exc:  # pragma: no cover - defensive
        logging.basicConfig(level=logging.INFO)
        logger = logging.getLogger(__name__)
        fields = [".".join(str(item) for item in error.get("loc", [])) for error in exc.errors()]
        logger.warning("settings_validation_failed", extra={"fields": fields})
        return Settings.model_validate({})


settings = load_settings()
