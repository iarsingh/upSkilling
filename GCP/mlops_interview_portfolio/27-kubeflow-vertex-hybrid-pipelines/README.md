# PipelineBridge

Hybrid Kubeflow Pipelines and Vertex AI Pipelines governance platform.

PipelineBridge is a senior MLOps project for teams that want portable KFP v2
pipelines while still using managed Vertex AI for production-grade execution,
metadata, model registry, endpoints, and governance. The same pipeline spec can
run on Kubeflow on GKE for tenant-controlled workflows and on Vertex AI Pipelines
for managed production releases.

## Architecture

```mermaid
flowchart LR
    A[Model Repo] --> B[Cloud Build]
    B --> C[Unit + Component Tests]
    C --> D[KFP v2 Compile]
    D --> E[Pipeline YAML Artifact]
    E --> F[Kubeflow Pipelines on GKE]
    E --> G[Vertex AI Pipelines]
    H[BigQuery / GCS] --> F
    H --> G
    F --> I[Experiment Evidence]
    G --> J[Vertex AI Metadata]
    G --> K[Vertex AI Model Registry]
    K --> L[Vertex AI Endpoint Canary]
    L --> M[Cloud Monitoring SLO Gate]
    M --> N[Cloud Deploy Promotion]
```

## Interview Architecture

Explain this as a portability and governance project. Kubeflow gives teams a
Kubernetes-native development and experimentation backend. Vertex AI Pipelines
gives managed orchestration, lineage, registry, and production integration. The
important engineering move is to standardize on KFP v2 components, compile once,
run on either backend, and enforce one release policy.

## Flow

1. A model team changes a pipeline component, feature transform, training image,
   or evaluation rule in Git.
2. Cloud Build runs Python tests, component contract tests, and container image
   scans.
3. The pipeline is compiled with the Kubeflow Pipelines SDK v2 into a portable
   pipeline YAML artifact.
4. Non-production runs execute on Kubeflow Pipelines on GKE for fast iteration
   inside tenant namespaces.
5. Production candidate runs execute on Vertex AI Pipelines with Google Cloud
   pipeline components.
6. Artifacts, metrics, parameters, datasets, prompt variants, and model versions
   are logged to Vertex AI Metadata and BigQuery evidence tables.
7. Passing models are registered in Vertex AI Model Registry and deployed by
   Cloud Deploy with canary, shadow, and rollback controls.
8. Cloud Monitoring SLOs decide whether the canary is promoted or rolled back.

## Senior Talking Points

- The strongest Kubeflow/GCP story is not "Kubeflow versus Vertex AI"; it is
  using KFP portability with managed production governance.
- KFP v2 components keep pipeline definitions portable across open-source
  Kubeflow backends and Vertex AI Pipelines.
- Vertex AI Metadata and Model Registry make release evidence interview-ready.
- Cloud Build and Cloud Deploy create a real software delivery story around ML
  workflows, not just notebook execution.

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
python3 src/hybrid_pipeline_gate.py evaluate \
  --release examples/hybrid_pipeline_release.json
```
