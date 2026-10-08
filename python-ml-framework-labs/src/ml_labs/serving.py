"""Lab 04 — FastAPI serving for the synthetic churn classifier.

Loads a local joblib artifact. If none exists, trains a demo model in-process so the
lab can run alone. This is not a production inference stack.
"""

from __future__ import annotations

from enum import StrEnum
from functools import lru_cache
from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from ml_labs.mlops_pipeline import (
    DEFAULT_ARTIFACT_DIR,
    FEATURE_COLUMNS,
    feature_contributions,
    generate_churn,
    train_and_evaluate,
)
from ml_labs.ops import router as ops_router

MODEL_PATH = DEFAULT_ARTIFACT_DIR / "churn_model.joblib"


class ContractType(StrEnum):
    month_to_month = "month-to-month"
    one_year = "one-year"
    two_year = "two-year"


class PredictRequest(BaseModel):
    tenure: int = Field(ge=0, le=120)
    monthly_charges: float = Field(gt=0, le=500)
    support_tickets: int = Field(ge=0, le=50)
    late_payments: int = Field(ge=0, le=50)
    contract: ContractType


class Factor(BaseModel):
    feature: str
    contribution: float
    direction: str


class PredictResponse(BaseModel):
    churn_probability: float
    churn_predicted: bool
    model_version: str
    needs_human_review: bool
    factors: list[Factor]


def _ensure_model(path: Path = MODEL_PATH) -> Path:
    if not path.exists():
        train_and_evaluate(generate_churn(n=400, seed=3), artifact_dir=path.parent)
    return path


@lru_cache(maxsize=1)
def get_bundle():
    path = MODEL_PATH
    payload = joblib.load(_ensure_model(path))
    digest = path.stat().st_mtime_ns
    return payload["model"], payload.get("metrics", {}), f"lab-{digest}"


def reset_bundle_cache() -> None:
    get_bundle.cache_clear()


app = FastAPI(
    title="Churn serving lab",
    description="Local FastAPI lab for a synthetic churn model. Not a production service.",
    version="0.1.0",
)
app.include_router(ops_router, prefix="/v1")


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/readyz")
def readyz() -> dict[str, str]:
    try:
        get_bundle()
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=503, detail=f"model not ready: {exc}") from exc
    return {"status": "ready"}


def _predict_one(body: PredictRequest) -> PredictResponse:
    model, _metrics, version = get_bundle()
    row = pd.DataFrame(
        [{name: getattr(body, name) if name != "contract" else body.contract.value for name in FEATURE_COLUMNS}]
    )
    proba = float(model.predict_proba(row)[0, 1])
    predicted = proba >= 0.5
    return PredictResponse(
        churn_probability=round(proba, 4),
        churn_predicted=predicted,
        model_version=version,
        needs_human_review=0.4 <= proba <= 0.6,
        factors=[Factor(**item) for item in feature_contributions(model, row)],
    )


@app.get("/model")
def get_model() -> dict:
    _model, metrics, version = get_bundle()
    return {
        "model_version": version,
        "features": list(FEATURE_COLUMNS),
        "metrics": metrics,
        "note": "synthetic lab artifact; not a production-trained model",
    }


@app.post("/predict", response_model=PredictResponse)
def predict(body: PredictRequest) -> PredictResponse:
    return _predict_one(body)


@app.post("/predict/batch")
def predict_batch(body: list[PredictRequest]) -> dict:
    if not body:
        raise HTTPException(status_code=422, detail="empty batch")
    if len(body) > 100:
        raise HTTPException(status_code=422, detail="batch larger than 100")
    return {"predictions": [_predict_one(item).model_dump() for item in body]}
