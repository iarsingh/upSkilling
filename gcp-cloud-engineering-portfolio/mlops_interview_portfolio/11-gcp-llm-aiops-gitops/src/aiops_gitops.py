import argparse
import json
from pathlib import Path


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def find_runbook(alert, runbook_catalog):
    for runbook in runbook_catalog.get("runbooks", []):
        if runbook["service"] != alert["service"]:
            continue
        if alert["symptom"] not in runbook["symptoms"]:
            continue
        return runbook
    return None


def summarize_incident(alert):
    return (
        f"{alert['service']} has {alert['symptom']} in {alert['environment']}: "
        f"{alert['metric']}={alert['current_value']} exceeded {alert['threshold']} "
        f"for {alert['duration_minutes']} minutes."
    )


def evaluate_gitops_proposal(alert, runbook_catalog):
    failures = []
    runbook = find_runbook(alert, runbook_catalog)
    proposed_change = alert["proposed_change"]

    if runbook is None:
        failures.append("no matching runbook found")
    else:
        if alert["severity"] not in runbook["allowed_severities"]:
            failures.append("severity is not allowed for assisted remediation")
        if proposed_change["action"] not in runbook["supported_actions"]:
            failures.append("proposed action is not supported by runbook")
        if runbook["max_services_per_change"] != 1:
            failures.append("runbook blast radius must be limited to one service")
        if not any(
            proposed_change["manifest_path"].startswith(prefix)
            for prefix in runbook["allowed_manifest_prefixes"]
        ):
            failures.append("manifest path is outside allowed GitOps directories")

    if alert["environment"] == "production" and not proposed_change.get("rollback"):
        failures.append("production change requires rollback instructions")
    if not proposed_change["manifest_path"].startswith("gitops/"):
        failures.append("remediation must be expressed as a GitOps change")
    if proposed_change["current_value"] == proposed_change["proposed_value"]:
        failures.append("proposal does not change the current state")

    return {
        "status": "gitops_pr_ready" if not failures else "human_review_required",
        "incident_id": alert["incident_id"],
        "service": alert["service"],
        "severity": alert["severity"],
        "summary": summarize_incident(alert),
        "runbook_id": runbook["id"] if runbook else None,
        "owner": runbook["owner"] if runbook else None,
        "recommended_action": proposed_change["action"],
        "manifest_path": proposed_change["manifest_path"],
        "requires_human_approval": True,
        "pull_request_title": (
            f"[AIOps] {alert['service']} {proposed_change['action']} "
            f"for {alert['incident_id']}"
        ),
        "failures": failures,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("propose")
    parser.add_argument("--alert", required=True)
    parser.add_argument("--runbooks", required=True)
    args = parser.parse_args()

    result = evaluate_gitops_proposal(load_json(args.alert), load_json(args.runbooks))
    print(json.dumps(result, indent=2))
    raise SystemExit(0 if result["status"] == "gitops_pr_ready" else 1)


if __name__ == "__main__":
    main()
