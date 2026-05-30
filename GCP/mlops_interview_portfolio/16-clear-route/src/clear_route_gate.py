import argparse
import json
from pathlib import Path


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_release(release):
    failures = []
    tenancy = release["tenancy"]
    gke = release["gke_enterprise"]
    iac = release["iac_gitops"]
    mlops = release["mlops"]
    ci_cd = release["ci_cd"]
    security = release["security"]
    deployment = release["deployment"]

    for key in [
        "namespace_per_team",
        "dedicated_service_accounts",
        "tenant_network_policies_enabled",
        "tenant_storage_isolated",
    ]:
        if not tenancy.get(key):
            failures.append(f"tenancy missing {key}")

    if gke.get("architecture") != "hub-and-spoke":
        failures.append("GKE Enterprise architecture must be hub-and-spoke")
    for key in ["anthos_enabled", "config_sync_enabled", "policy_controller_enabled"]:
        if not gke.get(key):
            failures.append(f"GKE Enterprise missing {key}")

    for key in ["terraform_managed", "config_connector_enabled", "argocd_enabled"]:
        if not iac.get(key):
            failures.append(f"IaC/GitOps missing {key}")
    if iac.get("manual_console_changes_allowed"):
        failures.append("manual console changes must be disabled")
    for resource in ["cloudsql", "iam", "gcs"]:
        if resource not in iac.get("gcp_resources_as_crds", []):
            failures.append(f"Config Connector missing {resource} CRD management")

    for key in [
        "kubeflow_on_gke",
        "vertex_ai_training_enabled",
        "bigquery_source_enabled",
        "vertex_metadata_enabled",
        "model_registry_enabled",
    ]:
        if not mlops.get(key):
            failures.append(f"MLOps missing {key}")

    if ci_cd.get("system") != "cloud-build":
        failures.append("CI/CD system must be Cloud Build")
    for key in [
        "lint_enabled",
        "unit_tests_enabled",
        "immutable_images",
        "artifact_analysis_scan_enabled",
        "artifact_registry_enabled",
    ]:
        if not ci_cd.get(key):
            failures.append(f"CI/CD missing {key}")

    for key in [
        "hipaa_aligned_controls",
        "vpc_peering_enabled",
        "private_google_access",
        "custom_iam_roles",
        "kms_encryption",
        "audit_logs_enabled",
    ]:
        if not security.get(key):
            failures.append(f"security missing {key}")

    for key in [
        "autoscaling_gke_serving",
        "network_security_policies",
        "canary_enabled",
        "rollback_enabled",
    ]:
        if not deployment.get(key):
            failures.append(f"deployment missing {key}")

    return {
        "status": "approved" if not failures else "blocked",
        "platform": release["platform"],
        "teams": tenancy["teams"],
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
