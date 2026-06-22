# Architecture

## Goal

Design a reusable GCP platform where application teams can deploy services without manually creating cloud infrastructure each time.

## Components

## 1. GCP Foundation

Includes:

- Project structure
- Shared VPC pattern
- Subnets
- IAM service accounts
- Artifact Registry
- GKE cluster
- Cloud Armor protection
- Monitoring and logging hooks

## 2. Terraform Layer

Terraform is used for repeatable infrastructure provisioning.

Design principles:

- reusable modules
- environment-specific variables
- remote state ready
- labels and naming standards
- least-privilege IAM
- plan before apply

## 3. Kubernetes Platform Layer

Includes:

- namespaces
- deployments
- services
- config maps
- service accounts
- HPA
- readiness and liveness probes
- resource requests and limits

## 4. CI/CD Layer

Pipeline stages:

1. lint
2. test
3. Terraform validate
4. Kubernetes manifest validation
5. Docker build
6. security checks
7. deployment approval

## 5. Observability Layer

Signals:

- API latency
- error rate
- request count
- pod restarts
- CPU and memory
- deployment health

## Architecture Flow

```text
Code commit
  -> CI validation
  -> Docker image build
  -> Artifact Registry
  -> Kubernetes deployment
  -> HPA and probes manage runtime health
  -> Metrics/logs feed observability
  -> Alerts trigger runbooks
```

