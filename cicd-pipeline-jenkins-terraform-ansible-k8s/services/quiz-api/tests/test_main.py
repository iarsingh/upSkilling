import os
import tempfile

import pytest

os.environ.setdefault("QUIZ_API_DB_PATH", os.path.join(tempfile.mkdtemp(), "reviews.db"))

from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture(scope="module")
def client():
    with TestClient(app) as c:  # runs lifespan startup (init_db) on enter
        yield c


def test_health(client):
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"
    assert resp.json()["questions_loaded"] > 0


def test_topics_nonempty(client):
    resp = client.get("/topics")
    assert resp.status_code == 200
    topics = resp.json()
    assert len(topics) > 0
    assert topics[0]["topic"] == "Kubernetes"  # DevOps/K8s content should sort first


def test_questions_for_unknown_topic_404s(client):
    resp = client.get("/questions", params={"topic": "Not A Real Topic"})
    assert resp.status_code == 404


def test_review_then_stats_reflects_it(client):
    topic = "Kubernetes"
    question_id = client.get("/questions", params={"topic": topic}).json()[0]["id"]

    review = client.post("/reviews", json={"question_id": question_id, "rating": "good"})
    assert review.status_code == 200
    assert review.json()["interval_days"] == 1.0

    stats = client.get("/stats", params={"topic": topic}).json()
    assert stats["reviewed"] == 1
