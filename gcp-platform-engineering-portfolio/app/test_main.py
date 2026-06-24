from fastapi.testclient import TestClient

from main import app


client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_ready() -> None:
    response = client.get("/ready")
    assert response.status_code == 200
    assert response.json() == {"status": "ready"}


def test_predict_sorts_input_keys() -> None:
    response = client.post("/predict", json={"z": 1, "a": 2})
    assert response.status_code == 200
    assert response.json()["input_keys"] == ["a", "z"]


def test_metrics_exposes_http_metrics() -> None:
    client.get("/health")
    response = client.get("/metrics")
    assert response.status_code == 200
    assert "platform_sample_http_requests_total" in response.text
