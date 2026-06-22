import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "nexus_fraud_gate.py"
SPEC = importlib.util.spec_from_file_location("nexus_fraud_gate", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
evaluate_release = module.evaluate_release
load_json = module.load_json


def test_nexus_fraud_approves_valid_release():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "fraud_release.json")

    result = evaluate_release(release)

    assert result["status"] == "approved"
    assert result["online_latency_ms"] == 18


def test_nexus_fraud_blocks_unsafe_financial_release():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "fraud_release.json")
    release["deployment"]["shadow_enabled"] = False
    release["governance"]["regulatory_review"] = "pending"
    release["features"]["online_latency_ms"] = 80

    result = evaluate_release(release)

    assert result["status"] == "blocked"
    assert result["failure_count"] == 3
