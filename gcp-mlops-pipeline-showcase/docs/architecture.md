# Architecture and Decisions

## Training Plane

The training image can run in three places:

1. Locally for development.
2. As the initial Kubernetes Job for direct MLflow connectivity.
3. As a Vertex AI CustomJob after a drift event.

The exact same training module produces the model, evaluation metrics, and feature baseline. This reduces training-serving skew and makes retraining reproducible.

## MLflow

MLflow runs on GKE because the project is intended to show open-source platform ownership.

- Cloud SQL PostgreSQL stores run metadata.
- Cloud Storage stores models, metrics, and baseline artifacts.
- Cloud SQL Auth Proxy avoids exposing database credentials or IP allowlists to MLflow.
- Workload Identity grants the pod access to GCS and Cloud SQL without a JSON key.

For a larger platform, MLflow would run behind internal ingress with SSO and multiple replicas.

## Serving

Two serving paths demonstrate different operating models:

- **FastAPI Deployment:** predictable Kubernetes Deployment with CPU-based HPA.
- **KServe InferenceService:** KServe V2 protocol and concurrency-based Knative autoscaling.

Both use the same image and model artifact. The API loads `MODEL_URI` at startup and exposes health, readiness, prediction, KServe V2, and Prometheus endpoints.

## Monitoring

Operational signals:

- Request rate
- Error rate
- p95 inference latency
- Batch throughput
- Pod/HPA state

ML-specific signals:

- Feature PSI per input feature
- Maximum and mean PSI
- Prediction sample volume
- Model version attached to prediction events

Drift reports are immutable JSON artifacts in GCS, which provides an audit trail even when no retraining occurs.

## Continuous Training

The drift CronJob publishes only when:

- Minimum sample count is met.
- Maximum feature PSI exceeds the configured threshold.

Pub/Sub decouples detection from training. Its push subscription uses an OIDC identity to call Cloud Run. Cloud Run then submits a non-blocking Vertex AI CustomJob under a dedicated training service account.

The retraining event does not automatically replace production. A mature implementation adds evaluation and promotion gates before changing the serving model URI.

## Security Boundaries

- GitHub Actions uses Workload Identity Federation.
- GKE pods use Workload Identity.
- Cloud Run accepts authenticated Pub/Sub invocations only.
- Vertex AI runs under a dedicated service account.
- Containers run as non-root with dropped Linux capabilities.
- Cloud SQL credentials live in a Kubernetes Secret, not source control.

## Tradeoffs

### GCS prediction logging

Writing one object per request is intentionally simple and visible for a portfolio demo. High-volume production systems should batch events through Pub/Sub/Dataflow into BigQuery or partitioned object files.

### PSI

PSI is explainable and inexpensive, but it does not detect every distribution change. Production monitoring may add KS tests, Wasserstein distance, schema checks, model-quality monitoring, and delayed-label performance metrics.

### Vertex AI and MLflow

Initial GKE training logs directly to MLflow. Vertex AI retraining writes governed artifacts to GCS. Exposing MLflow privately to Vertex AI would require shared VPC/private routing or a secure external endpoint; this repository avoids pretending cluster-only DNS is reachable from managed training.
