from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="FastAPI ML Inference API", version="0.1.0")

MODEL_VERSION = "fraud-demo-v1"
THRESHOLD = 0.55


class PredictionRequest(BaseModel):
    features: list[float] = Field(min_length=1, max_length=50)


class PredictionResponse(BaseModel):
    model_version: str
    score: float
    prediction: int
    threshold: float


@app.get("/model")
def model_metadata() -> dict:
    return {
        "model_version": MODEL_VERSION,
        "threshold": THRESHOLD,
        "feature_contract": "list[float]",
    }


@app.post("/predict", response_model=PredictionResponse)
def predict(payload: PredictionRequest) -> PredictionResponse:
    score = sum(payload.features) / len(payload.features)
    return PredictionResponse(
        model_version=MODEL_VERSION,
        score=round(score, 4),
        prediction=int(score >= THRESHOLD),
        threshold=THRESHOLD,
    )

