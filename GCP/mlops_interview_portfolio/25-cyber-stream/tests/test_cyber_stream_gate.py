import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "cyber_stream_gate.py"
SPEC = importlib.util.spec_from_file_location("cyber_stream_gate", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
evaluate_release = module.evaluate_release
load_json = module.load_json


def test_cyber_stream_approves_valid_release():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "threat_release.json")
    result = evaluate_release(release)
    assert result["status"] == "approved"


def test_cyber_stream_blocks_unsafe_release():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "threat_release.json")
    release["dsa_layer"]["aho_corasick_enabled"] = False
    release["streaming"]["events_per_second"] = 100
    release["deployment"]["shadow_deployment_enabled"] = False
    result = evaluate_release(release)
    assert result["status"] == "blocked"
    assert result["failure_count"] == 3
