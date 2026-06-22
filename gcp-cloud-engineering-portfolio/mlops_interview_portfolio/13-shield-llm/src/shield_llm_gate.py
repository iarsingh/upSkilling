import argparse
import json
from pathlib import Path


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_policy(policy):
    failures = []
    runtime = policy["runtime"]
    guardrails = policy["guardrails"]
    evaluation = policy["evaluation"]
    telemetry = policy["telemetry"]

    if runtime.get("gateway") != "fastapi":
        failures.append("gateway must be FastAPI")
    if runtime.get("deployment") != "gke":
        failures.append("gateway must be deployed on GKE")
    if "vertex-ai-gemini" not in runtime.get("providers", []):
        failures.append("Vertex AI Gemini provider missing")
    if runtime["p95_latency_ms"] > runtime["max_p95_latency_ms"]:
        failures.append("gateway p95 latency exceeds policy")
    if len(guardrails.get("layers", [])) < guardrails["required_layer_count"]:
        failures.append("not all guardrail layers are enabled")
    if guardrails["prompt_injection_rate"] > guardrails["max_prompt_injection_rate"]:
        failures.append("prompt injection rate exceeds policy")
    if guardrails["pii_leak_rate"] > guardrails["max_pii_leak_rate"]:
        failures.append("PII leak rate exceeds policy")
    if not evaluation.get("vertex_ai_pipelines_enabled"):
        failures.append("Vertex AI Pipelines evaluation is required")
    if not {"ragas", "deepeval"}.intersection(evaluation.get("frameworks", [])):
        failures.append("Ragas or DeepEval evaluation framework required")
    if evaluation["groundedness"] < evaluation["min_groundedness"]:
        failures.append("groundedness below policy")
    if evaluation["hallucination_rate"] > evaluation["max_hallucination_rate"]:
        failures.append("hallucination rate exceeds policy")
    for key in [
        "pubsub_enabled",
        "bigquery_enabled",
        "vertex_metadata_enabled",
        "token_logging_enabled",
        "safety_score_logging_enabled",
    ]:
        if not telemetry.get(key):
            failures.append(f"telemetry missing {key}")

    return {
        "status": "approved" if not failures else "blocked",
        "platform": policy["platform"],
        "guardrail_layers": len(guardrails.get("layers", [])),
        "p95_latency_ms": runtime["p95_latency_ms"],
        "failure_count": len(failures),
        "failures": failures,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("evaluate")
    parser.add_argument("--policy", required=True)
    args = parser.parse_args()
    result = evaluate_policy(load_json(args.policy))
    print(json.dumps(result, indent=2))
    raise SystemExit(0 if result["status"] == "approved" else 1)


if __name__ == "__main__":
    main()
