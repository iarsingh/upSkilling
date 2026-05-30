import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "ad_stream_gate.py"
SPEC = importlib.util.spec_from_file_location("ad_stream_gate", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
evaluate_release = module.evaluate_release
load_json = module.load_json


def test_ad_stream_approves_valid_streaming_release():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "streaming_release.json")

    result = evaluate_release(release)

    assert result["status"] == "approved"
    assert result["requests_per_second"] >= 50000


def test_ad_stream_blocks_bad_pipeline_release():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "streaming_release.json")
    release["throughput"]["p99_latency_ms"] = 100
    release["devops"]["slo_auto_rollback_enabled"] = False
    release["features"]["online_offline_parity"] = False

    result = evaluate_release(release)

    assert result["status"] == "blocked"
    assert result["failure_count"] == 3
