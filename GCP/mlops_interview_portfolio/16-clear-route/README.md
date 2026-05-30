# ClearRoute

Multi-tenant GitOps MLOps platform for healthcare analytics.

ClearRoute is an enterprise platform-engineering blueprint for providing
MLOps-as-a-Service to multiple healthcare data science teams. It focuses on
tenant isolation, HIPAA-aligned security controls, GitOps infrastructure
delivery, Kubeflow on GKE, Vertex AI training, secure image promotion, and
network-isolated model deployment.

## What It Demonstrates

- GKE Enterprise hub-and-spoke cluster architecture
- Terraform plus Config Connector infrastructure management
- Argo CD GitOps delivery for GCP and Kubernetes resources
- Kubeflow on GKE for team-scoped ML workflows
- Cloud Build CI/CD with lint, tests, immutable image build, and Artifact
  Analysis scanning
- Vertex AI custom training with VPC peering and BigQuery access
- Tenant-scoped IAM, network policies, and secure GKE deployment
- HIPAA-aligned audit, encryption, and access controls

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
python3 src/clear_route_gate.py evaluate \
  --release examples/platform_release.json
```

## Interview Talking Points

- Multi-tenant MLOps is mostly platform engineering: isolation, policy, and
  repeatable paved roads.
- GitOps should own both infrastructure and ML workload delivery.
- Healthcare analytics requires auditability, least privilege, encryption, and
  network isolation before model lifecycle automation matters.
- Kubeflow and Vertex AI can coexist when Kubernetes is the team workflow layer
  and Vertex AI is the managed training/control-plane layer.

## Interview Architecture

Explain this as MLOps-as-a-Service for healthcare teams. Terraform provisions
GCP foundations, Config Connector manages selected GCP resources through
Kubernetes CRDs, Argo CD reconciles platform state, GKE Enterprise provides
tenant isolation, Kubeflow gives data scientists workflows, and Vertex AI runs
secure training.

## Interview Flow

1. A platform change is committed to Git.
2. Terraform and Config Connector create or update GCP resources.
3. Argo CD reconciles Kubeflow, tenant namespaces, IAM bindings, and network
   policies.
4. A data scientist commits a model definition, triggering Cloud Build tests,
   image build, Artifact Analysis scan, and registry push.
5. Vertex AI trains with VPC isolation and BigQuery access, then the validated
   model is deployed to autoscaling GKE serving workloads.
