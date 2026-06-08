import argparse
from pathlib import Path

import pandas as pd


def detect_anomalies(logs: pd.DataFrame) -> pd.DataFrame:
    logs["is_error"] = logs["status_code"] >= 500
    logs["is_slow"] = logs["latency_ms"] >= 800

    service_summary = logs.groupby(["service", "namespace"], as_index=False).agg(
        requests=("status_code", "count"),
        errors=("is_error", "sum"),
        slow_requests=("is_slow", "sum"),
        p95_latency_ms=("latency_ms", lambda values: values.quantile(0.95)),
    )
    service_summary["error_rate"] = service_summary["errors"] / service_summary["requests"]
    service_summary["anomaly_score"] = (
        service_summary["error_rate"] * 100
        + service_summary["slow_requests"] * 10
        + (service_summary["p95_latency_ms"] / 1000)
    )
    service_summary["anomaly"] = service_summary["anomaly_score"] >= 20
    return service_summary.sort_values("anomaly_score", ascending=False)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    args = parser.parse_args()

    logs = pd.read_csv(Path(args.input), parse_dates=["timestamp"])
    result = detect_anomalies(logs)
    print(result.to_string(index=False))


if __name__ == "__main__":
    main()

