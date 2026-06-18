import requests

from incident_copilot.copilot import OllamaCopilot, fallback_recommendation
from incident_copilot.schemas import IncidentFeatures


def test_fallback_recommendation_high_risk_mentions_action():
    features = IncidentFeatures(
        cpu_utilization=91,
        memory_utilization=88,
        request_rate=1200,
        error_rate=0.12,
        latency_ms=850,
        pod_restarts=5,
        deploy_age_minutes=12,
        queue_depth=120,
    )

    recommendation = fallback_recommendation(features, 0.86, "high")

    assert "High incident risk" in recommendation
    assert "rollback" in recommendation


def test_ollama_connection_probe_returns_false_on_connection_error(monkeypatch):
    def raise_connection_error(*args, **kwargs):
        raise requests.ConnectionError("not running")

    monkeypatch.setattr(requests, "get", raise_connection_error)

    copilot = OllamaCopilot("http://localhost:11434", "llama3.1:8b", 45)

    assert copilot.is_connected() is False


def test_ollama_connection_probe_returns_true_on_success(monkeypatch):
    class Response:
        def raise_for_status(self):
            return None

    monkeypatch.setattr(requests, "get", lambda *args, **kwargs: Response())

    copilot = OllamaCopilot("http://localhost:11434", "llama3.1:8b", 45)

    assert copilot.is_connected() is True
