import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "lexi_stream_gate.py"
SPEC = importlib.util.spec_from_file_location("lexi_stream_gate", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
evaluate_release = module.evaluate_release
load_json = module.load_json


def test_lexi_stream_approves_valid_gateway():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "gateway_release.json")

    result = evaluate_release(release)

    assert result["status"] == "approved"
    assert result["p95_match_latency_ms"] < 5


def test_lexi_stream_blocks_slow_unsafe_gateway():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "gateway_release.json")
    release["dsa_layer"]["p95_match_latency_ms"] = 12
    release["devsecops"]["waf_enabled"] = False
    release["aiops_observability"]["cache_hit_rate"] = 0.4

    result = evaluate_release(release)

    assert result["status"] == "blocked"
    assert result["failure_count"] == 3
