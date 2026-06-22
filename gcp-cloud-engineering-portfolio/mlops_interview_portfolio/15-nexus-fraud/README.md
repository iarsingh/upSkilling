# NexusFraud

Enterprise multi-cloud financial anomaly platform for real-time fraud
detection on GCP.

NexusFraud is a mission-critical MLOps platform for streaming fraud detection,
regulated lineage, continuous training, and zero-downtime model delivery. It
uses Apache Beam/Dataflow, Vertex AI Feature Store, Vertex AI Pipelines, Cloud
Composer, Vertex AI Metadata, Terraform, Cloud Build, canary deployments, and
shadow deployments.

## What It Demonstrates

- Apache Beam/Dataflow streaming feature processing
- Vertex AI Feature Store online serving readiness
- Vertex AI Pipelines and Cloud Composer orchestration
- Automated CT loop triggered by data and concept drift
- Vertex AI Metadata lineage and auditability
- Canary and shadow deployment policy
- Regulatory controls for financial services
- Zero-downtime model update readiness

## Testing and Security Gates

- **Code and unit tests:** validate Python CLIs, policy logic, API handlers, and
  reusable ML utilities with `pytest` before merge.
- **Data and ML tests:** run schema checks, feature freshness checks, drift
  checks, model evaluation, and batch/streaming quality gates with pandas,
  Great Expectations, Evidently, and Vertex AI evaluation metadata.
- **Pipeline tests:** validate Kubeflow/Vertex AI pipeline components,
  container inputs/outputs, retry policy, artifact paths, and promotion evidence
  before production execution.
- **LLM and RAG tests:** evaluate prompt injection, PII leakage, groundedness,
  hallucination, toxicity, retrieval quality, token budget, and agent loop
  limits with Model Armor, Vertex AI Gen AI evaluation, Ragas, or DeepEval.
- **CI/CD security:** scan Terraform, Kubernetes manifests, dependencies, and
  container images using Prisma Cloud, Artifact Analysis, and policy-as-code;
  sign approved images with Cosign.
- **Admission and runtime security:** enforce Binary Authorization, Kubernetes
  network policies, Secret Manager/External Secrets, VPC Service Controls, and
  SentinelOne or Prisma Cloud runtime workload protection on GKE.
- **Release safety:** use canary, shadow, performance, chaos, and rollback tests
  with Cloud Deploy, Cloud Monitoring, OpenTelemetry, Eventarc, and Pub/Sub
  remediation workflows.

## Run

```bash
python3 src/nexus_fraud_gate.py evaluate \
  --release examples/fraud_release.json
```

## Interview Talking Points

- Financial ML platforms need auditability and explainability in addition to
  model quality.
- Streaming feature correctness is as important as online inference latency.
- Canary and shadow deployment strategies reduce risk for downstream payment
  systems.
- Continuous training must be drift-triggered, governed, and lineage-aware.

## Interview Architecture

Explain this as a regulated real-time ML platform. Pub/Sub ingests transaction
events, Dataflow computes streaming features, Vertex AI Feature Store serves
online features, Vertex AI Pipelines retrains models, Metadata tracks lineage,
and Cloud Build promotes models through canary and shadow paths.

## Interview Flow

1. Transactions stream into Pub/Sub.
2. Dataflow enriches events and writes online features to Vertex AI Feature
   Store.
3. The fraud service reads low-latency features and scores transactions.
4. Drift detection triggers Vertex AI Pipelines for continuous training.
5. New models are deployed through shadow and canary strategies with audit,
   explainability, and regulatory approval gates.
