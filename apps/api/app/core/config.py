from functools import lru_cache
from typing import List

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    project_name: str = "Be4Breach API"
    api_v1_str: str = "/api/v1"
    environment: str = "development"
    database_url: str = "postgresql+psycopg2://be4breach:be4breach@localhost:5432/be4breach"
    jwt_secret: str = "change_me_super_secret_key"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    oauth_state_expire_minutes: int = 10
    allowed_origins: List[str] = Field(default_factory=lambda: ["http://localhost:3000"])
    frontend_url: str = "http://localhost:3000"
    google_client_id: str = ""
    google_client_secret: str = ""
    google_redirect_uri: str = "http://localhost:8000/api/v1/auth/google/callback"

    @field_validator("allowed_origins", mode="before")
    @classmethod
    def split_origins(cls, value):
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value


@lru_cache
def get_settings() -> Settings:
    return Settings()
