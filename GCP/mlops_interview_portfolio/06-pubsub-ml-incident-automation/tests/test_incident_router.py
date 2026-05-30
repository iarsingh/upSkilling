import base64
import json
from pathlib import Path
import sys

PROJECT_SRC = Path(__file__).resolve().parents[1] / "src"
sys.path.insert(0, str(PROJECT_SRC))

from incident_router import classify, handle_pubsub_event, load_json


ROOT = Path(__file__).resolve().parents[1]


def test_drift_alert_routes_to_ml_platform():
    alert = load_json(ROOT / "examples" / "model_drift_alert.json")
    runbooks = load_json(ROOT / "config" / "runbooks.json")

    result = classify(alert, runbooks)

    assert result["owner"] == "ml-platform"
    assert result["severity"] == "warning"
    assert result["breach_ratio"] > 1


def test_pubsub_event_handler_decodes_alert():
    alert = load_json(ROOT / "examples" / "high_latency_alert.json")
    runbooks = load_json(ROOT / "config" / "runbooks.json")
    event = {"data": base64.b64encode(json.dumps(alert).encode("utf-8"))}

    result = handle_pubsub_event(event, runbooks)

    assert result["owner"] == "platform-sre"
    assert result["severity"] == "critical"
    assert "HPA" in " ".join(result["recommended_actions"])
