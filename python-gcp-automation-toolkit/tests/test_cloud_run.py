from pathlib import Path

from gcp_ops_toolkit.cloud_run import deployment_plan


def test_cloud_run_plan_is_deterministic(tmp_path: Path) -> None:
    plan = deployment_plan(
        project_id="demo",
        region="us-central1",
        service="api",
        source_dir=tmp_path,
        repository="cloud-run",
        staging_bucket="demo-build-source",
        tag="abc123",
        service_account=None,
        allow_unauthenticated=False,
    )
    assert plan["image_uri"] == "us-central1-docker.pkg.dev/demo/cloud-run/api:abc123"
    assert len(plan["steps"]) == 5
