import unittest

from src.aiops_core import Telemetry, risk_tier, score_incident


class AIOpsCoreTest(unittest.TestCase):
    def test_low_risk_service_does_not_require_approval(self) -> None:
        result = score_incident(
            Telemetry(
                service_name="inventory",
                gcp_region="asia-south1",
                p95_latency_ms=180,
                error_rate_pct=0.4,
                cpu_utilization_pct=35,
                memory_utilization_pct=42,
                active_alert_count=1,
                deployment_within_30m=False,
                slo_burn_rate=0.5,
            )
        )

        self.assertEqual(result["risk_tier"], "low")
        self.assertFalse(result["requires_human_approval"])

    def test_critical_risk_service_requires_approval(self) -> None:
        result = score_incident(
            Telemetry(
                service_name="checkout",
                gcp_region="us-central1",
                p95_latency_ms=1400,
                error_rate_pct=14,
                cpu_utilization_pct=95,
                memory_utilization_pct=91,
                active_alert_count=35,
                deployment_within_30m=True,
                slo_burn_rate=12,
            )
        )

        self.assertEqual(result["risk_tier"], "critical")
        self.assertTrue(result["requires_human_approval"])
        self.assertIn("page on-call and require human approval before remediation", result["recommended_actions"])

    def test_risk_tier_boundaries(self) -> None:
        self.assertEqual(risk_tier(20), "low")
        self.assertEqual(risk_tier(40), "medium")
        self.assertEqual(risk_tier(70), "high")
        self.assertEqual(risk_tier(90), "critical")


if __name__ == "__main__":
    unittest.main()
