import argparse
import json
from pathlib import Path


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def evaluate_release(release):
    failures = []
    dsa = release["dsa_layer"]
    platform = release["platform_engineering"]
    security = release["devsecops"]
    observability = release["aiops_observability"]

    if dsa.get("gateway_language") not in {"rust", "go", "cpp", "c++"}:
        failures.append("gateway must use a systems language")
    for key in [
        "concurrent_trie_enabled",
        "bitwise_trie_compression",
        "min_heap_top_k_enabled",
        "levenshtein_enabled",
        "early_termination_enabled",
    ]:
        if not dsa.get(key):
            failures.append(f"DSA layer missing {key}")
    if dsa["top_k_size"] <= 0:
        failures.append("Top-K size must be positive")
    if dsa["p95_match_latency_ms"] > dsa["max_p95_match_latency_ms"]:
        failures.append("match latency exceeds sub-5ms target")

    for key in [
        "gke_deployed",
        "ebpf_routing_enabled",
        "horizontal_autoscaling_enabled",
        "memory_autoscaling_enabled",
    ]:
        if not platform.get(key):
            failures.append(f"platform engineering missing {key}")

    for key in [
        "secret_manager_enabled",
        "vertex_ai_extensions_enabled",
        "waf_enabled",
        "prompt_injection_filter_enabled",
        "input_sanitization_enabled",
    ]:
        if not security.get(key):
            failures.append(f"DevSecOps missing {key}")

    for key in [
        "prometheus_metrics_enabled",
        "cloud_monitoring_enabled",
        "fallback_gemini_provisioning_enabled",
    ]:
        if not observability.get(key):
            failures.append(f"AIOps/observability missing {key}")
    if observability["cache_hit_rate"] < observability["min_cache_hit_rate"]:
        failures.append("cache hit rate below policy")
    if observability["heap_rebalance_p95_ms"] > observability["max_heap_rebalance_p95_ms"]:
        failures.append("heap rebalance latency exceeds policy")

    return {
        "status": "approved" if not failures else "blocked",
        "platform": release["platform"],
        "p95_match_latency_ms": dsa["p95_match_latency_ms"],
        "cache_hit_rate": observability["cache_hit_rate"],
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
