import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "aiops_gitops.py"
SPEC = importlib.util.spec_from_file_location("aiops_gitops", MODULE_PATH)
aiops_gitops = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(aiops_gitops)
evaluate_gitops_proposal = aiops_gitops.evaluate_gitops_proposal
load_json = aiops_gitops.load_json


EXAMPLES = Path(__file__).resolve().parents[1] / "examples"


def test_evaluate_gitops_proposal_marks_safe_change_pr_ready():
    alert = load_json(EXAMPLES / "alert_payload.json")
    runbooks = load_json(EXAMPLES / "runbook_catalog.json")

    result = evaluate_gitops_proposal(alert, runbooks)

    assert result["status"] == "gitops_pr_ready"
    assert result["runbook_id"] == "rb-high-latency-hpa"
    assert result["requires_human_approval"] is True
    assert result["failures"] == []


def test_evaluate_gitops_proposal_blocks_unsafe_change():
    alert = load_json(EXAMPLES / "unsafe_alert_payload.json")
    runbooks = load_json(EXAMPLES / "runbook_catalog.json")

    result = evaluate_gitops_proposal(alert, runbooks)

    assert result["status"] == "human_review_required"
    assert "no matching runbook found" in result["failures"]
    assert "production change requires rollback instructions" in result["failures"]
    assert "remediation must be expressed as a GitOps change" in result["failures"]
