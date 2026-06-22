# Hands-On Projects

Build these projects for portfolio and interviews. Keep every project in GitHub with a strong README.

## Ready Project Skeletons

GCP Go and Python project skeletons are available here:

```text
../gcp-hands-on-projects/
```

Included projects:

- Go Cloud Run health API
- Go Pub/Sub event worker
- Python GCS CSV ETL job
- Python BigQuery cost reporter
- Python Secret Manager FastAPI service

## Project 1: Dockerized Web App with CI/CD

Goal: show Docker and GitHub Actions basics.

Build:

- Simple Python FastAPI or Node.js app
- Dockerfile
- GitHub Actions workflow
- Docker image build
- Image push to registry

README must include:

- Architecture
- Local run commands
- Docker build/run commands
- CI/CD workflow explanation
- Screenshot of successful workflow

Interview story:

- "I containerized an app and automated build validation using GitHub Actions."

## Project 2: GCP Network with Terraform

Goal: show Terraform and GCP fundamentals.

Build:

- VPC
- Subnets
- Firewall rules
- Cloud NAT
- Cloud Storage bucket for remote state
- Dev and prod variable files

README must include:

- Architecture diagram
- Terraform commands
- Variable explanation
- State management explanation
- Teardown steps

Interview story:

- "I used Terraform to create reusable GCP infrastructure with environment separation."

## Project 3: Private GKE Cluster with Terraform

Goal: show GKE platform engineering skill.

Build:

- Private GKE cluster
- Node pool
- IAM service accounts
- Workload Identity
- Artifact Registry
- Basic Kubernetes namespace

README must include:

- Private cluster explanation
- Security decisions
- Terraform module structure
- Commands to deploy
- Common troubleshooting notes

Interview story:

- "I provisioned a secure GKE platform using Terraform and least-privilege IAM."

## Project 4: Kubernetes App Deployment on GKE

Goal: show Kubernetes production basics.

Build:

- Deployment
- Service
- ConfigMap
- Secret
- Readiness probe
- Liveness probe
- Requests and limits
- HPA
- PDB
- Ingress

README must include:

- Kubernetes object explanation
- `kubectl` commands
- Scaling test
- Debugging steps
- Rollback steps

Interview story:

- "I deployed and operated a production-style Kubernetes app on GKE."

## Project 5: Monitoring and Alerting Stack

Goal: show SRE and observability basics.

Build:

- Prometheus
- Grafana
- Sample dashboard
- Basic alert rule
- App metrics endpoint

README must include:

- Metrics collected
- Dashboard screenshot
- Alert explanation
- SLI/SLO notes

Interview story:

- "I built basic observability for a Kubernetes workload using metrics and dashboards."

## Project 6: MLflow Experiment Tracking

Goal: show MLOps foundation.

Build:

- Simple ML training script
- MLflow experiment tracking
- Parameters, metrics, and artifact logging
- Local MLflow UI
- Saved model artifact

README must include:

- Dataset used
- Training command
- MLflow screenshots
- Metrics explanation
- Model artifact location

Interview story:

- "I tracked ML experiments and compared model versions using MLflow."

## Project 7: Model Serving on Kubernetes

Goal: show real MLOps deployment skill.

Build:

- FastAPI model API
- Dockerfile
- Kubernetes deployment
- Service
- HPA
- GitHub Actions build pipeline

README must include:

- API contract
- Example request/response
- Docker commands
- Kubernetes deployment commands
- Rollback strategy

Interview story:

- "I deployed an ML model as an API on Kubernetes with CI/CD."

## Project 8: End-to-End Mini MLOps Platform

Goal: final portfolio project.

Build:

- Terraform GKE infrastructure
- Artifact Registry
- MLflow tracking
- Model training
- Model serving API
- Kubernetes deployment
- GitHub Actions CI/CD
- Basic monitoring

README must include:

- Full architecture diagram
- Component explanation
- Setup steps
- Deployment steps
- Monitoring steps
- Failure and rollback scenarios

Interview story:

- "I built an end-to-end MLOps platform on GCP using Terraform, GKE, MLflow, Docker, and GitHub Actions."

## Project Priority

If switch is urgent, build in this order:

1. Dockerized app with CI/CD
2. GCP network with Terraform
3. Private GKE cluster with Terraform
4. Kubernetes app deployment on GKE
5. Model serving on Kubernetes
6. End-to-end mini MLOps platform
