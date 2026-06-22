import argparse
import json
from pathlib import Path


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_release(release):
    failures = []
    dsa = release["dsa_layer"]
    data = release["data_pipeline"]
    lifecycle = release["mlops_llmops"]
    security = release["devsecops"]
    quality = release["quality"]

    if dsa.get("graph_search") not in {"astar", "dijkstra"}:
        failures.append("graph search must use A* or Dijkstra")
    if dsa["p95_graph_search_latency_ms"] > dsa["max_graph_search_latency_ms"]:
        failures.append("graph search latency exceeds sub-20ms target")
    for key in ["minhash_enabled", "lsh_enabled"]:
        if not dsa.get(key):
            failures.append(f"dedup layer missing {key}")
    if dsa["dedup_rate"] < dsa["min_dedup_rate"]:
        failures.append("dedup rate below policy")

    for key in ["dataflow_enabled", "ner_model_enabled", "knowledge_graph_enabled", "vertex_ai_vector_search_enabled"]:
        if not data.get(key):
            failures.append(f"data pipeline missing {key}")

    for key in ["vertex_ai_pipelines_enabled", "embedding_validation_enabled", "cloud_build_incremental_index_update", "zero_downtime_index_update", "ontology_change_trigger_enabled"]:
        if not lifecycle.get(key):
            failures.append(f"MLOps/LLMOps missing {key}")

    for key in ["hipaa_aligned_controls", "secret_manager_masking_rules", "gke_ingress_pii_masking", "audit_logs_enabled"]:
        if not security.get(key):
            failures.append(f"DevSecOps missing {key}")

    if quality["groundedness"] < quality["min_groundedness"]:
        failures.append("groundedness below policy")
    if quality["hallucination_rate"] > quality["max_hallucination_rate"]:
        failures.append("hallucination rate exceeds policy")

    return {
        "status": "approved" if not failures else "blocked",
        "platform": release["platform"],
        "p95_graph_search_latency_ms": dsa["p95_graph_search_latency_ms"],
        "dedup_rate": dsa["dedup_rate"],
        "groundedness": quality["groundedness"],
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
