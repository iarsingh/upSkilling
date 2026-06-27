from gcp_ops_toolkit.vertex_ai import training_job_plan


def test_vertex_training_plan() -> None:
    plan = training_job_plan(
        project_id="demo",
        region="us-central1",
        display_name="train-1",
        container_uri="us-central1-docker.pkg.dev/demo/ml/train:1",
        machine_type="n1-standard-4",
        service_account="vertex@demo.iam.gserviceaccount.com",
        args=["--epochs", "10"],
    )
    assert plan["display_name"] == "train-1"
    assert plan["args"] == ["--epochs", "10"]
