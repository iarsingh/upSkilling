import argparse
import json
from pathlib import Path


REQUIRED_AGENTS = {"analyst", "validator", "execution"}


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_release(release):
    failures = []
    runtime = release["agent_runtime"]
    grounding = release["grounding"]
    security = release["security"]
    telemetry = release["telemetry"]
    aiops = release["aiops"]

    for key in ["vertex_ai_agent_engine_enabled", "agent_studio_enabled", "gemini_enabled"]:
        if not runtime.get(key):
            failures.append(f"agent runtime missing {key}")
    missing_agents = REQUIRED_AGENTS - set(runtime.get("agents", []))
    if missing_agents:
        failures.append(f"missing required agents: {sorted(missing_agents)}")
    if runtime.get("open_weights_backend") != "vllm-on-gke-enterprise":
        failures.append("open-weight backend must be vLLM on GKE Enterprise")
    if runtime["configured_loop_limit"] > runtime["max_agent_loop_count"]:
        failures.append("configured loop limit exceeds platform maximum")

    for key in [
        "vertex_ai_vector_search_enabled",
        "private_docs_embeddings",
        "cloud_build_doc_sync_enabled",
        "git_markdown_trigger_enabled",
    ]:
        if not grounding.get(key):
            failures.append(f"grounding missing {key}")
    if grounding["embedding_freshness_minutes"] > grounding["max_embedding_freshness_minutes"]:
        failures.append("embedding freshness exceeds policy")

    for key in [
        "gke_api_gateway_enabled",
        "secret_manager_injection",
        "pii_sanitization_enabled",
        "private_service_connect_enabled",
        "private_database_access_controlled",
    ]:
        if not security.get(key):
            failures.append(f"security missing {key}")
    if security.get("public_internet_agent_to_agent_allowed"):
        failures.append("agent-to-agent traffic must not use public internet")

    for key in [
        "bigquery_enabled",
        "token_consumption_logged",
        "latency_logged",
        "hallucination_metrics_enabled",
        "ragas_or_deepeval_enabled",
        "tool_loop_metrics_enabled",
    ]:
        if not telemetry.get(key):
            failures.append(f"telemetry missing {key}")

    for key in [
        "cloud_logging_enabled",
        "eventarc_enabled",
        "runaway_loop_termination_enabled",
        "cost_quota_enforcement_enabled",
        "agent_rollback_enabled",
    ]:
        if not aiops.get(key):
            failures.append(f"AIOps missing {key}")
    if aiops["token_overrun_rate"] > aiops["max_token_overrun_rate"]:
        failures.append("token overrun rate exceeds quota policy")
    if aiops["p95_agent_latency_ms"] > aiops["max_p95_agent_latency_ms"]:
        failures.append("agent p95 latency exceeds SLO")

    return {
        "status": "approved" if not failures else "blocked",
        "platform": release["platform"],
        "agents": runtime["agents"],
        "embedding_freshness_minutes": grounding["embedding_freshness_minutes"],
        "p95_agent_latency_ms": aiops["p95_agent_latency_ms"],
        "failure_count": len(failures),
        "failures": failures,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("evaluate")
    parser.add_argument("--release", required=True)
    args = parser.parse_args()

    result = evaluate_release(load_json(args.release))
    print(json.dumps(result, indent=2))
    raise SystemExit(0 if result["status"] == "approved" else 1)


if __name__ == "__main__":
    main()
