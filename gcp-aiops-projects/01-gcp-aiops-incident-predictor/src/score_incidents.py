import argparse
import csv
from pathlib import Path

from aiops_core import Telemetry, score_incident


def parse_bool(value: str) -> bool:
    return value.strip().lower() in {"1", "true", "yes", "y"}


def row_to_telemetry(row: dict[str, str]) -> Telemetry:
    return Telemetry(
        service_name=row["service_name"],
        gcp_region=row["gcp_region"],
        p95_latency_ms=float(row["p95_latency_ms"]),
        error_rate_pct=float(row["error_rate_pct"]),
        cpu_utilization_pct=float(row["cpu_utilization_pct"]),
        memory_utilization_pct=float(row["memory_utilization_pct"]),
        active_alert_count=int(row["active_alert_count"]),
        deployment_within_30m=parse_bool(row["deployment_within_30m"]),
        slo_burn_rate=float(row["slo_burn_rate"]),
    )


def score_file(path: Path) -> list[dict]:
    with path.open(encoding="utf-8", newline="") as file:
        rows = csv.DictReader(file)
        return [score_incident(row_to_telemetry(row)) for row in rows]


def main() -> None:
    parser = argparse.ArgumentParser(description="Score GCP service telemetry for incident risk.")
    parser.add_argument("--input", required=True, help="Path to telemetry CSV")
    args = parser.parse_args()

    for result in score_file(Path(args.input)):
        print(
            f"{result['service_name']} {result['gcp_region']} "
            f"score={result['risk_score']} tier={result['risk_tier']} "
            f"approval={result['requires_human_approval']}"
        )


if __name__ == "__main__":
    main()
