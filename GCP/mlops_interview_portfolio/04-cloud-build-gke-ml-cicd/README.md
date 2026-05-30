# Cloud Build GKE ML CI/CD

This project shows a production-style CI/CD path for ML inference services on
GCP. It uses Cloud Build to test, build, push, and deploy a containerized model
serving API to GKE.

## What It Demonstrates

- Cloud Build pipeline design
- Artifact Registry image publishing
- GKE deployment rollout
- Kustomize overlays for environment promotion
- Smoke-test stage after deployment
- Clear separation of build, deploy, and verify stages

## Architecture

```mermaid
flowchart LR
    A[Git Push] --> B[Cloud Build Trigger]
    B --> C[Unit Tests]
    C --> D[Docker Build]
    D --> E[Artifact Registry]
    E --> F[GKE Cluster]
    G[Kustomize Overlay: dev/prod] --> F
    F --> H[Churn Inference Deployment]
    H --> I[Rollout Status Check]
    I --> J[Smoke Test]
    J --> K[Deployment Verified]
```

## Pipeline Flow

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant CB as Cloud Build
    participant AR as Artifact Registry
    participant GKE as GKE
    Dev->>CB: Push commit
    CB->>CB: Run unit tests
    CB->>AR: Build and push image
    CB->>GKE: Update deployment image
    GKE-->>CB: Rollout status
    CB->>GKE: Smoke test deployment
```

## Files

```text
cloudbuild.yaml
service/
  Dockerfile
  app.py
k8s/base/
k8s/overlays/dev/
k8s/overlays/prod/
terraform/
```

## Interview Talking Points

- This maps DevOps CI/CD knowledge into ML serving.
- The pipeline can be extended with model validation gates before deployment.
- Kustomize overlays mirror real environment promotion patterns.
- Smoke tests reduce failed rollout risk.
- Artifact Registry and GKE are native GCP choices for ML platform delivery.
