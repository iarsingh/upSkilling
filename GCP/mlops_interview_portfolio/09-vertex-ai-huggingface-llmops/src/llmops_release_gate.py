import argparse
import json
from pathlib import Path


REQUIRED_MODEL_CARD_FIELDS = {
    "model_id",
    "source",
    "task",
    "license",
    "owner",
    "intended_use",
}


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_release(model_card, eval_report, deployment_config):
    failures = []

    missing_fields = REQUIRED_MODEL_CARD_FIELDS - set(model_card)
    if missing_fields:
        failures.append(f"model card missing fields: {sorted(missing_fields)}")

    if model_card.get("source") != "huggingface":
        failures.append("model source must be huggingface")
    if not model_card.get("approved_for_production", False):
        failures.append("model is not approved for production")

    metrics = eval_report["metrics"]
    thresholds = eval_report["thresholds"]
    metric_checks = [
        ("accuracy", ">=", "min_accuracy"),
        ("f1", ">=", "min_f1"),
        ("toxicity_rate", "<=", "max_toxicity_rate"),
        ("hallucination_rate", "<=", "max_hallucination_rate"),
        ("pii_leak_rate", "<=", "max_pii_leak_rate"),
        ("p95_latency_ms", "<=", "max_p95_latency_ms"),
        (
            "estimated_cost_per_1k_predictions_usd",
            "<=",
            "max_cost_per_1k_predictions_usd",
        ),
    ]

    for metric_name, operator, threshold_name in metric_checks:
        value = metrics[metric_name]
        threshold = thresholds[threshold_name]
        if operator == ">=" and value < threshold:
            failures.append(f"{metric_name} below threshold: {value} < {threshold}")
        if operator == "<=" and value > threshold:
            failures.append(f"{metric_name} above threshold: {value} > {threshold}")

    if deployment_config.get("target") != "vertex-ai-endpoint":
        failures.append("deployment target must be vertex-ai-endpoint")
    if deployment_config.get("traffic_split_percent", 0) > 25:
        failures.append("initial traffic split must be 25 percent or lower")
    if not deployment_config.get("prediction_logging", {}).get("enabled", False):
        failures.append("prediction logging must be enabled")
    if not deployment_config.get("monitoring", {}).get("enabled", False):
        failures.append("monitoring must be enabled")
    if not deployment_config.get("rollback", {}).get("enabled", False):
        failures.append("rollback must be enabled")

    return {
        "status": "approved" if not failures else "blocked",
        "model": model_card.get("model_id"),
        "target": deployment_config.get("target"),
        "evaluation_set": eval_report.get("evaluation_set"),
        "traffic_split_percent": deployment_config.get("traffic_split_percent"),
        "failures": failures,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("evaluate")
    parser.add_argument("--model-card", required=True)
    parser.add_argument("--eval-report", required=True)
    parser.add_argument("--deployment-config", required=True)
    args = parser.parse_args()

    result = evaluate_release(
        load_json(args.model_card),
        load_json(args.eval_report),
        load_json(args.deployment_config),
    )
    print(json.dumps(result, indent=2))
    raise SystemExit(0 if result["status"] == "approved" else 1)


if __name__ == "__main__":
    main()
