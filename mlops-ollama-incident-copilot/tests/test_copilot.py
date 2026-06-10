from incident_copilot.copilot import fallback_recommendation
from incident_copilot.schemas import IncidentFeatures


def test_fallback_recommendation_high_risk_mentions_action():
    features = IncidentFeatures(
        cpu_utilization=91,
        memory_utilization=88,
        request_rate=1200,
        error_rate=0.12,
        latency_ms=850,
        pod_restarts=5,
        deploy_age_minutes=12,
        queue_depth=120,
    )

    recommendation = fallback_recommendation(features, 0.86, "high")

    assert "High incident risk" in recommendation
    assert "rollback" in recommendation
