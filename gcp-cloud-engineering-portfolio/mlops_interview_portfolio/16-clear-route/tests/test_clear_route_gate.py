import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "clear_route_gate.py"
SPEC = importlib.util.spec_from_file_location("clear_route_gate", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
evaluate_release = module.evaluate_release
load_json = module.load_json


def test_clear_route_approves_secure_gitops_platform():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "platform_release.json")

    result = evaluate_release(release)

    assert result["status"] == "approved"
    assert result["failure_count"] == 0


def test_clear_route_blocks_insecure_multi_tenant_platform():
    release = load_json(Path(__file__).resolve().parents[1] / "examples" / "platform_release.json")
    release["iac_gitops"]["manual_console_changes_allowed"] = True
    release["security"]["kms_encryption"] = False
    release["ci_cd"]["artifact_analysis_scan_enabled"] = False

    result = evaluate_release(release)

    assert result["status"] == "blocked"
    assert result["failure_count"] == 3
