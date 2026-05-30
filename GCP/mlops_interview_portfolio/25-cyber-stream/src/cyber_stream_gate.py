import argparse
import json
from pathlib import Path


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_release(release):
    failures = []
    dsa = release["dsa_layer"]
    streaming = release["streaming"]
    mlops = release["mlops"]
    deployment = release["deployment"]

    for key in ["aho_corasick_enabled", "ring_buffers_enabled", "sliding_window_bitsets_enabled"]:
        if not dsa.get(key):
            failures.append(f"DSA layer missing {key}")
    if dsa["signature_count"] < dsa["min_signature_count"]:
        failures.append("signature corpus below policy")
    if dsa["p95_pattern_match_latency_ms"] > dsa["max_p95_pattern_match_latency_ms"]:
        failures.append("pattern match latency exceeds policy")

    for key in ["multi_region_pubsub", "dataflow_autoscaling"]:
        if not streaming.get(key):
            failures.append(f"streaming missing {key}")
    if streaming["events_per_second"] < streaming["min_events_per_second"]:
        failures.append("event throughput below target")
    if streaming["processing_lag_ms"] > streaming["max_processing_lag_ms"]:
        failures.append("processing lag exceeds policy")

    for key in ["bigquery_drift_checks", "eventarc_trigger_enabled", "cloud_run_retraining_trigger", "vertex_ai_custom_training", "vpc_peering_enabled"]:
        if not mlops.get(key):
            failures.append(f"MLOps missing {key}")

    for key in ["cloud_deploy_enabled", "shadow_deployment_enabled", "cloud_monitoring_comparison_enabled", "zero_downtime_promotion"]:
        if not deployment.get(key):
            failures.append(f"deployment missing {key}")
    if deployment["candidate_false_positive_delta"] > deployment["max_false_positive_delta"]:
        failures.append("candidate false-positive delta exceeds policy")

    return {
        "status": "approved" if not failures else "blocked",
        "platform": release["platform"],
        "events_per_second": streaming["events_per_second"],
        "signature_count": dsa["signature_count"],
        "p95_pattern_match_latency_ms": dsa["p95_pattern_match_latency_ms"],
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
