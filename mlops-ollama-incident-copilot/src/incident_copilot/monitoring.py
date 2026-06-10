from dataclasses import dataclass

import pandas as pd

from incident_copilot.model import FEATURE_COLUMNS


@dataclass(frozen=True)
class DriftSignal:
    feature: str
    baseline_mean: float
    current_mean: float
    relative_change: float
    status: str


def detect_mean_drift(
    baseline: pd.DataFrame,
    current: pd.DataFrame,
    threshold: float = 0.25,
) -> list[DriftSignal]:
    signals: list[DriftSignal] = []
    for feature in FEATURE_COLUMNS:
        baseline_mean = float(baseline[feature].mean())
        current_mean = float(current[feature].mean())
        denominator = max(abs(baseline_mean), 1e-6)
        relative_change = abs(current_mean - baseline_mean) / denominator
        status = "drift" if relative_change >= threshold else "ok"
        signals.append(
            DriftSignal(
                feature=feature,
                baseline_mean=round(baseline_mean, 4),
                current_mean=round(current_mean, 4),
                relative_change=round(relative_change, 4),
                status=status,
            )
        )
    return signals
