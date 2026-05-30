from gcp_mlops_starter.config import PipelineConfig
from gcp_mlops_starter.pipeline import run_training


def test_training_pipeline_writes_artifacts(tmp_path):
    config = PipelineConfig(
        project_id="test-project",
        dataset_path=tmp_path / "data" / "churn.csv",
        artifact_dir=tmp_path / "artifacts",
    )

    result = run_training(config, rows=120)

    assert config.dataset_path.exists()
    assert config.model_path.exists()
    assert config.metrics_path.exists()
    assert result["metrics"]["rows"] == 24
    assert 0 <= result["metrics"]["accuracy"] <= 1
