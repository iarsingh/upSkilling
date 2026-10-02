from pathlib import Path
from typing import Literal

from pydantic import SecretStr, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    app_env: Literal["local", "test", "production"] = "local"
    database_url: str = "sqlite:///./incident_ops.db"
    model_path: Path = Path("artifacts/classifier.joblib")
    llm_provider: Literal["disabled", "openai"] = "disabled"
    openai_api_key: SecretStr = SecretStr("")
    openai_model: str = ""
    api_key: SecretStr = SecretStr("")
    cors_origins: list[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]
    otel_exporter_otlp_endpoint: str = ""
    classification_threshold: float = 0.40
    retrieval_threshold: float = 0.12

    @model_validator(mode="after")
    def validate_runtime(self):
        if self.app_env == "production":
            if len(self.api_key.get_secret_value()) < 32:
                raise ValueError("Production requires an API_KEY of at least 32 characters")
            if not self.database_url.startswith("postgresql"):
                raise ValueError("Production requires PostgreSQL")
        if self.llm_provider == "openai" and (
            not self.openai_api_key.get_secret_value() or not self.openai_model
        ):
            raise ValueError("OpenAI mode requires OPENAI_API_KEY and OPENAI_MODEL")
        return self
