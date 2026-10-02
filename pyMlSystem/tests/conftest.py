from pathlib import Path

import pytest
from alembic import command
from alembic.config import Config
from fastapi.testclient import TestClient

from incident_ops.config import Settings
from incident_ops.main import create_app
from incident_ops.seed import seed
from incident_ops.train import train


@pytest.fixture(scope="session")
def model_path(tmp_path_factory):
    path = tmp_path_factory.mktemp("model") / "classifier.joblib"
    train(Path("data/training.json"), Path("data/evaluation.json"), path)
    return path


@pytest.fixture
def client(tmp_path, model_path, monkeypatch):
    url = f"sqlite:///{tmp_path / 'test.db'}"
    monkeypatch.setenv("DATABASE_URL", url)
    monkeypatch.setenv("APP_ENV", "test")
    monkeypatch.setenv("LLM_PROVIDER", "disabled")
    command.upgrade(Config("alembic.ini"), "head")
    settings = Settings(_env_file=None, database_url=url, model_path=model_path, api_key="test-secret")
    app = create_app(settings)
    with app.state.sessions() as session:
        seed(session)
    with TestClient(app, headers={"X-API-Key": "test-secret"}) as test_client:
        yield test_client
