from types import SimpleNamespace

import pytest
from pydantic import ValidationError

from incident_ops.config import Settings
from incident_ops.model import Classifier
from incident_ops.recommendations import recommend
from incident_ops.schemas import Recommendation


def test_corrupt_artifact_is_rejected(model_path, tmp_path):
    path = tmp_path / "model.joblib"
    path.write_bytes(model_path.read_bytes() + b"tampered")
    path.with_suffix(".json").write_text(model_path.with_suffix(".json").read_text())
    with pytest.raises(ValueError, match="checksum"):
        Classifier(path)


def test_production_requires_auth_and_database():
    with pytest.raises(ValidationError):
        Settings(_env_file=None, app_env="production", api_key="", database_url="sqlite:///x.db")
    with pytest.raises(ValidationError):
        Settings(_env_file=None, llm_provider="openai", openai_api_key="", openai_model="")


@pytest.mark.parametrize("citation", ["invented-runbook", "rb-real"])
def test_provider_citations_are_checked(monkeypatch, citation):
    class Client:
        def __init__(self, **kwargs):
            self.responses = self

        def __enter__(self):
            return self

        def __exit__(self, *args):
            pass

        def parse(self, **kwargs):
            assert kwargs["store"] is False
            return SimpleNamespace(
                output_parsed=Recommendation(
                    summary="Inspect the evidence", steps=["Review logs"], citation_ids=[citation]
                )
            )

    monkeypatch.setattr("incident_ops.recommendations.OpenAI", Client)
    settings = Settings(
        _env_file=None, llm_provider="openai", openai_api_key="fake", openai_model="test-model"
    )
    books = [{"id": "rb-real", "title": "Real runbook", "steps": ["Check logs"], "content": "Inspect logs"}]
    result = recommend("an incident", books, settings)
    assert result["mode"] == ("openai" if citation == "rb-real" else "runbook_fallback")
    assert result["citation_ids"] == ["rb-real"]


def test_missing_model_keeps_liveness_but_fails_readiness(tmp_path):
    from fastapi.testclient import TestClient

    from incident_ops.main import create_app

    settings = Settings(
        _env_file=None,
        app_env="test",
        model_path=tmp_path / "missing",
        database_url=f"sqlite:///{tmp_path}/empty.db",
    )
    with TestClient(create_app(settings)) as client:
        assert client.get("/health/live").status_code == 200
        assert client.get("/health/ready").status_code == 503


def test_tracking_failure_preserves_previous_model(model_path, monkeypatch):
    from pathlib import Path

    import mlflow

    from incident_ops.train import train

    previous_model = model_path.read_bytes()
    previous_metadata = model_path.with_suffix(".json").read_bytes()

    def unavailable(*args, **kwargs):
        raise RuntimeError("Tracking unavailable")

    monkeypatch.setattr(mlflow, "set_experiment", unavailable)
    with pytest.raises(RuntimeError, match="Tracking unavailable"):
        train(Path("data/training.json"), Path("data/evaluation.json"), model_path, track=True)
    assert model_path.read_bytes() == previous_model
    assert model_path.with_suffix(".json").read_bytes() == previous_metadata


def test_training_rejects_evaluation_overlap(tmp_path):
    from pathlib import Path

    from incident_ops.train import train

    with pytest.raises(ValueError, match="overlap"):
        train(Path("data/training.json"), Path("data/training.json"), tmp_path / "model.joblib")
