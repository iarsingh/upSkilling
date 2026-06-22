from pathlib import Path
import sys

PROJECT_SRC = Path(__file__).resolve().parents[1] / "src"
sys.path.insert(0, str(PROJECT_SRC))

from sre_metrics import evaluate_slo, load_logs, percentile, summarize


def logs_path() -> Path:
    return Path(__file__).resolve().parents[1] / "examples" / "inference_logs.jsonl"


def test_percentile_uses_sorted_values():
    assert percentile([300, 10, 20, 100], 95) == 300


def test_summarize_inference_logs():
    metrics = summarize(load_logs(logs_path()))

    assert metrics["requests"] == 14
    assert metrics["p99_latency_ms"] == 480
    assert metrics["error_rate"] > 0


def test_slo_evaluation_alerts_on_breach():
    metrics = summarize(load_logs(logs_path()))
    policy = {
        "max_p99_latency_ms": 300,
        "max_error_rate": 0.02,
        "max_drift_score": 0.2,
    }

    report = evaluate_slo(metrics, policy)

    assert report["status"] == "alert"
    assert report["checks"]["p99_latency"] is False
    assert report["checks"]["error_rate"] is False
    assert report["checks"]["drift_score"] is False
