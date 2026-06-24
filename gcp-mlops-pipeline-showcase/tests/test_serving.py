from pathlib import Path

import joblib
from fastapi.testclient import TestClient
from sklearn.dummy import DummyRegressor


def test_prediction_api(tmp_path: Path, monkeypatch) -> None:
    model_path = tmp_path / "model.joblib"
    model = DummyRegressor(strategy="constant", constant=123.0)
    model.fit([[0.0] * 10], [123.0])
    joblib.dump(model, model_path)

    monkeypatch.setenv("MODEL_URI", str(model_path))
    monkeypatch.delenv("PREDICTION_LOG_BUCKET", raising=False)

    import src.serving.app as serving

    serving.model = serving.load_model(str(model_path))
    client = TestClient(serving.app)
    response = client.post("/predict", json={"instances": [[0.0] * 10]})
    assert response.status_code == 200
    assert response.json()["predictions"] == [123.0]


def test_kserve_v2_rejects_wrong_shape(tmp_path: Path, monkeypatch) -> None:
    model_path = tmp_path / "model.joblib"
    model = DummyRegressor(strategy="mean")
    model.fit([[0.0] * 10], [1.0])
    joblib.dump(model, model_path)
    monkeypatch.setenv("MODEL_URI", str(model_path))

    import src.serving.app as serving

    serving.model = serving.load_model(str(model_path))
    client = TestClient(serving.app)
    response = client.post(
        "/v2/models/diabetes-regressor/infer",
        json={
            "inputs": [{"name": "features", "shape": [1, 9], "datatype": "FP64", "data": [0] * 9}]
        },
    )
    assert response.status_code == 422
