from pathlib import Path

from fastapi.testclient import TestClient

from ml_labs import serving
from ml_labs.mlops_pipeline import generate_churn, train_and_evaluate


def test_health_predict_and_validation(tmp_path: Path, monkeypatch):
    train_and_evaluate(generate_churn(n=300, seed=2), artifact_dir=tmp_path, seed=2)
    monkeypatch.setattr(serving, "MODEL_PATH", tmp_path / "churn_model.joblib")
    serving.reset_bundle_cache()

    client = TestClient(serving.app)
    assert client.get("/healthz").json() == {"status": "ok"}
    assert client.get("/readyz").status_code == 200

    payload = {
        "tenure": 4,
        "monthly_charges": 89.5,
        "support_tickets": 6,
        "late_payments": 3,
        "contract": "month-to-month",
    }
    row = client.post("/predict", json=payload).json()
    assert 0.0 <= row["churn_probability"] <= 1.0
    assert row["model_version"].startswith("lab-")
    assert isinstance(row["needs_human_review"], bool)
    assert row["factors"][0]["feature"]
    catalog = client.get("/model").json()
    assert catalog["features"] == [
        "tenure",
        "monthly_charges",
        "support_tickets",
        "late_payments",
        "contract",
    ]
    assert "f1" in catalog["metrics"]

    batch = client.post("/predict/batch", json=[payload, payload]).json()
    assert len(batch["predictions"]) == 2

    assert client.post("/predict", json={**payload, "tenure": -1}).status_code == 422
    assert client.post("/predict/batch", json=[]).status_code == 422
