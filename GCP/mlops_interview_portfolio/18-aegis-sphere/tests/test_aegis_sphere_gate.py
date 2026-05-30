import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "aegis_sphere_gate.py"
SPEC = importlib.util.spec_from_file_location("aegis_sphere_gate", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
evaluate_release = module.evaluate_release
load_json = module.load_json


def test_aegis_sphere_approves_complete_autonomous_platform():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "platform_release.json")

    result = evaluate_release(release)

    assert result["status"] == "approved"
    assert result["failure_count"] == 0


def test_aegis_sphere_blocks_insecure_uncontrolled_platform():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "platform_release.json")
    release["devsecops"]["cosign_signing_enabled"] = False
    release["aiops"]["policy_bound_remediation"] = False
    release["runtime_slos"]["hallucination_rate"] = 0.08

    result = evaluate_release(release)

    assert result["status"] == "blocked"
    assert result["failure_count"] == 3
