from gcp_vertex_tabular_ml.config import PipelineConfig
from gcp_vertex_tabular_ml.data import generate_housing_rows, write_csv
from gcp_vertex_tabular_ml.model import train_linear_regression, write_artifacts


def run_training(config: PipelineConfig) -> dict[str, object]:
    rows = generate_housing_rows(config.rows, config.random_seed)
    write_csv(rows, config.data_path)
    model = train_linear_regression(rows)
    model_path, metrics_path = write_artifacts(model, config.artifact_dir)

    return {
        "data_path": str(config.data_path),
        "model_path": str(model_path),
        "metrics_path": str(metrics_path),
        "metrics": model["metrics"],
    }

