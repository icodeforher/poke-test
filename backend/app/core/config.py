"""
Core Configuration
Manages all application settings from environment variables
"""
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables or .env file
    Following the 12-factor app methodology
    """
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # PokeAPI
    POKEAPI_BASE_URL: str = "https://pokeapi.co/api/v2"
    POKEAPI_TIMEOUT: int = 30
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # CORS
    CORS_ORIGINS: list[str] = ["*"]
    
    # Application
    APP_NAME: str = "Pokemon API Backend"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True
    )


@lru_cache()
def get_settings() -> Settings:
    """
    Create a cached instance of settings
    This ensures we only load the .env file once
    Singleton pattern for performance
    """
    return Settings()

