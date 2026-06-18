import requests

from incident_copilot.schemas import IncidentFeatures


def fallback_recommendation(features: IncidentFeatures, probability: float, risk: str) -> str:
    if risk == "high":
        return (
            "High incident risk. Check recent deployments, inspect error-rate dashboards, "
            "scale the service if saturation is confirmed, and prepare rollback if latency "
            "or restarts continue to rise."
        )
    if risk == "medium":
        return (
            "Medium incident risk. Watch latency and error rate for the next 15 minutes, "
            "compare against the previous deploy window, and validate queue consumers."
        )
    return (
        "Low incident risk. Keep standard monitoring active and review only if a fresh "
        "deployment or traffic spike is expected."
    )


class OllamaCopilot:
    def __init__(self, base_url: str, model: str, timeout_seconds: int):
        self.base_url = base_url.rstrip("/")
        self.model = model
        self.timeout_seconds = timeout_seconds

    def recommendation(self, features: IncidentFeatures, probability: float, risk: str) -> tuple[str, str]:
        prompt = self._prompt(features, probability, risk)
        try:
            response = requests.post(
                f"{self.base_url}/api/generate",
                json={
                    "model": self.model,
                    "prompt": prompt,
                    "stream": False,
                    "options": {"temperature": 0.2, "num_predict": 96},
                },
                timeout=self.timeout_seconds,
            )
            response.raise_for_status()
            text = response.json().get("response", "").strip()
            if text:
                return text, "ollama"
        except requests.RequestException:
            pass
        return fallback_recommendation(features, probability, risk), "fallback"

    def is_connected(self) -> bool:
        try:
            response = requests.get(f"{self.base_url}/api/tags", timeout=3)
            response.raise_for_status()
            return True
        except requests.RequestException:
            return False

    @staticmethod
    def _prompt(features: IncidentFeatures, probability: float, risk: str) -> str:
        return f"""
You are an SRE incident commander. Give concise production remediation guidance.

Service: {features.service_name}
Environment: {features.environment}
Incident probability: {probability}
Risk: {risk}
CPU: {features.cpu_utilization}%
Memory: {features.memory_utilization}%
Request rate: {features.request_rate}/min
Error rate: {features.error_rate}
Latency: {features.latency_ms} ms
Pod restarts: {features.pod_restarts}
Deploy age: {features.deploy_age_minutes} minutes
Queue depth: {features.queue_depth}

Return 3-5 crisp action bullets. Do not mention that you are an AI.
""".strip()
