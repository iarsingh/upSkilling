from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class PipelineConfig:
    project_id: str
    region: str
    rows: int = 1000
    data_path: Path = Path("data/housing.csv")
    artifact_dir: Path = Path("artifacts")
    random_seed: int = 42

