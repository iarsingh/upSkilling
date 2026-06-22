from pathlib import Path
import sys

PROJECT_SRC = Path(__file__).resolve().parents[1] / "src"
sys.path.insert(0, str(PROJECT_SRC))

from monitoring_policy import load_policy, validate_policy


def test_example_policy_is_valid():
    path = Path(__file__).resolve().parents[1] / "examples" / "model_monitoring_policy.json"
    result = validate_policy(load_policy(path))

    assert result["valid"] is True
    assert result["feature_count"] == 4


def test_invalid_sampling_rate_fails():
    result = validate_policy(
        {
            "model_name": "x",
            "endpoint": "endpoint",
            "sampling_rate": 2,
            "alert_topic": "topic",
            "features": {},
            "prediction": {"drift_threshold": 0.2},
        }
    )

    assert result["valid"] is False
    assert "invalid_sampling_rate" in result["errors"]
