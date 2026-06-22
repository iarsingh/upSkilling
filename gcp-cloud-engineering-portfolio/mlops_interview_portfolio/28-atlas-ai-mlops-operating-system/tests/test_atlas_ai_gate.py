import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "atlas_ai_gate.py"
SPEC = importlib.util.spec_from_file_location("atlas_ai_gate", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
evaluate_release = module.evaluate_release
load_json = module.load_json


def test_atlas_ai_approves_full_portfolio_capstone():
    release = load_json(
        Path(__file__).resolve().parents[1] / "examples" / "atlas_ai_release.json"
    )

    result = evaluate_release(release)

    assert result["status"] == "approved"
    assert result["skill_domain_count"] == 9
    assert result["covered_project_count"] == 27


def test_atlas_ai_blocks_incomplete_operating_system():
    release = load_json(
        Path(__file__).resolve().parents[1] / "examples" / "atlas_ai_release.json"
    )
    release["llmops"]["model_armor"] = False
    release["security_tools"]["prisma_cloud"] = False
    release["quality"]["release_failure_rate"] = 0.04

    result = evaluate_release(release)

    assert result["status"] == "blocked"
    assert result["failure_count"] == 3
