import argparse
import json
from pathlib import Path


REQUIRED_MONITORING_SIGNALS = {
    "drift",
    "skew",
    "data_quality",
    "latency",
    "error_rate",
}

REQUIRED_RETRAINING_TRIGGERS = {
    "drift",
    "performance_decay",
}


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def require_value(section, key, failures, label):
    if not section.get(key):
        failures.append(f"{label} missing {key}")


def evaluate_release(candidate):
    failures = []

    dataset = candidate["dataset_contract"]
    require_value(dataset, "owner", failures, "dataset_contract")
    require_value(dataset, "schema_version", failures, "dataset_contract")
    if dataset["freshness_hours"] > dataset["max_freshness_hours"]:
        failures.append("dataset freshness exceeds SLA")
    if dataset["validated_features"] < dataset["required_features"]:
        failures.append("not all required features were validated")

    training = candidate["training_pipeline"]
    if training.get("orchestrator") != "vertex-ai-pipelines":
        failures.append("training pipeline must use vertex-ai-pipelines")
    if not training.get("reproducible"):
        failures.append("training pipeline is not reproducible")
    require_value(training, "pipeline_spec_version", failures, "training_pipeline")
    require_value(training, "container_image", failures, "training_pipeline")
    if training.get("random_seed") is None:
        failures.append("training pipeline missing random_seed")

    lineage = candidate["lineage"]
    for key in ["experiment_id", "training_data_snapshot", "feature_contract", "model_artifact"]:
        require_value(lineage, key, failures, "lineage")

    metrics = candidate["evaluation"]["metrics"]
    thresholds = candidate["evaluation"]["thresholds"]
    minimum_checks = [
        ("auc", "min_auc"),
        ("f1", "min_f1"),
        ("precision", "min_precision"),
        ("recall", "min_recall"),
    ]
    maximum_checks = [
        ("calibration_error", "max_calibration_error"),
        ("fairness_gap", "max_fairness_gap"),
    ]
    for metric, threshold in minimum_checks:
        if metrics[metric] < thresholds[threshold]:
            failures.append(f"{metric} below threshold")
    for metric, threshold in maximum_checks:
        if metrics[metric] > thresholds[threshold]:
            failures.append(f"{metric} above threshold")

    registry = candidate["registry"]
    if registry.get("state") != "approved":
        failures.append("registry state must be approved")
    require_value(registry, "approved_by", failures, "registry")
    if registry.get("risk_review") != "completed":
        failures.append("risk review must be completed")
    require_value(registry, "previous_production_version", failures, "registry")

    deployment = candidate["deployment"]
    if deployment.get("strategy") != "canary":
        failures.append("deployment strategy must be canary")
    if deployment["initial_traffic_percent"] > deployment["max_initial_traffic_percent"]:
        failures.append("initial canary traffic exceeds policy")
    if not deployment.get("rollback_enabled"):
        failures.append("rollback must be enabled")
    require_value(deployment, "endpoint", failures, "deployment")

    monitoring = candidate["monitoring"]
    if not monitoring.get("prediction_logging_enabled"):
        failures.append("prediction logging must be enabled")
    missing_signals = REQUIRED_MONITORING_SIGNALS - set(monitoring.get("signals", []))
    if missing_signals:
        failures.append(f"monitoring missing signals: {sorted(missing_signals)}")
    require_value(monitoring, "alert_topic", failures, "monitoring")

    retraining = candidate["retraining"]
    if not retraining.get("enabled"):
        failures.append("retraining policy must be enabled")
    missing_triggers = REQUIRED_RETRAINING_TRIGGERS - set(retraining.get("triggers", []))
    if missing_triggers:
        failures.append(f"retraining missing triggers: {sorted(missing_triggers)}")
    if retraining.get("max_days_between_training", 0) <= 0:
        failures.append("retraining max_days_between_training must be positive")

    governance = candidate["governance"]
    for key in ["release_owner", "business_owner", "approval_ticket", "audit_log_uri"]:
        require_value(governance, key, failures, "governance")

    return {
        "status": "approved" if not failures else "blocked",
        "model_name": candidate["model_name"],
        "version": candidate["version"],
        "target_environment": candidate["target_environment"],
        "failure_count": len(failures),
        "failures": failures,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("evaluate")
    parser.add_argument("--candidate", required=True)
    args = parser.parse_args()

    result = evaluate_release(load_json(args.candidate))
    print(json.dumps(result, indent=2))
    raise SystemExit(0 if result["status"] == "approved" else 1)


if __name__ == "__main__":
    main()
