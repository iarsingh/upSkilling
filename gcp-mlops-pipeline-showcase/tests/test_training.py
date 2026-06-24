from pathlib import Path

from src.training.train import train_model


def test_training_creates_artifacts(tmp_path: Path, monkeypatch) -> None:
    monkeypatch.delenv("MODEL_ARTIFACT_URI", raising=False)
    monkeypatch.delenv("BASELINE_ARTIFACT_URI", raising=False)
    monkeypatch.setenv("MLFLOW_TRACKING_URI", f"sqlite:///{tmp_path / 'mlflow.db'}")
    result = train_model(tmp_path / "artifacts", n_estimators=10, max_depth=3)
    assert Path(result["model_path"]).exists()
    assert Path(result["baseline_path"]).exists()
    assert result["metrics"]["rmse"] > 0
