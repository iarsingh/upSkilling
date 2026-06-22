import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "omni_agent_gate.py"
SPEC = importlib.util.spec_from_file_location("omni_agent_gate", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
evaluate_release = module.evaluate_release
load_json = module.load_json


def test_omni_agent_approves_secure_agent_platform():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "agent_platform_release.json")

    result = evaluate_release(release)

    assert result["status"] == "approved"
    assert "validator" in result["agents"]


def test_omni_agent_blocks_unsafe_agent_runtime():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "agent_platform_release.json")
    release["security"]["public_internet_agent_to_agent_allowed"] = True
    release["aiops"]["runaway_loop_termination_enabled"] = False
    release["agent_runtime"]["agents"] = ["analyst", "execution"]

    result = evaluate_release(release)

    assert result["status"] == "blocked"
    assert result["failure_count"] == 3
