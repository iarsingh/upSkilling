from fastapi import FastAPI
from pydantic import BaseModel, Field

from src.aiops_core import Telemetry, score_incident


class TelemetryRequest(BaseModel):
    service_name: str
    gcp_region: str
    p95_latency_ms: float = Field(ge=0)
    error_rate_pct: float = Field(ge=0)
    cpu_utilization_pct: float = Field(ge=0, le=100)
    memory_utilization_pct: float = Field(ge=0, le=100)
    active_alert_count: int = Field(ge=0)
    deployment_within_30m: bool = False
    slo_burn_rate: float = Field(ge=0)


app = FastAPI(
    title="GCP AIOps Incident Predictor",
    version="0.1.0",
    description="Cloud Run-ready incident risk scoring API for GCP service telemetry.",
)


@app.get("/")
def root() -> dict:
    return {
        "service": "gcp-aiops-incident-predictor",
        "docs": "/docs",
        "health": "/healthz",
    }


@app.get("/healthz")
def healthz() -> dict:
    return {"status": "healthy"}


@app.post("/score")
def score(request: TelemetryRequest) -> dict:
    telemetry = Telemetry(**request.model_dump())
    return score_incident(telemetry)
