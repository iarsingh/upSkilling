# Go Project: Cloud Run Health API

## Goal

Build a small Go API that can run locally, inside Docker, and on Cloud Run.

## GCP Services

- Cloud Run
- Artifact Registry
- Cloud Logging

## Endpoints

- `GET /` - service info
- `GET /healthz` - health check
- `GET /metadata` - runtime metadata from environment variables

## Local Run

```bash
go run .
```

Open:

```text
http://localhost:8080/healthz
```

## Docker Run

```bash
docker build -t cloud-run-health-api .
docker run --rm -p 8080:8080 cloud-run-health-api
```

## Deploy to Cloud Run

```bash
PROJECT_ID="YOUR_PROJECT_ID"
REGION="us-central1"
IMAGE="$REGION-docker.pkg.dev/$PROJECT_ID/gcp-hands-on/cloud-run-health-api:latest"

gcloud builds submit --tag "$IMAGE"

gcloud run deploy cloud-run-health-api \
  --image "$IMAGE" \
  --region "$REGION" \
  --allow-unauthenticated \
  --set-env-vars APP_ENV=prod
```

## Interview Talking Points

- Why Cloud Run is useful for containerized services
- How health endpoints help platform teams
- How environment variables configure services
- How Cloud Run sends logs to Cloud Logging

