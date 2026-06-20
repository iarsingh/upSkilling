from functools import lru_cache
from pathlib import Path
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = "local"
    model_path: Path = Path("models/incident_risk_model.joblib")
    model_registry_uri: str = "file://models"
    model_name: str = "incident-risk-random-forest"
    feature_store_uri: str = "redis://localhost:6379/0"
    postgres_dsn: str = "postgresql://mlops:mlops@localhost:5432/mlops"
    kafka_bootstrap_servers: str = "localhost:9092"
    pubsub_project_id: str = "local-mlops"
    copilot_provider: Literal["ollama", "claude"] = "ollama"
    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "llama3.1:8b"
    anthropic_api_key: str | None = None
    anthropic_base_url: str = "https://api.anthropic.com"
    anthropic_model: str = "claude-haiku-4-5"
    copilot_timeout_seconds: int = Field(default=45, ge=3, le=60)

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


@lru_cache
def get_settings() -> Settings:
    return Settings()
