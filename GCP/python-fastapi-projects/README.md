# Python FastAPI Project Portfolio

This folder contains separate FastAPI projects for cloud engineer, DevOps engineer, DevSecOps engineer, and MLOps engineer practice.

The projects are GCP-friendly and designed to run locally first, then deploy to Cloud Run, GKE, or CI/CD pipelines.

## Projects

- `00-fastapi-basics-health-api`: Basic FastAPI health and metadata API.
- `01-fastapi-crud-service`: In-memory CRUD service with Pydantic models.
- `02-fastapi-auth-rbac-api`: API key authentication and role-based authorization.
- `03-fastapi-observability-api`: Structured logging, request IDs, metrics endpoint, and readiness checks.
- `04-fastapi-background-jobs`: Background task processing pattern.
- `05-fastapi-ml-inference-api`: Simple ML-style inference API with validation.
- `06-fastapi-gcp-cloud-run-service`: Cloud Run-ready FastAPI service with Docker and Cloud Build.
- `07-fastapi-kubernetes-ready-api`: Kubernetes-ready API with probes, config, and manifests.
- `08-fastapi-devops-release-api`: Release metadata and deployment gate API.
- `09-fastapi-mlops-model-registry-api`: Lightweight model registry and promotion API.

## Common Commands

Run any project:

```sh
cd 00-fastapi-basics-health-api
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Validate Python syntax for all projects:

```sh
make validate
```

## Interview Evidence

- FastAPI Swagger UI screenshot.
- Docker build output.
- Cloud Run or GKE deployment output.
- Health check and readiness output.
- API request/response examples.
- CI/CD pipeline screenshot.

