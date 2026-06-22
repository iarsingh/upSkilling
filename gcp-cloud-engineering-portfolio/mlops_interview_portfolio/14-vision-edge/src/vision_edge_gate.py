import argparse
import json
from pathlib import Path


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_release(release):
    failures = []
    training = release["training"]
    optimization = release["optimization"]
    deployment = release["edge_deployment"]
    telemetry = release["telemetry"]

    if training.get("service") != "vertex-ai-custom-training":
        failures.append("training must use Vertex AI Custom Training")
    if not training.get("accelerator"):
        failures.append("GPU accelerator must be specified")
    if training["validation_auc"] < training["min_validation_auc"]:
        failures.append("validation AUC below edge release threshold")
    if "tensorrt" not in optimization.get("steps", []):
        failures.append("TensorRT optimization missing")
    if "edge-tpu-compile" not in optimization.get("steps", []):
        failures.append("Edge TPU compilation missing")
    if optimization["size_reduction_rate"] < optimization["min_size_reduction_rate"]:
        failures.append("model size reduction below policy")
    if deployment.get("control_plane") != "gke-enterprise":
        failures.append("edge control plane must be GKE Enterprise")
    if deployment.get("transport") != "mqtt-pubsub-bridge":
        failures.append("edge transport must use MQTT/Pub/Sub bridge")
    if not deployment.get("zero_downtime_enabled"):
        failures.append("zero-downtime deployment is required")
    if deployment["canary_factory_count"] > deployment["max_canary_factory_count"]:
        failures.append("edge canary factory count exceeds policy")
    if deployment["p95_inference_latency_ms"] > deployment["max_p95_inference_latency_ms"]:
        failures.append("edge p95 inference latency exceeds 10ms target")
    for key in [
        "uncertainty_stream_enabled",
        "drift_metrics_enabled",
        "selective_data_collection_enabled",
        "cloud_retraining_trigger_enabled",
    ]:
        if not telemetry.get(key):
            failures.append(f"telemetry missing {key}")

    return {
        "status": "approved" if not failures else "blocked",
        "platform": release["platform"],
        "p95_inference_latency_ms": deployment["p95_inference_latency_ms"],
        "validation_auc": training["validation_auc"],
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
