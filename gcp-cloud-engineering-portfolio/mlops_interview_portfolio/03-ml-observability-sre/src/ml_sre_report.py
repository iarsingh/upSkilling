import argparse
import json
from pathlib import Path

from sre_metrics import evaluate_slo, load_logs, summarize


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Generate an ML inference SLO report.")
    parser.add_argument("--logs", required=True)
    parser.add_argument(
        "--policy",
        default=str(Path(__file__).resolve().parents[1] / "config" / "slo_policy.json"),
    )
    return parser


def main() -> None:
    args = build_parser().parse_args()
    logs = load_logs(Path(args.logs))
    policy = json.loads(Path(args.policy).read_text(encoding="utf-8"))
    report = evaluate_slo(summarize(logs), policy)
    print(json.dumps(report, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
