from pathlib import Path
from typing import Any

import joblib
import pandas as pd

from incident_copilot.schemas import IncidentFeatures

FEATURE_COLUMNS = [
    "cpu_utilization",
    "memory_utilization",
    "request_rate",
    "error_rate",
    "latency_ms",
    "pod_restarts",
    "deploy_age_minutes",
    "queue_depth",
]


class IncidentRiskModel:
    def __init__(self, model_path: Path):
        self.model_path = model_path
        self.pipeline: Any | None = None
        self.version = "not-loaded"

    def load(self) -> None:
        artifact = joblib.load(self.model_path)
        self.pipeline = artifact["pipeline"]
        self.version = artifact["version"]

    @property
    def loaded(self) -> bool:
        return self.pipeline is not None

    def predict_probability(self, features: IncidentFeatures) -> float:
        if self.pipeline is None:
            raise RuntimeError("Model has not been loaded")
        frame = pd.DataFrame([{column: getattr(features, column) for column in FEATURE_COLUMNS}])
        probability = self.pipeline.predict_proba(frame)[0][1]
        return round(float(probability), 4)


def risk_level(probability: float) -> str:
    if probability >= 0.70:
        return "high"
    if probability >= 0.40:
        return "medium"
    return "low"
