import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "hybrid_pipeline_gate.py"
SPEC = importlib.util.spec_from_file_location("hybrid_pipeline_gate", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
evaluate_release = module.evaluate_release
load_json = module.load_json


def test_hybrid_pipeline_approves_portable_governed_release():
    release = load_json(
        Path(__file__).resolve().parents[1]
        / "examples"
        / "hybrid_pipeline_release.json"
    )

    result = evaluate_release(release)

    assert result["status"] == "approved"
    assert "vertex-ai-pipelines" in result["backends"]


def test_hybrid_pipeline_blocks_unvalidated_backend_and_bad_canary():
    release = load_json(
        Path(__file__).resolve().parents[1]
        / "examples"
        / "hybrid_pipeline_release.json"
    )
    release["execution_backends"]["backend_parity_tests_enabled"] = False
    release["governance"]["approval_gate_enabled"] = False
    release["quality"]["canary_error_rate"] = 0.03

    result = evaluate_release(release)

    assert result["status"] == "blocked"
    assert result["failure_count"] == 3
