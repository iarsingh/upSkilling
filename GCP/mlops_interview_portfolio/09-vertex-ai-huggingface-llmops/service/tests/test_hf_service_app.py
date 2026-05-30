import sys
from pathlib import Path

import pytest

pytest.importorskip("fastapi")

from fastapi.testclient import TestClient

sys.path.append(str(Path(__file__).resolve().parents[1]))

from app import app


client = TestClient(app)


def test_health_returns_model_id():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_predict_returns_sentiment_response():
    response = client.post(
        "/predict",
        json={"text": "The delivery was late and support was slow."},
    )

    assert response.status_code == 200
    assert response.json()["label"] == "negative"
