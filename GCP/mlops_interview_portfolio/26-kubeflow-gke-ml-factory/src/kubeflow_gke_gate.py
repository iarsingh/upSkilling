import argparse
import json
from pathlib import Path


REQUIRED_KUBEFLOW_COMPONENTS = {
    "profiles_enabled",
    "notebooks_enabled",
    "pipelines_v2_enabled",
    "katib_enabled",
    "kserve_enabled",
    "central_dashboard_enabled",
}


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_release(release):
    failures = []
    gke = release["gke"]
    gitops = release["gitops"]
    kubeflow = release["kubeflow"]
    security = release["security"]
    mlops = release["mlops"]
    slo = release["slo"]

    for key in [
        "enterprise_enabled",
        "private_cluster",
        "workload_identity_enabled",
        "kueue_enabled",
        "managed_prometheus_enabled",
    ]:
        if not gke.get(key):
            failures.append(f"GKE missing {key}")
    if len(gke.get("gpu_node_pools", [])) < 1:
        failures.append("at least one GPU node pool is required")

    for key in [
        "terraform_modules_enabled",
        "argocd_or_config_sync_enabled",
        "drift_detection_enabled",
        "tenant_namespaces_from_git",
    ]:
        if not gitops.get(key):
            failures.append(f"GitOps missing {key}")

    missing_components = [
        key for key in sorted(REQUIRED_KUBEFLOW_COMPONENTS) if not kubeflow.get(key)
    ]
    for key in missing_components:
        failures.append(f"Kubeflow missing {key}")

    for key in [
        "network_policy_enabled",
        "secret_manager_external_secrets",
        "artifact_analysis_enabled",
        "image_signing_required",
        "vpc_service_controls_enabled",
    ]:
        if not security.get(key):
            failures.append(f"security missing {key}")
    if security.get("public_notebooks_allowed"):
        failures.append("public notebooks are not allowed")

    for key in [
        "artifact_registry_enabled",
        "cloud_storage_artifacts_enabled",
        "bigquery_training_sources_enabled",
        "vertex_ai_metadata_export_enabled",
        "model_canary_enabled",
        "rollback_enabled",
    ]:
        if not mlops.get(key):
            failures.append(f"MLOps missing {key}")

    if slo["pipeline_failure_rate"] > slo["max_pipeline_failure_rate"]:
        failures.append("pipeline failure rate exceeds SLO")
    if slo["p95_inference_latency_ms"] > slo["max_p95_inference_latency_ms"]:
        failures.append("inference p95 latency exceeds SLO")
    if slo["gpu_quota_utilization"] > slo["max_gpu_quota_utilization"]:
        failures.append("GPU quota utilization exceeds safety limit")

    return {
        "status": "approved" if not failures else "blocked",
        "platform": release["platform"],
        "kubeflow_components": sorted(REQUIRED_KUBEFLOW_COMPONENTS),
        "gpu_node_pools": gke.get("gpu_node_pools", []),
        "pipeline_failure_rate": slo["pipeline_failure_rate"],
        "p95_inference_latency_ms": slo["p95_inference_latency_ms"],
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
