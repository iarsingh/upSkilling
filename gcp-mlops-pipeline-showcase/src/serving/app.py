import json
import os
import time
import uuid
from contextlib import asynccontextmanager
from datetime import UTC, datetime

import numpy as np
from fastapi import FastAPI, HTTPException, Request
from google.cloud import storage
from prometheus_client import Counter, Gauge, Histogram, generate_latest
from pydantic import BaseModel, Field
from starlette.responses import Response

from src.common.model_io import load_model


FEATURE_NAMES = ["age", "sex", "bmi", "bp", "s1", "s2", "s3", "s4", "s5", "s6"]
MODEL_URI = os.getenv("MODEL_URI", "artifacts/model.joblib")
MODEL_NAME = os.getenv("MODEL_NAME", "diabetes-regressor")
MODEL_VERSION = os.getenv("MODEL_VERSION", "local")
PREDICTION_LOG_BUCKET = os.getenv("PREDICTION_LOG_BUCKET", "")
PREDICTION_LOG_PREFIX = os.getenv("PREDICTION_LOG_PREFIX", "predictions")

model = None

REQUESTS = Counter(
    "mlops_prediction_requests_total",
    "Prediction requests",
    ["model", "version", "status"],
)
LATENCY = Histogram(
    "mlops_prediction_latency_seconds",
    "Prediction request latency",
    ["model", "version"],
)
THROUGHPUT = Gauge(
    "mlops_predictions_last_request",
    "Number of predictions in the most recent request",
    ["model", "version"],
)


class PredictionRequest(BaseModel):
    instances: list[list[float]] = Field(min_length=1)


class V2InferenceInput(BaseModel):
    name: str = "features"
    shape: list[int]
    datatype: str = "FP64"
    data: list[float]


class V2InferenceRequest(BaseModel):
    id: str | None = None
    inputs: list[V2InferenceInput]


@asynccontextmanager
async def lifespan(_app: FastAPI):
    global model
    model = load_model(MODEL_URI)
    yield


app = FastAPI(title="GKE MLOps Inference API", version=MODEL_VERSION, lifespan=lifespan)


def predict_rows(rows: list[list[float]]) -> list[float]:
    if any(len(row) != len(FEATURE_NAMES) for row in rows):
        raise HTTPException(
            status_code=422,
            detail=f"Each instance must contain {len(FEATURE_NAMES)} features.",
        )
    predictions = model.predict(np.asarray(rows, dtype=float))
    return [float(value) for value in predictions]


def write_prediction_log(rows: list[list[float]], predictions: list[float]) -> None:
    if not PREDICTION_LOG_BUCKET:
        return
    event = {
        "timestamp": datetime.now(UTC).isoformat(),
        "model": MODEL_NAME,
        "version": MODEL_VERSION,
        "instances": rows,
        "predictions": predictions,
    }
    blob_name = (
        f"{PREDICTION_LOG_PREFIX}/{datetime.now(UTC):%Y/%m/%d/%H}/"
        f"{uuid.uuid4().hex}.json"
    )
    storage.Client().bucket(PREDICTION_LOG_BUCKET).blob(blob_name).upload_from_string(
        json.dumps(event),
        content_type="application/json",
    )


@app.middleware("http")
async def observe(request: Request, call_next):
    if request.url.path in {"/health", "/ready", "/metrics"}:
        return await call_next(request)
    start = time.perf_counter()
    status = "success"
    try:
        response = await call_next(request)
        if response.status_code >= 400:
            status = "error"
        return response
    except Exception:
        status = "error"
        raise
    finally:
        REQUESTS.labels(MODEL_NAME, MODEL_VERSION, status).inc()
        LATENCY.labels(MODEL_NAME, MODEL_VERSION).observe(time.perf_counter() - start)


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "model": MODEL_NAME, "version": MODEL_VERSION}


@app.get("/ready")
def ready() -> dict:
    if model is None:
        raise HTTPException(status_code=503, detail="Model is not loaded.")
    return {"status": "ready"}


@app.post("/predict")
def predict(payload: PredictionRequest) -> dict:
    predictions = predict_rows(payload.instances)
    THROUGHPUT.labels(MODEL_NAME, MODEL_VERSION).set(len(predictions))
    write_prediction_log(payload.instances, predictions)
    return {
        "model": MODEL_NAME,
        "version": MODEL_VERSION,
        "predictions": predictions,
    }


@app.get("/v2/models/{model_name}")
def v2_model_ready(model_name: str) -> dict:
    return {"name": model_name, "versions": [MODEL_VERSION], "platform": "sklearn"}


@app.post("/v2/models/{model_name}/infer")
def v2_infer(model_name: str, payload: V2InferenceRequest) -> dict:
    if not payload.inputs:
        raise HTTPException(status_code=422, detail="At least one input is required.")
    inference_input = payload.inputs[0]
    if len(inference_input.shape) != 2 or inference_input.shape[1] != len(FEATURE_NAMES):
        raise HTTPException(status_code=422, detail="Expected shape [N, 10].")
    rows = np.asarray(inference_input.data, dtype=float).reshape(inference_input.shape).tolist()
    predictions = predict_rows(rows)
    THROUGHPUT.labels(MODEL_NAME, MODEL_VERSION).set(len(predictions))
    write_prediction_log(rows, predictions)
    return {
        "model_name": model_name,
        "model_version": MODEL_VERSION,
        "id": payload.id,
        "outputs": [
            {
                "name": "predictions",
                "shape": [len(predictions), 1],
                "datatype": "FP64",
                "data": predictions,
            }
        ],
    }


@app.get("/metrics")
def metrics() -> Response:
    return Response(generate_latest(), media_type="text/plain")
