import argparse
import json
from pathlib import Path


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_release(release):
    failures = []
    dsa = release["dsa_layer"]
    devops = release["devops"]
    streaming = release["streaming"]
    mlops = release["mlops"]

    if dsa.get("sampler_language") not in {"go", "cpp", "c++", "rust"}:
        failures.append("sampler must use a systems language")
    for key in [
        "adjacency_list_optimized",
        "atomic_bitsets_enabled",
        "bounded_bfs_enabled",
        "scc_background_job_enabled",
    ]:
        if not dsa.get(key):
            failures.append(f"DSA layer missing {key}")
    if dsa["bfs_depth"] > dsa["max_bfs_depth"]:
        failures.append("BFS depth exceeds bounded traversal policy")
    if dsa["p95_sampling_latency_ms"] > dsa["max_sampling_latency_ms"]:
        failures.append("subgraph sampling latency exceeds 30ms target")
    if dsa.get("scc_algorithm") not in {"tarjan", "kosaraju"}:
        failures.append("SCC algorithm must be Tarjan or Kosaraju")

    for key in [
        "terraform_managed",
        "argocd_enabled",
        "gke_memory_optimized_node_pool",
        "horizontal_autoscaling_enabled",
    ]:
        if not devops.get(key):
            failures.append(f"DevOps missing {key}")

    for key in ["pubsub_enabled", "dataflow_enabled", "bigtable_adjacency_cache"]:
        if not streaming.get(key):
            failures.append(f"streaming missing {key}")
    if streaming["events_per_second"] < streaming["minimum_events_per_second"]:
        failures.append("streaming throughput below target")

    if not mlops.get("vertex_ai_pipelines_enabled"):
        failures.append("Vertex AI Pipelines required")
    if mlops.get("training_framework") != "pytorch-geometric":
        failures.append("GNN training must use PyTorch Geometric")
    for key in [
        "vertex_ai_metadata_enabled",
        "graph_schema_version_logged",
        "training_snapshot_logged",
        "model_hyperparameters_logged",
    ]:
        if not mlops.get(key):
            failures.append(f"MLOps lineage missing {key}")

    return {
        "status": "approved" if not failures else "blocked",
        "platform": release["platform"],
        "bfs_depth": dsa["bfs_depth"],
        "p95_sampling_latency_ms": dsa["p95_sampling_latency_ms"],
        "events_per_second": streaming["events_per_second"],
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
