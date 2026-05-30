# VisionEdge

Hybrid cloud-edge vision pipeline for industrial quality control.

VisionEdge trains GPU-accelerated computer vision anomaly models in GCP,
optimizes them for constrained edge hardware, deploys them through GKE
Enterprise/Anthos patterns, and streams uncertainty and drift telemetry back to
the cloud for selective retraining.

## What It Demonstrates

- Vertex AI Custom Training for YOLO/ResNet-style defect models
- Cloud Storage raw image lake and defect dataset lineage
- TensorRT and Edge TPU optimization gates
- Artifact Registry container promotion
- Anthos/GKE Enterprise edge deployment strategy
- MQTT/Pub/Sub telemetry from edge devices
- Sub-10ms local inference gate
- Selective data collection and retraining triggers

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
python3 src/vision_edge_gate.py evaluate \
  --release examples/edge_release.json
```

## Interview Talking Points

- Edge MLOps is a different operating model: latency, bandwidth, offline
  tolerance, and zero-downtime factory requirements matter.
- Centralized cloud training must be paired with local inference validation.
- Uncertainty and drift telemetry should decide what data is collected, not raw
  image uploads from every device.
- Model optimization is a release gate, not a post-processing step.

## Interview Architecture

Explain this as a cloud control plane with edge execution. GCP stores defect
images and trains large vision models on Vertex AI GPUs. Cloud Build optimizes
models with TensorRT or Edge TPU compilation, Artifact Registry stores edge
containers, and GKE Enterprise manages rollout to factory edge devices.

## Interview Flow

1. Defect images and labels are collected centrally in Cloud Storage.
2. Vertex AI Custom Training trains a vision anomaly model.
3. The model is optimized for edge hardware and packaged into a container.
4. GKE Enterprise or Anthos-style rollout pushes canaries to selected factories.
5. Edge devices classify locally under the latency target and stream uncertainty
   and drift metrics back to GCP for selective retraining.
