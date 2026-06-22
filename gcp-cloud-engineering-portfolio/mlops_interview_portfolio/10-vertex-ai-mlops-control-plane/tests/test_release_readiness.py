import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "release_readiness.py"
SPEC = importlib.util.spec_from_file_location("release_readiness", MODULE_PATH)
release_readiness = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(release_readiness)
evaluate_release = release_readiness.evaluate_release
load_json = release_readiness.load_json


EXAMPLES = Path(__file__).resolve().parents[1] / "examples"


def test_evaluate_release_approves_complete_mlops_candidate():
    candidate = load_json(EXAMPLES / "ml_release_candidate.json")

    result = evaluate_release(candidate)

    assert result["status"] == "approved"
    assert result["failure_count"] == 0
    assert result["failures"] == []


def test_evaluate_release_blocks_incomplete_mlops_candidate():
    candidate = load_json(EXAMPLES / "failed_release_candidate.json")

    result = evaluate_release(candidate)

    assert result["status"] == "blocked"
    assert result["failure_count"] >= 20
    assert "training pipeline must use vertex-ai-pipelines" in result["failures"]
    assert "registry state must be approved" in result["failures"]
