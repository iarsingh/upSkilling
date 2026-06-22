import argparse
import json
from pathlib import Path


REQUIRED_FIELDS = {"model_name", "endpoint", "sampling_rate", "alert_topic", "features", "prediction"}


def load_policy(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def validate_policy(policy: dict) -> dict:
    missing = sorted(REQUIRED_FIELDS - set(policy))
    feature_errors = []

    for feature_name, config in policy.get("features", {}).items():
        if not 0 < config.get("drift_threshold", 0) <= 1:
            feature_errors.append(f"{feature_name}.drift_threshold")
        if not 0 < config.get("skew_threshold", 0) <= 1:
            feature_errors.append(f"{feature_name}.skew_threshold")

    prediction_threshold = policy.get("prediction", {}).get("drift_threshold", 0)
    sampling_rate = policy.get("sampling_rate", 0)
    errors = []
    if missing:
        errors.append(f"missing_fields={','.join(missing)}")
    if feature_errors:
        errors.append(f"invalid_feature_thresholds={','.join(feature_errors)}")
    if not 0 < prediction_threshold <= 1:
        errors.append("invalid_prediction_drift_threshold")
    if not 0 < sampling_rate <= 1:
        errors.append("invalid_sampling_rate")

    return {
        "valid": not errors,
        "errors": errors,
        "feature_count": len(policy.get("features", {})),
        "model_name": policy.get("model_name"),
    }


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Validate Vertex AI monitoring policy.")
    subparsers = parser.add_subparsers(dest="command", required=True)
    validate = subparsers.add_parser("validate")
    validate.add_argument("--policy", required=True)
    return parser


def main() -> None:
    args = build_parser().parse_args()
    result = validate_policy(load_policy(Path(args.policy)))
    print(json.dumps(result, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
