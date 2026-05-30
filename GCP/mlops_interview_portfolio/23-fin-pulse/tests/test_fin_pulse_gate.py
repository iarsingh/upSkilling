import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "fin_pulse_gate.py"
SPEC = importlib.util.spec_from_file_location("fin_pulse_gate", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
evaluate_release = module.evaluate_release
load_json = module.load_json


def test_fin_pulse_approves_cost_optimized_release():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "gpu_release.json")
    result = evaluate_release(release)
    assert result["status"] == "approved"


def test_fin_pulse_blocks_uncontrolled_gpu_platform():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "gpu_release.json")
    release["dsa_layer"]["dp_gpu_bin_packing_enabled"] = False
    release["devops"]["kueue_enabled"] = False
    release["devsecops_aiops"]["fallback_model_routing_enabled"] = False
    result = evaluate_release(release)
    assert result["status"] == "blocked"
    assert result["failure_count"] == 3
