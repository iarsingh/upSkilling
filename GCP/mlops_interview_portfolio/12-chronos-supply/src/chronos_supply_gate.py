import argparse
import json
from pathlib import Path


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_run(candidate):
    failures = []
    validation = candidate["data_validation"]
    training = candidate["training"]
    evaluation = candidate["evaluation"]
    registry = candidate["registry"]
    serving = candidate["serving"]

    if candidate.get("orchestrator") != "cloud-composer":
        failures.append("orchestrator must be cloud-composer")
    if validation.get("tool") != "great-expectations":
        failures.append("data validation must use great-expectations")
    if validation.get("runner") != "dataflow":
        failures.append("data validation runner must be dataflow")
    if validation["failed_expectation_rate"] > validation["max_failed_expectation_rate"]:
        failures.append("failed expectation rate exceeds policy")
    if training["spot_worker_ratio"] < training["min_spot_worker_ratio"]:
        failures.append("spot worker ratio below cost policy")
    if training["estimated_batch_cost_usd"] > training["max_batch_cost_usd"]:
        failures.append("estimated batch cost exceeds budget")
    if evaluation["segments_improved_rate"] < evaluation["min_segments_improved_rate"]:
        failures.append("not enough SKU-store segments improved")
    if evaluation["worst_segment_wape_regression"] > evaluation["max_wape_regression"]:
        failures.append("worst segment WAPE regression exceeds policy")
    if registry.get("target") != "vertex-ai-model-registry":
        failures.append("model registry target must be Vertex AI")
    if registry.get("ci_system") != "github-actions":
        failures.append("model registration must be controlled by GitHub Actions")
    if not registry.get("approved"):
        failures.append("model registry approval missing")
    if not registry.get("lineage_uri"):
        failures.append("lineage URI missing")
    if serving["micro_batch_minutes"] > serving["max_micro_batch_minutes"]:
        failures.append("micro-batch serving interval exceeds SLA")
    if not serving.get("bigquery_output_enabled"):
        failures.append("BigQuery prediction output must be enabled")
    if not serving.get("redis_cache_enabled"):
        failures.append("Redis inventory cache must be enabled")

    return {
        "status": "approved" if not failures else "blocked",
        "platform": candidate["platform"],
        "segments_improved_rate": evaluation["segments_improved_rate"],
        "estimated_batch_cost_usd": training["estimated_batch_cost_usd"],
        "failure_count": len(failures),
        "failures": failures,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("evaluate")
    parser.add_argument("--candidate", required=True)
    args = parser.parse_args()
    result = evaluate_run(load_json(args.candidate))
    print(json.dumps(result, indent=2))
    raise SystemExit(0 if result["status"] == "approved" else 1)


if __name__ == "__main__":
    main()
