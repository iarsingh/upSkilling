from incident_copilot.model import risk_level


def test_risk_level_thresholds():
    assert risk_level(0.1) == "low"
    assert risk_level(0.4) == "medium"
    assert risk_level(0.7) == "high"
