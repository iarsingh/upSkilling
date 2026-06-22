import json
from pathlib import Path


def load_logs(path: Path) -> list[dict]:
    return [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]


def percentile(values: list[float], percentile_value: float) -> float:
    if not values:
        return 0.0
    ordered = sorted(values)
    index = min(round((percentile_value / 100) * (len(ordered) - 1)), len(ordered) - 1)
    return ordered[index]


def summarize(logs: list[dict]) -> dict:
    latencies = [float(row["latency_ms"]) for row in logs]
    errors = [row for row in logs if row["status"] != "ok"]
    drift_scores = [float(row.get("drift_score", 0.0)) for row in logs]

    return {
        "requests": len(logs),
        "p95_latency_ms": round(percentile(latencies, 95), 2),
        "p99_latency_ms": round(percentile(latencies, 99), 2),
        "error_rate": round(len(errors) / max(len(logs), 1), 4),
        "max_drift_score": round(max(drift_scores) if drift_scores else 0.0, 4),
    }


def evaluate_slo(metrics: dict, policy: dict) -> dict:
    checks = {
        "p99_latency": metrics["p99_latency_ms"] <= policy["max_p99_latency_ms"],
        "error_rate": metrics["error_rate"] <= policy["max_error_rate"],
        "drift_score": metrics["max_drift_score"] <= policy["max_drift_score"],
    }
    status = "healthy" if all(checks.values()) else "alert"
    if status == "healthy":
        summary = "Inference service is within configured SLO thresholds."
    else:
        failed = ", ".join(name for name, passed in checks.items() if not passed)
        summary = f"SLO breach detected for: {failed}."

    return {
        "status": status,
        "summary": summary,
        "checks": checks,
        "metrics": metrics,
    }
