# AdStream

High-throughput streaming ad-recommendation and GitOps feature infrastructure.

AdStream is a DevOps and MLOps hybrid platform for real-time behavioral feature
computation and low-latency ad recommendation. It validates blue/green Dataflow
pipeline delivery, Vertex AI Feature Store online/offline paths, Cloud Build
feature/model tests, Cloud Deploy promotion, and SLO-based rollback controls.

## What It Demonstrates

- Terraform-managed Pub/Sub, Dataflow, Bigtable, BigQuery, and Feature Store
  infrastructure
- Cloud Deploy blue/green rollout for Apache Beam/Dataflow jobs
- Cloud Build treating features and models as code
- Ephemeral Dataflow integration tests for schema validation
- Vertex AI Feature Store online path backed by Bigtable
- BigQuery offline path for historical training
- Custom SLOs for latency, error rate, and rollback automation
- 50,000+ requests-per-second production readiness gates

## Run

```bash
python3 src/ad_stream_gate.py evaluate \
  --release examples/streaming_release.json
```

## Interview Talking Points

- Streaming MLOps requires CI/CD for both data pipelines and models.
- Feature engineering changes need the same testing discipline as application
  code.
- Blue/green Dataflow deployment reduces risk when changing live feature
  pipelines.
- Online/offline feature parity is critical for ad ranking systems.

## Interview Architecture

Explain this as real-time feature infrastructure for ad ranking. Pub/Sub
receives clickstream events, Dataflow computes features, Vertex AI Feature
Store coordinates online/offline feature definitions, Bigtable serves online
features, BigQuery stores historical features, and Cloud Deploy promotes
streaming pipelines with blue/green safety.

## Interview Flow

1. Clickstream events arrive in Pub/Sub.
2. Dataflow transforms events into behavioral features.
3. Online features are written to Bigtable-backed serving paths, while offline
   features land in BigQuery for training.
4. Feature or model code changes trigger Cloud Build tests and ephemeral
   Dataflow validation jobs.
5. Cloud Deploy promotes blue/green pipeline versions and Cloud Monitoring SLOs
   trigger rollback if latency or errors spike.
