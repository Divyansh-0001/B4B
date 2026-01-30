from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Be4Breach Enterprise API"
    environment: str = "development"
    api_v1_prefix: str = "/api/v1"
    secret_key: str = "CHANGE_ME_SUPER_SECRET"
    access_token_expire_minutes: int = 60
    refresh_token_expire_days: int = 14
    frontend_origin: str = "http://localhost:3000"
    google_client_id: str = "YOUR_GOOGLE_CLIENT_ID"
    google_client_secret: str = "YOUR_GOOGLE_CLIENT_SECRET"
    google_redirect_uri: str = (
        "http://localhost:8000/api/v1/auth/google/callback"
    )
    rate_limit_per_minute: int = 120
    auth_rate_limit_per_minute: int = 20
    sso_state_ttl_seconds: int = 600
    sso_exchange_ttl_seconds: int = 300

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", case_sensitive=False
    )


settings = Settings()
