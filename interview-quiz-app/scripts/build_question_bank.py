"""Consolidate the ai-mock-interviewer answer-bank into this app's local dataset.

Run manually whenever the source question bank changes:
    python scripts/build_question_bank.py
"""
import json
import re
from pathlib import Path

SOURCE = Path(__file__).resolve().parents[2] / "ai-mock-interviewer" / "scripts" / "answer-bank" / "final-qa-dataset.json"
DEST = Path(__file__).resolve().parents[1] / "data" / "questions.json"

# Ordered so DevOps/Cloud/K8s topics surface first in the app; MLOps/GenAI/LLMOps
# stay present but lower in the list (matches how the question bank itself is weighted).
TOPIC_RULES = [
    ("Kubernetes", ["kubernetes", "k8s", "gke", "eks", "helm", "ingress", "kubelet", "etcd", "coredns", "rbac"]),
    ("Docker & Containers", ["docker", "container", "containerd"]),
    ("Terraform / IaC", ["terraform", "iac", "infrastructure as code"]),
    ("GCP / Cloud", ["gcp", "cloud", "azure", "aws", "landing zone", "iam"]),
    ("Networking", ["network", "dns", "load balanc", "mtls", "hybrid networking"]),
    ("Observability", ["observability", "monitoring", "logging", "tracing", "datadog", "prometheus", "grafana", "opentelemetry", "elastic", "kibana"]),
    ("CI/CD & GitOps", ["ci/cd", "gitops", "jenkins", "argo"]),
    ("Security & Risk", ["security", "risk", "compliance", "audit", "governance", "sentinel", "devsecops"]),
    ("SRE & Incident Response", ["sre", "reliability", "incident", "outage", "troubleshoot"]),
    ("Ansible & Automation", ["ansible", "automation"]),
    ("Python", ["python"]),
    ("FastAPI / APIs", ["fastapi", "api"]),
    ("Linux", ["linux"]),
    ("DSA / Coding", ["dsa", "coding", "leetcode", "algorithm"]),
    ("System Design", ["system design", "architecture"]),
    ("MLOps / LLMOps / GenAI", ["mlops", "llmops", "genai", "llm ", "rag", "kubeflow", "mlflow", "machine learning", "prompt engineering"]),
    ("Databases", ["database", "postgres", "sql", "kafka"]),
    ("Behavioral / HR", ["behav", "hr", "leadership", "stakeholder", "experience"]),
]


def bucket_topic(category: str | None, section: str, question: str) -> str:
    haystack = " ".join(filter(None, [category, section, question])).lower()
    for topic, keywords in TOPIC_RULES:
        if any(kw in haystack for kw in keywords):
            return topic
    return "General"


def main() -> None:
    raw = json.loads(SOURCE.read_text())

    seen_questions = set()
    out = []
    for item in raw:
        question = item["question"].strip()
        answer = item["answer"].strip()
        if not question or not answer or question in seen_questions:
            continue
        seen_questions.add(question)

        subcategory = item.get("category") or item.get("section") or "General"
        topic = bucket_topic(item.get("category"), item.get("section", ""), question)

        out.append({
            "id": f"q{len(out) + 1:04d}",
            "topic": topic,
            "subcategory": subcategory,
            "question": question,
            "answer": answer,
        })

    topic_order = [t for t, _ in TOPIC_RULES] + ["General"]
    out.sort(key=lambda q: topic_order.index(q["topic"]))

    DEST.parent.mkdir(parents=True, exist_ok=True)
    DEST.write_text(json.dumps(out, indent=2))

    counts: dict[str, int] = {}
    for q in out:
        counts[q["topic"]] = counts.get(q["topic"], 0) + 1
    print(f"Wrote {len(out)} questions to {DEST}")
    for topic in topic_order:
        if topic in counts:
            print(f"  {counts[topic]:>4}  {topic}")


if __name__ == "__main__":
    main()
