# Security and Testing Playbook

Use this playbook to explain how every portfolio project moves from code to
production with testing, security evidence, and runtime protection.

## Testing Stages

| Stage | What It Proves | Example Tools |
|---|---|---|
| Unit tests | Core Python policies, scoring functions, validators, and parsers work correctly. | `pytest`, `unittest`, local fixtures |
| Data contract tests | Training, batch, streaming, and feature-store inputs match expected schemas and freshness rules. | Great Expectations, Evidently, pandas, BigQuery checks |
| Pipeline component tests | Kubeflow/Vertex pipeline components have stable inputs, outputs, container images, and retry behavior. | KFP v2 component tests, Google Cloud Pipeline Components |
| Integration tests | Pub/Sub, Dataflow, BigQuery, Feature Store, Vertex AI, and GKE services work together before release. | Ephemeral test projects, emulator where practical, staging GCP services |
| Model evaluation tests | Candidate models beat champion baselines and meet fairness, drift, latency, and explainability policy. | Vertex AI Experiments, Model Registry, Evidently, custom evaluation reports |
| LLM and RAG evaluation | Prompts, retrieval configs, vector indexes, and agents pass groundedness, toxicity, hallucination, and tool-loop checks. | Vertex AI Gen AI evaluation, Ragas, DeepEval, Model Armor |
| Security tests | IaC, containers, dependencies, secrets, Kubernetes manifests, and runtime workloads are scanned before promotion. | Prisma Cloud, Artifact Analysis, Binary Authorization, Cosign, SentinelOne |
| Performance tests | Inference, streaming, batch, vector search, and gateway paths meet p95/p99 latency and throughput targets. | k6, Locust, Cloud Monitoring, OpenTelemetry |
| Chaos and rollback tests | Canary, shadow, fallback routing, and GitOps rollback work under failure. | Cloud Deploy, Argo CD, Eventarc, Pub/Sub remediation |

## Security Control Points

- **Source and pull request:** branch protection, code owners, secret scanning,
  SAST, dependency review, and policy-as-code checks.
- **IaC:** Terraform plan review, Checkov/tfsec-style policy checks, Prisma
  Cloud IaC scan, VPC Service Controls validation, IAM least-privilege review.
- **Build:** Cloud Build provenance, SBOM generation, container vulnerability
  scanning, license checks, and signed artifacts.
- **Registry:** Artifact Registry with Artifact Analysis, Prisma Cloud registry
  scanning, severity-based promotion policy, and immutable tags.
- **Admission:** Binary Authorization, Cosign signature verification,
  Kubernetes admission policy, approved base images, and blocked privileged pods.
- **Runtime:** SentinelOne or Prisma Cloud workload protection for Kubernetes
  runtime detection, suspicious process alerts, malware detection, drift from
  known image behavior, and workload quarantine.
- **Network:** GKE NetworkPolicy, Cloud Armor, Private Service Connect, VPC
  Service Controls, no public notebook access, and restricted egress.
- **Secrets:** Secret Manager, External Secrets Operator, key rotation, no
  plaintext secrets in Git, and audit logs for secret access.
- **LLM security:** Model Armor, prompt-injection filters, PII redaction,
  toxicity checks, context-groundedness evaluation, and token budget enforcement.
- **Audit:** Cloud Logging, BigQuery evidence tables, Vertex AI Metadata,
  approval records, vulnerability reports, and rollback history.

## Prisma Cloud Positioning

Use Palo Alto Prisma Cloud as the enterprise CNAPP/CWPP layer:

- Scan Terraform, Kubernetes manifests, and container images in CI/CD.
- Prioritize vulnerabilities by severity, exploitability, and runtime exposure.
- Block promotion when critical CVEs, malware, secrets, or compliance failures
  are detected.
- Monitor running GKE workloads for anomalous process, network, and file
  behavior.
- Feed findings into Security Command Center, Jira, Slack, or Pub/Sub-based
  remediation workflows.

## SentinelOne Positioning

Use SentinelOne as the runtime XDR/CWPP layer:

- Protect Kubernetes nodes and container workloads from malware, suspicious
  process execution, reverse shells, crypto-mining, and lateral movement.
- Detect runtime behavior that image scans cannot catch, such as injected
  sidecars, compromised dependencies, and unexpected binaries.
- Quarantine or kill compromised workloads and trigger Eventarc/Pub/Sub
  remediation.
- Correlate workload signals with Cloud Logging, GKE audit logs, and model
  serving telemetry.

## Interview Line

> "My release process treats ML, GenAI, and platform changes like production
> software. A model or prompt does not ship just because it is accurate. It must
> pass data contracts, evaluation gates, security scans, signed artifact policy,
> runtime protection requirements, SLO checks, and rollback drills."
