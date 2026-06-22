import argparse
import base64
import json
from pathlib import Path


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def classify(alert: dict, runbooks: dict) -> dict:
    runbook = runbooks.get(
        alert["alert_name"],
        {
            "owner": "platform-sre",
            "runbook": "Investigate alert source, affected service, recent releases, and infrastructure health.",
            "default_severity": "warning",
        },
    )
    severity = alert.get("severity") or runbook["default_severity"]
    breach_ratio = round(alert["value"] / max(alert["threshold"], 1e-9), 3)

    return {
        "incident_key": f"{alert['environment']}:{alert['model']}:{alert['alert_name']}",
        "severity": severity,
        "owner": runbook["owner"],
        "summary": f"{alert['alert_name']} for {alert['model']} {alert['version']}",
        "breach_ratio": breach_ratio,
        "runbook": runbook["runbook"],
        "recommended_actions": recommended_actions(alert["alert_name"]),
    }


def recommended_actions(alert_name: str) -> list[str]:
    actions = {
        "MLModelDriftDetected": [
            "Compare live feature distribution with training baseline.",
            "Check data pipeline freshness and schema changes.",
            "Consider retraining or rolling back to previous model.",
        ],
        "MLInferenceHighP99Latency": [
            "Inspect HPA, pod resources, and node pressure.",
            "Check recent deployment rollout.",
            "Scale inference replicas or roll back if needed.",
        ],
        "MLInferenceHighErrorRate": [
            "Inspect inference application logs.",
            "Check model artifact loading and dependency availability.",
            "Trigger rollback if errors correlate with latest release.",
        ],
    }
    return actions.get(alert_name, ["Open incident, assign owner, and inspect service health."])


def handle_pubsub_event(event: dict, runbooks: dict) -> dict:
    payload = base64.b64decode(event["data"]).decode("utf-8")
    alert = json.loads(payload)
    return classify(alert, runbooks)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Route ML alert payloads to incident summaries.")
    parser.add_argument("--alert", required=True)
    parser.add_argument("--runbooks", required=True)
    return parser


def main() -> None:
    args = build_parser().parse_args()
    result = classify(load_json(Path(args.alert)), load_json(Path(args.runbooks)))
    print(json.dumps(result, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
