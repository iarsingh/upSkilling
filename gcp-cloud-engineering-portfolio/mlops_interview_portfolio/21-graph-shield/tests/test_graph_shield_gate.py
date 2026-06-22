import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "graph_shield_gate.py"
SPEC = importlib.util.spec_from_file_location("graph_shield_gate", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
evaluate_release = module.evaluate_release
load_json = module.load_json


def test_graph_shield_approves_valid_graph_platform():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "graph_release.json")

    result = evaluate_release(release)

    assert result["status"] == "approved"
    assert result["p95_sampling_latency_ms"] <= 30


def test_graph_shield_blocks_slow_unbounded_sampler():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "graph_release.json")
    release["dsa_layer"]["bfs_depth"] = 5
    release["dsa_layer"]["p95_sampling_latency_ms"] = 50
    release["mlops"]["vertex_ai_metadata_enabled"] = False

    result = evaluate_release(release)

    assert result["status"] == "blocked"
    assert result["failure_count"] == 3
