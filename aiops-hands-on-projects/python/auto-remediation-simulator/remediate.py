import argparse
from pathlib import Path

import pandas as pd


def choose_action(row: pd.Series) -> str:
    if row["action_risk"] == "high":
        return "require_human_approval"
    if row["symptom"] == "high_latency" and row["cpu_utilization"] >= 0.75:
        return f"scale_deployment_to_{int(row['current_replicas']) + 1}_replicas"
    if row["symptom"] == "high_error_rate" and row["error_rate"] >= 0.10:
        return "rollback_last_release"
    if row["symptom"] == "dependency_error":
        return "restart_dependency_client_and_page_owner"
    return "collect_more_signals"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    args = parser.parse_args()

    signals = pd.read_csv(Path(args.input))
    signals["recommended_action"] = signals.apply(choose_action, axis=1)
    print(signals.to_string(index=False))


if __name__ == "__main__":
    main()

