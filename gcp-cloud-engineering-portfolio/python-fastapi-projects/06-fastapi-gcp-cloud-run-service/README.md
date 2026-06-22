# Project 06: FastAPI GCP Cloud Run Service

## Skill
Cloud Run deployment, Docker, Cloud Build, health checks, environment config, and stateless APIs.

## Run Locally

```sh
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Build

```sh
docker build -t fastapi-cloud-run .
docker run -p 8080:8080 fastapi-cloud-run
```

## Deploy With Cloud Build

```sh
gcloud builds submit --config cloudbuild.yaml
```

