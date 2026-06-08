import argparse
from pathlib import Path

import pandas as pd


def analyze_burn_rate(events: pd.DataFrame) -> pd.DataFrame:
    events["error_rate"] = events["bad_requests"] / events["total_requests"]
    events["allowed_error_rate"] = 1 - events["slo_target"]
    events["burn_rate"] = events["error_rate"] / events["allowed_error_rate"]
    events["page"] = events["burn_rate"] >= 4
    return events


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    args = parser.parse_args()

    events = pd.read_csv(Path(args.input), parse_dates=["minute"])
    result = analyze_burn_rate(events)
    print(result.to_string(index=False))

    avg_burn = result["burn_rate"].mean()
    print(f"\naverage_burn_rate={avg_burn:.2f}")


if __name__ == "__main__":
    main()

