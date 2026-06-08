import argparse
from pathlib import Path

import pandas as pd


def correlate_alerts(alerts: pd.DataFrame) -> pd.DataFrame:
    alerts["timestamp"] = pd.to_datetime(alerts["timestamp"])
    alerts["window"] = alerts["timestamp"].dt.floor("5min")

    incidents = alerts.groupby(["window", "namespace", "service"], as_index=False).agg(
        first_seen=("timestamp", "min"),
        last_seen=("timestamp", "max"),
        alert_count=("alert_id", "count"),
        alert_names=("alert_name", lambda values: ", ".join(sorted(set(values)))),
        highest_severity=("severity", severity_rollup),
        resources=("resource", lambda values: ", ".join(sorted(set(values)))),
    )
    incidents["incident_candidate"] = incidents["alert_count"] >= 2
    return incidents.sort_values(["incident_candidate", "alert_count"], ascending=False)


def severity_rollup(values: pd.Series) -> str:
    order = {"info": 0, "warning": 1, "critical": 2}
    return max(values, key=lambda item: order.get(str(item).lower(), 0))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    args = parser.parse_args()

    alerts = pd.read_csv(Path(args.input))
    incidents = correlate_alerts(alerts)
    print(incidents.to_string(index=False))


if __name__ == "__main__":
    main()

