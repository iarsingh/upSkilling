import argparse
import json
from pathlib import Path


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_release(release):
    failures = []
    dsa = release["dsa_layer"]
    devops = release["devops"]
    llmops = release["llmops"]
    controls = release["devsecops_aiops"]

    for key in ["dp_gpu_bin_packing_enabled", "token_bucket_enabled", "leaky_bucket_enabled"]:
        if not dsa.get(key):
            failures.append(f"DSA layer missing {key}")
    if len(dsa.get("gpu_types", [])) < 2:
        failures.append("multiple GPU families are required for optimization")
    if dsa["target_vram_utilization"] < dsa["min_vram_utilization"]:
        failures.append("VRAM utilization below policy")
    if dsa["quota_overrun_rate"] > dsa["max_quota_overrun_rate"]:
        failures.append("token quota overrun rate exceeds policy")

    for key in ["gke_enterprise_enabled", "argocd_enabled", "kueue_enabled", "spot_gpu_nodes_enabled", "terraform_managed"]:
        if not devops.get(key):
            failures.append(f"DevOps missing {key}")

    for key in ["gateway_intercepts_traffic", "vllm_enabled", "vertex_ai_gemini_enabled", "pubsub_telemetry_enabled", "bigquery_cost_ledger_enabled"]:
        if not llmops.get(key):
            failures.append(f"LLMOps missing {key}")

    for key in ["vpc_service_controls_enabled", "prometheus_metrics_enabled", "cloud_monitoring_enabled", "fallback_model_routing_enabled"]:
        if not controls.get(key):
            failures.append(f"DevSecOps/AIOps missing {key}")
    if controls["cost_threshold_violation_rate"] > controls["max_cost_threshold_violation_rate"]:
        failures.append("cost threshold violation rate exceeds policy")

    return {
        "status": "approved" if not failures else "blocked",
        "platform": release["platform"],
        "gpu_types": dsa["gpu_types"],
        "target_vram_utilization": dsa["target_vram_utilization"],
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
