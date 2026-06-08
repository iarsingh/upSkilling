# Python Project: Secret Manager FastAPI

## Goal

Build a FastAPI service that reads a secret from Google Secret Manager.

## GCP Services

- Secret Manager
- Cloud Run
- Artifact Registry
- Cloud Logging

## Create a Secret

```bash
PROJECT_ID="YOUR_PROJECT_ID"
SECRET_ID="demo-api-key"

printf "super-secret-value" | gcloud secrets create "$SECRET_ID" \
  --data-file=- \
  --replication-policy=automatic
```

## Local Run

```bash
pip install -r requirements.txt

export PROJECT_ID="YOUR_PROJECT_ID"
export SECRET_ID="demo-api-key"

uvicorn main:app --reload --port 8080
```

Open:

```text
http://localhost:8080/healthz
http://localhost:8080/secret-metadata
```

## Docker Run

```bash
docker build -t secret-manager-fastapi .
docker run --rm -p 8080:8080 \
  -e PROJECT_ID="$PROJECT_ID" \
  -e SECRET_ID="$SECRET_ID" \
  secret-manager-fastapi
```

## Deploy to Cloud Run

```bash
PROJECT_ID="YOUR_PROJECT_ID"
REGION="us-central1"
IMAGE="$REGION-docker.pkg.dev/$PROJECT_ID/gcp-hands-on/secret-manager-fastapi:latest"

gcloud builds submit --tag "$IMAGE"

gcloud run deploy secret-manager-fastapi \
  --image "$IMAGE" \
  --region "$REGION" \
  --allow-unauthenticated \
  --set-env-vars PROJECT_ID="$PROJECT_ID",SECRET_ID="demo-api-key"
```

## Interview Talking Points

- Why secrets should not be stored in code
- Secret Manager IAM permissions
- Cloud Run service accounts
- Environment variables vs secret values
- Safe secret metadata exposure

