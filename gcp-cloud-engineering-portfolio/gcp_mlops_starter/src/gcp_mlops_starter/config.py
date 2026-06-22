from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class PipelineConfig:
    project_id: str
    region: str = "us-central1"
    dataset_path: Path = Path("data/churn.csv")
    artifact_dir: Path = Path("artifacts")
    model_name: str = "customer_churn_naive_bayes"

    @property
    def model_path(self) -> Path:
        return self.artifact_dir / "model.json"

    @property
    def metrics_path(self) -> Path:
        return self.artifact_dir / "metrics.json"
