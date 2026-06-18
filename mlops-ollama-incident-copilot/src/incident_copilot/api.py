from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Response
from prometheus_client import CONTENT_TYPE_LATEST, Counter, Histogram, generate_latest

from incident_copilot.copilot import OllamaCopilot
from incident_copilot.model import FEATURE_COLUMNS, IncidentRiskModel, risk_level
from incident_copilot.schemas import (
    HealthResponse,
    IncidentFeatures,
    ModelInfoResponse,
    PredictionResponse,
)
from incident_copilot.settings import get_settings

settings = get_settings()
model = IncidentRiskModel(settings.model_path)
copilot = OllamaCopilot(
    base_url=settings.ollama_base_url,
    model=settings.ollama_model,
    timeout_seconds=settings.copilot_timeout_seconds,
)

PREDICTIONS = Counter("incident_copilot_predictions_total", "Total prediction requests")
MODEL_LATENCY = Histogram("incident_copilot_prediction_seconds", "Prediction latency")


@asynccontextmanager
async def lifespan(_: FastAPI):
    if settings.model_path.exists():
        model.load()
    yield


app = FastAPI(
    title="MLOps Ollama Incident Copilot",
    version="0.1.0",
    description="Local incident-risk prediction API with Ollama-generated remediation guidance.",
    lifespan=lifespan,
)


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(
        status="ok" if model.loaded else "model-missing",
        model_loaded=model.loaded,
        ollama_connected=copilot.is_connected(),
        ollama_base_url=settings.ollama_base_url,
        ollama_model=settings.ollama_model,
    )


@app.get("/ready", response_model=HealthResponse)
def ready() -> HealthResponse:
    if not model.loaded:
        raise HTTPException(status_code=503, detail="Model artifact is not loaded")
    return health()


@app.get("/model/info", response_model=ModelInfoResponse)
def model_info() -> ModelInfoResponse:
    return ModelInfoResponse(
        model_name=settings.model_name,
        model_version=model.version,
        registry_uri=settings.model_registry_uri,
        feature_columns=FEATURE_COLUMNS,
        artifact_path=str(settings.model_path),
    )


@app.post("/predict", response_model=PredictionResponse)
def predict(payload: IncidentFeatures) -> PredictionResponse:
    if not model.loaded:
        raise HTTPException(status_code=503, detail="Model artifact missing. Run `make train` first.")

    PREDICTIONS.inc()
    with MODEL_LATENCY.time():
        probability = model.predict_probability(payload)
    risk = risk_level(probability)
    recommendation, source = copilot.recommendation(payload, probability, risk)
    return PredictionResponse(
        incident_probability=probability,
        risk_level=risk,
        recommendation=recommendation,
        model_version=model.version,
        copilot_source=source,
    )


@app.get("/metrics")
def metrics() -> Response:
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)
