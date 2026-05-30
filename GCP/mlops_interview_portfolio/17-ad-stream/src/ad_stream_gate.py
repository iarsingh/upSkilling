import argparse
import json
from pathlib import Path


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_release(release):
    failures = []
    throughput = release["throughput"]
    devops = release["devops"]
    dataflow = release["dataflow"]
    features = release["features"]
    mlops = release["mlops"]

    if throughput["requests_per_second"] < throughput["minimum_requests_per_second"]:
        failures.append("throughput below 50k RPS target")
    if throughput["p99_latency_ms"] > throughput["max_p99_latency_ms"]:
        failures.append("p99 latency exceeds SLO")
    if throughput["error_rate"] > throughput["max_error_rate"]:
        failures.append("error rate exceeds SLO")

    for key in [
        "terraform_managed",
        "cloud_deploy_enabled",
        "blue_green_dataflow",
        "pubsub_source_enabled",
        "slo_auto_rollback_enabled",
    ]:
        if not devops.get(key):
            failures.append(f"DevOps missing {key}")

    if dataflow.get("runner") != "apache-beam-dataflow":
        failures.append("streaming runner must be Apache Beam on Dataflow")
    if not dataflow.get("ephemeral_integration_tests"):
        failures.append("ephemeral Dataflow integration tests required")
    if dataflow.get("schema_validation") != "apache-beam-sdk":
        failures.append("schema validation must use Apache Beam SDK")
    if dataflow.get("active_color") == dataflow.get("candidate_color"):
        failures.append("blue/green colors must be different")

    if features.get("store") != "vertex-ai-feature-store":
        failures.append("feature store must be Vertex AI Feature Store")
    if features.get("online_backend") != "cloud-bigtable":
        failures.append("online feature backend must be Cloud Bigtable")
    if features.get("offline_store") != "bigquery":
        failures.append("offline feature store must be BigQuery")
    if not features.get("online_offline_parity"):
        failures.append("online/offline feature parity required")
    if features["freshness_seconds"] > features["max_freshness_seconds"]:
        failures.append("feature freshness exceeds SLO")

    for key in [
        "features_as_code",
        "models_as_code",
        "cloud_build_enabled",
        "model_canary_enabled",
        "monitoring_custom_slos",
    ]:
        if not mlops.get(key):
            failures.append(f"MLOps missing {key}")

    return {
        "status": "approved" if not failures else "blocked",
        "platform": release["platform"],
        "requests_per_second": throughput["requests_per_second"],
        "p99_latency_ms": throughput["p99_latency_ms"],
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
