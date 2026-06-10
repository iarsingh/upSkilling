import json
from pathlib import Path

import pandas as pd

from incident_copilot.monitoring import detect_mean_drift


def main() -> None:
    baseline = pd.read_csv("data/raw/incidents.csv").sample(1000, random_state=7)
    current = pd.read_csv("data/raw/incidents.csv").sample(1000, random_state=11).copy()
    current["latency_ms"] = current["latency_ms"] * 1.35
    current["error_rate"] = current["error_rate"] * 1.25
    signals = [signal.__dict__ for signal in detect_mean_drift(baseline, current)]
    output = Path("data/processed/model_monitoring_report.json")
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(signals, indent=2), encoding="utf-8")
    print(f"Wrote drift report to {output}")


if __name__ == "__main__":
    main()
