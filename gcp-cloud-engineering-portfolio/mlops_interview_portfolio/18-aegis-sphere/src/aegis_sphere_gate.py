import argparse
import json
from pathlib import Path


REQUIRED_TERRAFORM_MODULES = {
    "gke",
    "vpc-peering",
    "cloudsql",
    "iam",
    "artifact-registry",
    "secret-manager",
}


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_release(release):
    failures = []
    devops = release["devops_gitops"]
    devsecops = release["devsecops"]
    lifecycles = release["mlops_llmops"]
    aiops = release["aiops"]
    slos = release["runtime_slos"]

    missing_modules = REQUIRED_TERRAFORM_MODULES - set(devops.get("terraform_modules", []))
    if missing_modules:
        failures.append(f"missing Terraform modules: {sorted(missing_modules)}")
    for key in [
        "gke_enterprise_enabled",
        "multi_tenant_clusters",
        "argocd_enabled",
        "config_connector_enabled",
        "git_source_of_truth",
        "drift_reconciliation_enabled",
    ]:
        if not devops.get(key):
            failures.append(f"DevOps/GitOps missing {key}")
    if devops["sandbox_provisioning_minutes"] > devops["max_sandbox_provisioning_minutes"]:
        failures.append("sandbox provisioning exceeds 5 minute target")

    for key in [
        "cloud_build_enabled",
        "artifact_analysis_enabled",
        "cosign_signing_enabled",
        "artifact_registry_enabled",
        "vpc_service_controls_enabled",
        "external_secrets_operator_enabled",
        "secret_manager_enabled",
        "network_policies_enabled",
    ]:
        if not devsecops.get(key):
            failures.append(f"DevSecOps missing {key}")
    if devsecops["critical_vulnerabilities"] > devsecops["max_critical_vulnerabilities"]:
        failures.append("critical vulnerabilities must be zero before promotion")

    for key in [
        "vertex_ai_pipelines_enabled",
        "vertex_ai_feature_store_enabled",
        "prompts_as_code",
        "vertex_ai_vector_search_enabled",
        "gemini_enabled",
        "open_weights_on_triton_enabled",
        "vertex_ai_metadata_enabled",
        "golden_dataset_attached",
        "pipeline_hash_attached",
    ]:
        if not lifecycles.get(key):
            failures.append(f"MLOps/LLMOps missing {key}")
    if lifecycles["prompt_release_minutes"] > lifecycles["max_prompt_release_minutes"]:
        failures.append("prompt/model release cycle exceeds policy")

    for key in [
        "cloud_monitoring_enabled",
        "pubsub_event_bus_enabled",
        "cloud_run_remediation_enabled",
        "event_driven_ansible_supported",
        "latency_self_healing_enabled",
        "token_budget_self_healing_enabled",
        "hallucination_rollback_enabled",
        "fallback_model_routing_enabled",
        "policy_bound_remediation",
        "rollback_audit_enabled",
    ]:
        if not aiops.get(key):
            failures.append(f"AIOps missing {key}")

    if slos["rag_p95_latency_ms"] > slos["max_rag_p95_latency_ms"]:
        failures.append("RAG p95 latency exceeds SLO")
    if slos["hallucination_rate"] > slos["max_hallucination_rate"]:
        failures.append("hallucination rate exceeds SLO")
    if slos["token_budget_overrun_rate"] > slos["max_token_budget_overrun_rate"]:
        failures.append("token budget overrun rate exceeds SLO")

    return {
        "status": "approved" if not failures else "blocked",
        "platform": release["platform"],
        "sandbox_provisioning_minutes": devops["sandbox_provisioning_minutes"],
        "rag_p95_latency_ms": slos["rag_p95_latency_ms"],
        "hallucination_rate": slos["hallucination_rate"],
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
