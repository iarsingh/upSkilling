import requests

from incident_copilot.copilot import ClaudeCopilot, OllamaCopilot, fallback_recommendation
from incident_copilot.schemas import IncidentFeatures


def sample_features() -> IncidentFeatures:
    return IncidentFeatures(
        cpu_utilization=91,
        memory_utilization=88,
        request_rate=1200,
        error_rate=0.12,
        latency_ms=850,
        pod_restarts=5,
        deploy_age_minutes=12,
        queue_depth=120,
    )


def test_fallback_recommendation_high_risk_mentions_action():
    features = sample_features()

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


def test_claude_recommendation_returns_model_text(monkeypatch):
    class Response:
        def raise_for_status(self):
            return None

        def json(self):
            return {"content": [{"type": "text", "text": "Scale pods and inspect rollout."}]}

    monkeypatch.setattr(requests, "post", lambda *args, **kwargs: Response())

    copilot = ClaudeCopilot(
        api_key="test-key",
        base_url="https://api.anthropic.com",
        model="claude-haiku-4-5",
        timeout_seconds=45,
    )

    recommendation, source = copilot.recommendation(sample_features(), 0.86, "high")

    assert recommendation == "Scale pods and inspect rollout."
    assert source == "claude"


def test_claude_recommendation_falls_back_without_api_key():
    copilot = ClaudeCopilot(
        api_key=None,
        base_url="https://api.anthropic.com",
        model="claude-haiku-4-5",
        timeout_seconds=45,
    )

    recommendation, source = copilot.recommendation(sample_features(), 0.86, "high")

    assert "High incident risk" in recommendation
    assert source == "fallback"


def test_claude_connection_probe_returns_true_on_success(monkeypatch):
    class Response:
        def raise_for_status(self):
            return None

    monkeypatch.setattr(requests, "get", lambda *args, **kwargs: Response())

    copilot = ClaudeCopilot(
        api_key="test-key",
        base_url="https://api.anthropic.com",
        model="claude-haiku-4-5",
        timeout_seconds=45,
    )

    assert copilot.is_connected() is True
