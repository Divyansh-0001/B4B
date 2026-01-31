from __future__ import annotations

from pydantic import field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


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
    allowed_hosts: list[str] = ["*"]

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False)

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

    @model_validator(mode="after")
    def validate_environment(self) -> "Settings":
        if self.is_production and self.jwt_secret == "dev-insecure-change-me":
            raise ValueError("JWT secret must be set for production.")
        if (self.google_client_id and not self.google_client_secret) or (
            self.google_client_secret and not self.google_client_id
        ):
            raise ValueError("Google OAuth requires both client id and secret.")
        if not self.cors_origins:
            raise ValueError("CORS origins must not be empty.")
        if not self.allowed_hosts:
            raise ValueError("Allowed hosts must not be empty.")
        return self

    @property
    def is_production(self) -> bool:
        return self.environment.lower() == "production"


settings = Settings()
