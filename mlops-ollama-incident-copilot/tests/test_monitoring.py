import pandas as pd

from incident_copilot.model import FEATURE_COLUMNS
from incident_copilot.monitoring import detect_mean_drift


def test_detect_mean_drift_flags_shifted_feature():
    baseline = pd.DataFrame([{feature: 10 for feature in FEATURE_COLUMNS} for _ in range(5)])
    current = baseline.copy()
    current["latency_ms"] = 20

    signals = detect_mean_drift(baseline, current, threshold=0.25)
    latency = next(signal for signal in signals if signal.feature == "latency_ms")

    assert latency.status == "drift"
