import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "chronos_supply_gate.py"
SPEC = importlib.util.spec_from_file_location("chronos_supply_gate", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
evaluate_run = module.evaluate_run
load_json = module.load_json


def test_chronos_supply_approves_valid_batch_run():
    candidate = load_json(Path(__file__).resolve().parents[1] / "examples" / "forecast_run.json")

    result = evaluate_run(candidate)

    assert result["status"] == "approved"
    assert result["failure_count"] == 0


def test_chronos_supply_blocks_bad_segment_and_cost_run():
    candidate = load_json(Path(__file__).resolve().parents[1] / "examples" / "forecast_run.json")
    candidate["training"]["estimated_batch_cost_usd"] = 1200
    candidate["evaluation"]["segments_improved_rate"] = 0.5
    candidate["serving"]["redis_cache_enabled"] = False

    result = evaluate_run(candidate)

    assert result["status"] == "blocked"
    assert result["failure_count"] == 3
