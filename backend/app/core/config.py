from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings."""
    
    # Application
    APP_NAME: str = "Be4Breach Platform"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database
    DATABASE_URL: str
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000"]
    
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore"
    )


settings = Settings()
