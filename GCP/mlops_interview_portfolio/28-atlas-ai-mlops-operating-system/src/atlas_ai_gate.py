import argparse
import json
from pathlib import Path


SKILL_DOMAINS = [
    "foundation",
    "mlops",
    "llmops",
    "data_platform",
    "devsecops",
    "sre_aiops",
    "algorithms_finops",
]


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def _all_enabled(section):
    disabled = []
    for key, value in section.items():
        if value is False or value is None or value == "":
            disabled.append(key)
    return disabled


def evaluate_release(release):
    failures = []
    quality = release["quality"]

    for domain in SKILL_DOMAINS:
        disabled = _all_enabled(release[domain])
        for key in disabled:
            failures.append(f"{domain} missing {key}")

    if release["covered_project_count"] < quality["min_covered_project_count"]:
        failures.append("capstone does not cover enough portfolio projects")
    if len(SKILL_DOMAINS) < quality["min_skill_domains"]:
        failures.append("not enough skill domains represented")
    if quality["p95_platform_latency_ms"] > quality["max_p95_platform_latency_ms"]:
        failures.append("platform p95 latency exceeds SLO")
    if quality["release_failure_rate"] > quality["max_release_failure_rate"]:
        failures.append("release failure rate exceeds SLO")
    if quality["critical_vulnerabilities"] > quality["max_critical_vulnerabilities"]:
        failures.append("critical vulnerabilities must be zero")

    return {
        "status": "approved" if not failures else "blocked",
        "platform": release["platform"],
        "covered_project_count": release["covered_project_count"],
        "skill_domains": SKILL_DOMAINS,
        "skill_domain_count": len(SKILL_DOMAINS),
        "p95_platform_latency_ms": quality["p95_platform_latency_ms"],
        "release_failure_rate": quality["release_failure_rate"],
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
