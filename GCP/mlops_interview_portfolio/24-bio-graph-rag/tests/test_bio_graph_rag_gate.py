import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "bio_graph_rag_gate.py"
SPEC = importlib.util.spec_from_file_location("bio_graph_rag_gate", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
evaluate_release = module.evaluate_release
load_json = module.load_json


def test_biograph_rag_approves_valid_release():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "biograph_release.json")
    result = evaluate_release(release)
    assert result["status"] == "approved"


def test_biograph_rag_blocks_unsafe_retrieval():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "biograph_release.json")
    release["dsa_layer"]["p95_graph_search_latency_ms"] = 50
    release["dsa_layer"]["lsh_enabled"] = False
    release["quality"]["hallucination_rate"] = 0.08
    result = evaluate_release(release)
    assert result["status"] == "blocked"
    assert result["failure_count"] == 3
