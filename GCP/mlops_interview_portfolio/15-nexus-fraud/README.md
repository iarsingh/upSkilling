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
