from __future__ import annotations

from dotenv import load_dotenv
from pydantic import field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

load_dotenv()


class Settings(BaseSettings):
    app_name: str = "Be4Breach Command Core"
    environment: str = "development"
    log_level: str = "INFO"
    api_v1_prefix: str = "/api/v1"

    jwt_secret: str = "dev-insecure-change-me-change-me-32"
    jwt_algorithm: str = "HS256"
    jwt_exp_minutes: int = 30
    jwt_refresh_exp_minutes: int = 720

    google_client_id: str | None = None
    google_client_secret: str | None = None
    google_allowed_domains: list[str] = []

    database_url: str = "sqlite:///./data/be4breach.db"
    cors_origins: list[str] = ["http://localhost:3000"]
    allowed_hosts: list[str] = ["localhost", "127.0.0.1"]
    auth_cookie_access_name: str = "bb_access"
    auth_cookie_refresh_name: str = "bb_refresh"
    auth_cookie_csrf_name: str = "bb_csrf"
    auth_cookie_domain: str | None = None
    auth_cookie_samesite: str = "lax"
    auth_cookie_secure: bool = False
    csrf_header_name: str = "X-CSRF-Token"

    auth_rate_limit_window_seconds: int = 60
    auth_rate_limit_max_requests: int = 12

    db_pool_size: int = 5
    db_max_overflow: int = 10
    db_retry_attempts: int = 3
    db_retry_backoff_seconds: float = 0.8

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False
    )

    @field_validator("cors_origins", "google_allowed_domains", mode="before")
    @classmethod
    def split_csv(cls, value: str | list[str]) -> list[str]:
        if isinstance(value, str):
            return [item.strip() for item in value.split(",") if item.strip()]
        return value

    @field_validator("allowed_hosts", mode="before")
    @classmethod
    def split_hosts(cls, value: str | list[str]) -> list[str]:
        if isinstance(value, str):
            return [item.strip() for item in value.split(",") if item.strip()]
        return value

    @field_validator("environment")
    @classmethod
    def validate_environment_name(cls, value: str) -> str:
        normalized = value.lower().strip()
        if normalized not in {"development", "production"}:
            raise ValueError("Environment must be development or production.")
        return normalized

    @field_validator("jwt_algorithm")
    @classmethod
    def validate_jwt_algorithm(cls, value: str) -> str:
        allowed = {"HS256", "HS384", "HS512"}
        if value not in allowed:
            raise ValueError("JWT algorithm is not supported.")
        return value

    @field_validator("jwt_exp_minutes", "jwt_refresh_exp_minutes")
    @classmethod
    def validate_token_expiration(cls, value: int) -> int:
        if value <= 0:
            raise ValueError("Token expiration must be greater than zero.")
        return value

    @field_validator("jwt_secret")
    @classmethod
    def validate_jwt_secret(cls, value: str) -> str:
        if len(value) < 32:
            raise ValueError("JWT secret must be at least 32 characters.")
        return value

    @field_validator("auth_cookie_samesite")
    @classmethod
    def validate_cookie_samesite(cls, value: str) -> str:
        normalized = value.lower().strip()
        if normalized not in {"lax", "strict", "none"}:
            raise ValueError("Cookie SameSite must be lax, strict, or none.")
        return normalized

    @field_validator("auth_rate_limit_window_seconds", "auth_rate_limit_max_requests")
    @classmethod
    def validate_rate_limit(cls, value: int) -> int:
        if value <= 0:
            raise ValueError("Rate limit settings must be greater than zero.")
        return value

    @field_validator("db_pool_size", "db_max_overflow", "db_retry_attempts")
    @classmethod
    def validate_db_settings(cls, value: int) -> int:
        if value < 0:
            raise ValueError("Database settings must be zero or positive.")
        return value

    @field_validator("db_retry_backoff_seconds")
    @classmethod
    def validate_retry_backoff(cls, value: float) -> float:
        if value <= 0:
            raise ValueError("Database retry backoff must be greater than zero.")
        return value

    @model_validator(mode="after")
    def validate_environment(self) -> "Settings":
        if self.is_production and self.jwt_secret == "dev-insecure-change-me-change-me-32":
            raise ValueError("JWT secret must be set for production.")
        if (self.google_client_id and not self.google_client_secret) or (
            self.google_client_secret and not self.google_client_id
        ):
            raise ValueError("Google OAuth requires both client id and secret.")
        if not self.cors_origins:
            raise ValueError("CORS origins must not be empty.")
        if not self.allowed_hosts:
            raise ValueError("Allowed hosts must not be empty.")
        if self.is_production:
            if "*" in self.cors_origins:
                raise ValueError("CORS origins must be explicit in production.")
            if "*" in self.allowed_hosts:
                raise ValueError("Allowed hosts must be explicit in production.")
            if not self.auth_cookie_secure:
                self.auth_cookie_secure = True
        if self.auth_cookie_samesite == "none" and not self.auth_cookie_secure:
            raise ValueError("SameSite=None requires secure cookies.")
        return self

    @property
    def is_production(self) -> bool:
        return self.environment.lower() == "production"

    @property
    def is_development(self) -> bool:
        return self.environment.lower() == "development"


settings = Settings()
