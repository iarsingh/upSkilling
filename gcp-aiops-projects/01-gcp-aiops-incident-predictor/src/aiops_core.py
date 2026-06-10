from dataclasses import dataclass


@dataclass(frozen=True)
class Telemetry:
    service_name: str
    gcp_region: str
    p95_latency_ms: float
    error_rate_pct: float
    cpu_utilization_pct: float
    memory_utilization_pct: float
    active_alert_count: int
    deployment_within_30m: bool
    slo_burn_rate: float


def clamp(value: float, lower: float = 0.0, upper: float = 100.0) -> float:
    return max(lower, min(upper, value))


def risk_tier(score: float) -> str:
    if score >= 85:
        return "critical"
    if score >= 65:
        return "high"
    if score >= 35:
        return "medium"
    return "low"


def explain_risk(telemetry: Telemetry) -> list[str]:
    reasons: list[str] = []
    if telemetry.p95_latency_ms >= 800:
        reasons.append("p95 latency is above the incident threshold")
    if telemetry.error_rate_pct >= 5:
        reasons.append("error rate is high")
    if telemetry.cpu_utilization_pct >= 85:
        reasons.append("CPU utilization is saturated")
    if telemetry.memory_utilization_pct >= 85:
        reasons.append("memory utilization is saturated")
    if telemetry.active_alert_count >= 15:
        reasons.append("alert volume indicates possible alert storm")
    if telemetry.deployment_within_30m:
        reasons.append("recent deployment increases rollback suspicion")
    if telemetry.slo_burn_rate >= 6:
        reasons.append("SLO burn rate is consuming error budget quickly")
    if not reasons:
        reasons.append("telemetry is within normal operating bands")
    return reasons


def score_incident(telemetry: Telemetry) -> dict:
    score = 0.0
    score += clamp(telemetry.p95_latency_ms / 15, upper=25)
    score += clamp(telemetry.error_rate_pct * 3.0, upper=25)
    score += clamp((telemetry.cpu_utilization_pct - 50) * 0.35, upper=15)
    score += clamp((telemetry.memory_utilization_pct - 50) * 0.30, upper=12)
    score += clamp(telemetry.active_alert_count * 1.1, upper=12)
    score += 7 if telemetry.deployment_within_30m else 0
    score += clamp(telemetry.slo_burn_rate * 1.2, upper=14)
    score = round(clamp(score), 2)

    tier = risk_tier(score)
    return {
        "service_name": telemetry.service_name,
        "gcp_region": telemetry.gcp_region,
        "risk_score": score,
        "risk_tier": tier,
        "reasons": explain_risk(telemetry),
        "recommended_actions": recommend_actions(telemetry, tier),
        "requires_human_approval": tier in {"high", "critical"},
    }


def recommend_actions(telemetry: Telemetry, tier: str) -> list[str]:
    actions = []
    if telemetry.deployment_within_30m and tier in {"high", "critical"}:
        actions.append("check recent deployment and prepare rollback plan")
    if telemetry.error_rate_pct >= 5:
        actions.append("inspect Cloud Logging error samples and failed request traces")
    if telemetry.p95_latency_ms >= 800:
        actions.append("check Cloud Trace latency hotspots and backend dependency health")
    if telemetry.cpu_utilization_pct >= 85 or telemetry.memory_utilization_pct >= 85:
        actions.append("review GKE/Cloud Run scaling limits and resource requests")
    if telemetry.slo_burn_rate >= 6:
        actions.append("open incident and protect remaining error budget")
    if tier == "low":
        actions.append("continue monitoring and avoid automated remediation")
    if tier == "medium":
        actions.append("notify service owner and watch next 15 minutes")
    if tier in {"high", "critical"}:
        actions.append("page on-call and require human approval before remediation")
    return actions
