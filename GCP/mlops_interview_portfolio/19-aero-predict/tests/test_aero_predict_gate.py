import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "aero_predict_gate.py"
SPEC = importlib.util.spec_from_file_location("aero_predict_gate", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
evaluate_release = module.evaluate_release
load_json = module.load_json


def test_aero_predict_approves_valid_fleet_release():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "fleet_release.json")

    result = evaluate_release(release)

    assert result["status"] == "approved"
    assert result["online_lookup_latency_ms"] < 10


def test_aero_predict_blocks_unsafe_streaming_release():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "fleet_release.json")
    release["features"]["online_lookup_latency_ms"] = 30
    release["deployment"]["blue_green_enabled"] = False
    release["security"]["vpc_service_controls_enabled"] = False

    result = evaluate_release(release)

    assert result["status"] == "blocked"
    assert result["failure_count"] == 3
