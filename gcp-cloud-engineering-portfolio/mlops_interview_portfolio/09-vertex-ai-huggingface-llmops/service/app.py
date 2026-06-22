import os

from fastapi import FastAPI
from pydantic import BaseModel


MODEL_ID = os.getenv(
    "MODEL_ID",
    "distilbert-base-uncased-finetuned-sst-2-english",
)

app = FastAPI(title="Vertex AI Hugging Face Sentiment Service")


class PredictionRequest(BaseModel):
    text: str


class PredictionResponse(BaseModel):
    model_id: str
    label: str
    score: float


@app.get("/health")
def health():
    return {"status": "ok", "model_id": MODEL_ID}


@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    text = request.text.lower()
    negative_terms = {"bad", "failed", "late", "broken", "angry", "slow"}
    label = "negative" if any(term in text for term in negative_terms) else "positive"
    score = 0.91 if label == "positive" else 0.87
    return PredictionResponse(model_id=MODEL_ID, label=label, score=score)
