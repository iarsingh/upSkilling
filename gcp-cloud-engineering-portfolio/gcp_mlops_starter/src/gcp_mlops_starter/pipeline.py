from pathlib import Path

from .config import PipelineConfig
from .data import generate_churn_dataset, load_dataset
from .model import evaluate, save_json, train_gaussian_nb


def split_rows(rows: list[dict[str, float]], train_ratio: float = 0.8) -> tuple[list[dict[str, float]], list[dict[str, float]]]:
    split_index = int(len(rows) * train_ratio)
    return rows[:split_index], rows[split_index:]


def run_training(config: PipelineConfig, rows: int = 500) -> dict:
    if not config.dataset_path.exists():
        generate_churn_dataset(config.dataset_path, rows=rows)

    dataset = load_dataset(config.dataset_path)
    train_rows, test_rows = split_rows(dataset)
    model = train_gaussian_nb(train_rows)
    metrics = evaluate(model, test_rows)

    save_json(model, config.model_path)
    save_json(metrics, config.metrics_path)

    return {
        "dataset_path": str(config.dataset_path),
        "model_path": str(config.model_path),
        "metrics_path": str(config.metrics_path),
        "metrics": metrics,
    }
