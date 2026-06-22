import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "shield_llm_gate.py"
SPEC = importlib.util.spec_from_file_location("shield_llm_gate", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
evaluate_policy = module.evaluate_policy
load_json = module.load_json


def test_shield_llm_approves_valid_gateway_policy():
    policy = load_json(Path(__file__).resolve().parents[1] / "examples" / "gateway_policy.json")

    result = evaluate_policy(policy)

    assert result["status"] == "approved"
    assert result["guardrail_layers"] == 9


def test_shield_llm_blocks_missing_governance_controls():
    policy = load_json(Path(__file__).resolve().parents[1] / "examples" / "gateway_policy.json")
    policy["guardrails"]["layers"] = policy["guardrails"]["layers"][:5]
    policy["evaluation"]["groundedness"] = 0.7
    policy["telemetry"]["vertex_metadata_enabled"] = False

    result = evaluate_policy(policy)

    assert result["status"] == "blocked"
    assert result["failure_count"] == 3
