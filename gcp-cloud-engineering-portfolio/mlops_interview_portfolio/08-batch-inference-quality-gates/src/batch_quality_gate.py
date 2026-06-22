import argparse
import json
from pathlib import Path


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_manifest(manifest):
    failures = []
    input_profile = manifest["input_profile"]
    prediction_profile = manifest["prediction_profile"]
    policy = manifest["policy"]

    input_rows = input_profile["rows"]
    prediction_rows = prediction_profile["rows"]
    completeness_rate = prediction_rows / input_rows if input_rows else 0

    if input_rows < policy["minimum_rows"]:
        failures.append(
            f"input rows below minimum: {input_rows} < {policy['minimum_rows']}"
        )
    if input_profile["duplicate_entity_rate"] > policy["max_duplicate_entity_rate"]:
        failures.append("duplicate entity rate exceeded")
    if (
        input_profile["missing_required_feature_rate"]
        > policy["max_missing_required_feature_rate"]
    ):
        failures.append("missing required feature rate exceeded")
    if completeness_rate < policy["min_output_completeness_rate"]:
        failures.append(
            f"output completeness below threshold: {completeness_rate:.5f}"
        )
    if prediction_profile["failed_prediction_rate"] > policy["max_failed_prediction_rate"]:
        failures.append("failed prediction rate exceeded")
    if prediction_profile["null_prediction_rate"] > policy["max_null_prediction_rate"]:
        failures.append("null prediction rate exceeded")

    return {
        "batch_id": manifest["batch_id"],
        "owner": manifest["owner"],
        "status": "publish" if not failures else "quarantine",
        "input_rows": input_rows,
        "prediction_rows": prediction_rows,
        "output_completeness_rate": round(completeness_rate, 6),
        "failures": failures,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("evaluate")
    parser.add_argument("--manifest", required=True)
    args = parser.parse_args()

    result = evaluate_manifest(load_json(args.manifest))
    print(json.dumps(result, indent=2))
    raise SystemExit(0 if result["status"] == "publish" else 1)


if __name__ == "__main__":
    main()
