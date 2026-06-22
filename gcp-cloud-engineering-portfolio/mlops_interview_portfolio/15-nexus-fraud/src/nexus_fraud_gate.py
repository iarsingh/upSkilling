import argparse
import json
from pathlib import Path


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_release(release):
    failures = []
    streaming = release["streaming"]
    features = release["features"]
    orchestration = release["orchestration"]
    ct = release["continuous_training"]
    deployment = release["deployment"]
    governance = release["governance"]

    if streaming.get("processor") != "apache-beam-dataflow":
        failures.append("streaming processor must be Apache Beam on Dataflow")
    if streaming["processing_lag_ms"] > streaming["max_processing_lag_ms"]:
        failures.append("streaming processing lag exceeds policy")
    if features.get("store") != "vertex-ai-feature-store":
        failures.append("online features must use Vertex AI Feature Store")
    if features["online_latency_ms"] > features["max_online_latency_ms"]:
        failures.append("feature store online latency exceeds SLA")
    if features["freshness_minutes"] > features["max_freshness_minutes"]:
        failures.append("feature freshness exceeds SLA")
    if orchestration.get("training") != "vertex-ai-pipelines":
        failures.append("training orchestration must use Vertex AI Pipelines")
    if orchestration.get("scheduling") != "cloud-composer":
        failures.append("batch orchestration must use Cloud Composer")
    if orchestration.get("metadata") != "vertex-ai-metadata":
        failures.append("lineage must use Vertex AI Metadata")
    if not orchestration.get("terraform_managed"):
        failures.append("infrastructure must be Terraform managed")
    if not ct.get("enabled"):
        failures.append("continuous training must be enabled")
    if not (ct.get("data_drift_detected") or ct.get("concept_drift_detected")):
        failures.append("CT loop requires data or concept drift trigger")
    if not ct.get("approval_required"):
        failures.append("CT promotion requires approval")
    if deployment.get("ci_cd") != "cloud-build":
        failures.append("deployment must use Cloud Build")
    if not deployment.get("canary_enabled"):
        failures.append("canary deployment required")
    if not deployment.get("shadow_enabled"):
        failures.append("shadow deployment required")
    if deployment["initial_canary_percent"] > deployment["max_initial_canary_percent"]:
        failures.append("initial canary percent exceeds policy")
    if not deployment.get("zero_downtime"):
        failures.append("zero-downtime deployment required")
    for key in [
        "lineage_complete",
        "audit_log_enabled",
        "model_explainability_enabled",
    ]:
        if not governance.get(key):
            failures.append(f"governance missing {key}")
    if governance.get("regulatory_review") != "approved":
        failures.append("regulatory review must be approved")

    return {
        "status": "approved" if not failures else "blocked",
        "platform": release["platform"],
        "events_per_second": streaming["events_per_second"],
        "online_latency_ms": features["online_latency_ms"],
        "failure_count": len(failures),
        "failures": failures,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("evaluate")
    parser.add_argument("--release", required=True)
    args = parser.parse_args()
    result = evaluate_release(load_json(args.release))
    print(json.dumps(result, indent=2))
    raise SystemExit(0 if result["status"] == "approved" else 1)


if __name__ == "__main__":
    main()
