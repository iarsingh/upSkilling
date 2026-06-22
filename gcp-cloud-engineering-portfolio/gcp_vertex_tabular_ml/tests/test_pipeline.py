import json

from gcp_vertex_tabular_ml.config import PipelineConfig
from gcp_vertex_tabular_ml.pipeline import run_training


def test_pipeline_writes_expected_artifacts(tmp_path) -> None:
    result = run_training(
        PipelineConfig(
            project_id="test-project",
            region="us-central1",
            rows=100,
            data_path=tmp_path / "data" / "housing.csv",
            artifact_dir=tmp_path / "artifacts",
        )
    )

    assert (tmp_path / "data" / "housing.csv").exists()
    assert (tmp_path / "artifacts" / "model.json").exists()
    assert (tmp_path / "artifacts" / "metrics.json").exists()
    assert result["metrics"]["training_rows"] == 100

    metrics = json.loads((tmp_path / "artifacts" / "metrics.json").read_text())
    assert metrics["r2"] > 0.90

