import argparse
import json
from pathlib import Path


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_release(release):
    failures = []
    ingestion = release["ingestion"]
    streaming = release["stream_processing"]
    features = release["features"]
    retraining = release["retraining"]
    security = release["security"]
    deployment = release["deployment"]

    if not ingestion.get("pubsub_multi_region"):
        failures.append("multi-region Pub/Sub ingestion is required")
    if len(ingestion.get("regions", [])) < 2:
        failures.append("at least two ingestion regions are required")
    if ingestion["gb_per_second"] < ingestion["min_gb_per_second"]:
        failures.append("telemetry throughput below fleet target")

    if streaming.get("runner") != "apache-beam-dataflow":
        failures.append("stream processing must use Apache Beam on Dataflow")
    if streaming.get("windowing") != "tumbling":
        failures.append("stream processing must use tumbling windows")
    if not streaming.get("feature_validation_enabled"):
        failures.append("streaming feature validation is required")
    if streaming["processing_lag_ms"] > streaming["max_processing_lag_ms"]:
        failures.append("stream processing lag exceeds policy")

    if features.get("store") != "vertex-ai-feature-store":
        failures.append("features must use Vertex AI Feature Store")
    if features.get("online_backend") != "cloud-bigtable":
        failures.append("online feature backend must be Cloud Bigtable")
    if features.get("offline_store") != "bigquery":
        failures.append("offline store must be BigQuery")
    if features["online_lookup_latency_ms"] > features["max_online_lookup_latency_ms"]:
        failures.append("online feature lookup latency exceeds sub-10ms target")
    if not features.get("online_offline_parity"):
        failures.append("online/offline feature parity is required")

    for key in [
        "drift_daemon_enabled",
        "feature_skew_detection_enabled",
        "cloud_workflows_trigger_enabled",
        "vertex_ai_pipelines_enabled",
    ]:
        if not retraining.get(key):
            failures.append(f"retraining missing {key}")
    if not {"xgboost", "tensorflow"}.intersection(retraining.get("training_containers", [])):
        failures.append("XGBoost or TensorFlow training container required")

    for key in [
        "terraform_managed",
        "vpc_service_controls_enabled",
        "private_training_enabled",
        "least_privilege_iam",
    ]:
        if not security.get(key):
            failures.append(f"security missing {key}")

    if deployment.get("target") != "vertex-ai-endpoints":
        failures.append("deployment target must be Vertex AI Endpoints")
    for key in ["cloud_deploy_enabled", "blue_green_enabled", "fallback_routing_enabled"]:
        if not deployment.get(key):
            failures.append(f"deployment missing {key}")
    if deployment["p95_prediction_latency_ms"] > deployment["max_p95_prediction_latency_ms"]:
        failures.append("prediction p95 latency exceeds SLO")

    return {
        "status": "approved" if not failures else "blocked",
        "platform": release["platform"],
        "gb_per_second": ingestion["gb_per_second"],
        "online_lookup_latency_ms": features["online_lookup_latency_ms"],
        "p95_prediction_latency_ms": deployment["p95_prediction_latency_ms"],
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
