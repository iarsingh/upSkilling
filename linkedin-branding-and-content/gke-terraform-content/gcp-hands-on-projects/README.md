# GCP Hands-On Projects

This folder contains practical Go and Python projects for GCP, DevOps, Platform Engineering, and MLOps interview preparation.

## Projects

### Go Projects

- `go/cloud-run-health-api/` - Cloud Run-ready Go API with health, metadata, and request logging
- `go/pubsub-event-worker/` - Go Pub/Sub worker that consumes messages and logs structured events

### Python Projects

- `python/gcs-csv-etl/` - Python ETL job that reads CSV data from Cloud Storage and writes processed output
- `python/bigquery-cost-reporter/` - Python BigQuery reporting job for billing/cost-style analytics
- `python/secret-manager-fastapi/` - FastAPI service that reads secrets from Google Secret Manager

## Portfolio Goal

These projects are designed to help explain:

- Cloud Run deployment
- Docker image build and deploy
- Pub/Sub event-driven processing
- Cloud Storage ETL
- BigQuery analytics
- Secret Manager integration
- GCP IAM and service account usage
- GitHub Actions deployment readiness

## Suggested Build Order

1. `go/cloud-run-health-api`
2. `python/secret-manager-fastapi`
3. `go/pubsub-event-worker`
4. `python/gcs-csv-etl`
5. `python/bigquery-cost-reporter`

## Common GCP Setup

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
gcloud services enable run.googleapis.com artifactregistry.googleapis.com pubsub.googleapis.com storage.googleapis.com bigquery.googleapis.com secretmanager.googleapis.com
```

Create an Artifact Registry repository:

```bash
gcloud artifacts repositories create gcp-hands-on \
  --repository-format=docker \
  --location=us-central1 \
  --description="GCP hands-on project images"
```

## Interview Story

Use these projects to tell this story:

```text
I built multiple GCP projects using Go and Python, covering Cloud Run, Pub/Sub,
Cloud Storage, BigQuery, Secret Manager, Docker, and service-account based access.
These projects helped me practice production-style cloud workflows and explain
real debugging, deployment, IAM, and architecture tradeoffs.
```

