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
