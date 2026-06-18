from pydantic import BaseModel, ConfigDict, Field


class IncidentFeatures(BaseModel):
    cpu_utilization: float = Field(..., ge=0, le=100)
    memory_utilization: float = Field(..., ge=0, le=100)
    request_rate: float = Field(..., ge=0)
    error_rate: float = Field(..., ge=0, le=1)
    latency_ms: float = Field(..., ge=0)
    pod_restarts: int = Field(..., ge=0)
    deploy_age_minutes: float = Field(..., ge=0)
    queue_depth: int = Field(..., ge=0)
    service_name: str = "checkout-api"
    environment: str = "local"


class PredictionResponse(BaseModel):
    model_config = ConfigDict(protected_namespaces=())

    incident_probability: float
    risk_level: str
    recommendation: str
    model_version: str
    copilot_source: str


class HealthResponse(BaseModel):
    model_config = ConfigDict(protected_namespaces=())

    status: str
    model_loaded: bool
    ollama_connected: bool
    ollama_base_url: str
    ollama_model: str


class ModelInfoResponse(BaseModel):
    model_config = ConfigDict(protected_namespaces=())

    model_name: str
    model_version: str
    registry_uri: str
    feature_columns: list[str]
    artifact_path: str
