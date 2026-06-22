import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "kubeflow_gke_gate.py"
SPEC = importlib.util.spec_from_file_location("kubeflow_gke_gate", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
evaluate_release = module.evaluate_release
load_json = module.load_json


def test_kubeflow_gke_approves_hardened_platform_release():
    release = load_json(
        Path(__file__).resolve().parents[1]
        / "examples"
        / "kubeflow_platform_release.json"
    )

    result = evaluate_release(release)

    assert result["status"] == "approved"
    assert "pipelines_v2_enabled" in result["kubeflow_components"]


def test_kubeflow_gke_blocks_unsafe_tenant_platform():
    release = load_json(
        Path(__file__).resolve().parents[1]
        / "examples"
        / "kubeflow_platform_release.json"
    )
    release["security"]["public_notebooks_allowed"] = True
    release["kubeflow"]["kserve_enabled"] = False
    release["slo"]["pipeline_failure_rate"] = 0.05

    result = evaluate_release(release)

    assert result["status"] == "blocked"
    assert result["failure_count"] == 3
