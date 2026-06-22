import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "vision_edge_gate.py"
SPEC = importlib.util.spec_from_file_location("vision_edge_gate", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
evaluate_release = module.evaluate_release
load_json = module.load_json


def test_vision_edge_approves_valid_release():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "edge_release.json")

    result = evaluate_release(release)

    assert result["status"] == "approved"
    assert result["p95_inference_latency_ms"] < 10


def test_vision_edge_blocks_slow_unoptimized_release():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "edge_release.json")
    release["optimization"]["steps"] = ["tensorrt"]
    release["edge_deployment"]["p95_inference_latency_ms"] = 14
    release["telemetry"]["selective_data_collection_enabled"] = False

    result = evaluate_release(release)

    assert result["status"] == "blocked"
    assert result["failure_count"] == 3
