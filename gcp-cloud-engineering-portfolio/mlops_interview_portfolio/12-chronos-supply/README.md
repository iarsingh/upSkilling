# ChronosSupply

Enterprise multi-echelon demand forecasting and inventory optimization platform
for high-throughput retail batch MLOps on GCP.

ChronosSupply forecasts demand for millions of SKU-store combinations and
promotes challenger models only when data quality, segment-level accuracy,
cost, scalability, and registry controls pass. The design maps to Cloud
Composer, Dataflow, Great Expectations, BigQuery ML, Vertex AI Custom Training,
Vertex AI Model Registry, GitHub Actions, Memorystore, and BigQuery serving.

## What It Demonstrates

- Cloud Composer orchestration for predictable batch compute spikes
- Dataflow + Great Expectations validation before training
- BQML and Vertex AI custom training split by segment complexity
- Segment-level challenger versus champion evaluation
- Spot/preemptible worker policy for cost efficiency
- GitHub Actions controlled model registration
- Micro-batched BigQuery predictions and Redis inventory cache

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
python3 src/chronos_supply_gate.py evaluate \
  --candidate examples/forecast_run.json
```

## Interview Talking Points

- Forecasting platforms fail when aggregate metrics hide weak SKU-store
  segments; segment gates are mandatory.
- Batch MLOps cost control is an architecture concern, not an afterthought.
- Great Expectations and Dataflow prevent corrupt upstream retail logs from
  poisoning training.
- BigQuery plus Redis supports both analytical planning and low-latency
  warehouse inventory lookups.

## Interview Architecture

Explain this as a high-throughput batch forecasting platform. Cloud Composer
orchestrates the schedule, Dataflow validates retail logs with Great
Expectations, BigQuery ML handles scalable baseline forecasting, Vertex AI
trains complex segment models, and Redis serves low-latency inventory lookups.

## Interview Flow

1. Retail event logs land in BigQuery or Cloud Storage.
2. Dataflow runs Great Expectations checks before training begins.
3. Cloud Composer fans out BQML and Vertex AI training jobs by SKU-store
   segment.
4. Challenger forecasts are compared against champion baselines segment by
   segment.
5. Approved models are registered, forecasts are written to BigQuery, and hot
   lookup slices are cached in Redis for warehouse systems.
