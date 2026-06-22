from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def test_cloudbuild_has_core_stages():
    content = (ROOT / "cloudbuild.yaml").read_text(encoding="utf-8")

    assert "unit-tests" in content
    assert "build-image" in content
    assert "deploy-to-gke" in content
    assert "smoke-test" in content


def test_kustomize_overlays_exist():
    assert (ROOT / "k8s" / "overlays" / "dev" / "kustomization.yaml").exists()
    assert (ROOT / "k8s" / "overlays" / "prod" / "kustomization.yaml").exists()
