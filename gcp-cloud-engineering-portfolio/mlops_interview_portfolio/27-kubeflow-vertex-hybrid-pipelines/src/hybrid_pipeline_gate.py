import argparse
import json
from pathlib import Path


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_release(release):
    failures = []
    authoring = release["pipeline_authoring"]
    backends = release["execution_backends"]
    governance = release["governance"]
    delivery = release["delivery"]
    quality = release["quality"]

    for key in [
        "kfp_v2_sdk_enabled",
        "component_contract_tests_enabled",
        "pipeline_yaml_compiled",
        "google_cloud_pipeline_components_enabled",
        "containerized_components",
    ]:
        if not authoring.get(key):
            failures.append(f"pipeline authoring missing {key}")

    for key in [
        "kubeflow_on_gke_enabled",
        "vertex_ai_pipelines_enabled",
        "tenant_namespace_execution",
        "managed_production_execution",
        "backend_parity_tests_enabled",
    ]:
        if not backends.get(key):
            failures.append(f"execution backend missing {key}")

    for key in [
        "vertex_ai_metadata_enabled",
        "model_registry_enabled",
        "bigquery_evidence_tables",
        "dataset_lineage_enabled",
        "prompt_variant_lineage_enabled",
        "approval_gate_enabled",
    ]:
        if not governance.get(key):
            failures.append(f"governance missing {key}")

    for key in [
        "cloud_build_enabled",
        "artifact_registry_enabled",
        "artifact_analysis_enabled",
        "cloud_deploy_enabled",
        "canary_enabled",
        "shadow_enabled",
        "rollback_enabled",
    ]:
        if not delivery.get(key):
            failures.append(f"delivery missing {key}")

    if quality["model_quality_score"] < quality["min_model_quality_score"]:
        failures.append("model quality score below release threshold")
    if quality["training_serving_skew"] > quality["max_training_serving_skew"]:
        failures.append("training-serving skew exceeds policy")
    if quality["canary_error_rate"] > quality["max_canary_error_rate"]:
        failures.append("canary error rate exceeds SLO")
    if quality["p95_latency_ms"] > quality["max_p95_latency_ms"]:
        failures.append("p95 latency exceeds SLO")

    return {
        "status": "approved" if not failures else "blocked",
        "platform": release["platform"],
        "backends": ["kubeflow-on-gke", "vertex-ai-pipelines"],
        "model_quality_score": quality["model_quality_score"],
        "training_serving_skew": quality["training_serving_skew"],
        "p95_latency_ms": quality["p95_latency_ms"],
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
