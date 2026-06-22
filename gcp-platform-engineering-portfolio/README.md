# GCP Platform Engineering Portfolio Project

Production-style platform engineering project for explaining DevOps, Platform Engineering, GCP, Kubernetes, Terraform, CI/CD, security, observability, and MLOps-ready infrastructure in interviews.

## Project Pitch

This project designs a self-service cloud platform on GCP where application teams can deploy containerized services safely and consistently.

It demonstrates:

- GCP landing zone thinking
- Terraform-based infrastructure provisioning
- GKE workload deployment
- Kubernetes guardrails
- CI/CD pipeline structure
- Cloud security controls
- Observability and incident readiness
- MLOps-ready service deployment patterns

## Interview Summary

In interviews, explain it like this:

```text
I designed a GCP platform engineering reference project that shows how a platform team can provide reusable infrastructure for application teams.

The platform uses Terraform for GCP foundations, GKE for container workloads, Kubernetes manifests for deployment standards, GitHub Actions for CI/CD validation, and Prometheus/Grafana-style observability patterns.

The goal is to reduce manual provisioning, enforce security guardrails, standardize deployments, and make services easier to monitor and operate.
```

## Architecture

```text
Developer
   |
   v
GitHub Repository
   |
   v
CI/CD Pipeline
   |-- lint Terraform
   |-- validate Kubernetes YAML
   |-- build container image
   |-- security checks
   |
   v
Artifact Registry
   |
   v
GKE Cluster
   |-- namespace per environment/team
   |-- resource requests and limits
   |-- readiness and liveness probes
   |-- HPA
   |-- service account and RBAC
   |
   v
Cloud Load Balancer + Cloud Armor
   |
   v
Users

Observability:
GKE metrics -> Prometheus/Grafana style dashboards
App logs -> Cloud Logging / ELK pattern
Alerts -> Runbooks and incident response
```

## Repository Structure

```text
.
├── README.md
├── docs/
│   ├── architecture.md
│   ├── interview-explanation.md
│   ├── production-checklist.md
│   └── troubleshooting-runbook.md
├── terraform/
│   ├── environments/dev/
│   ├── environments/prod/
│   └── modules/
│       ├── network/
│       ├── iam/
│       ├── gke/
│       └── artifact-registry/
├── k8s/
│   ├── base/
│   └── overlays/
│       ├── dev/
│       └── prod/
├── app/
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── observability/
│   ├── prometheus-rules.yaml
│   └── grafana-dashboard-notes.md
├── security/
│   └── security-controls.md
└── .github/workflows/platform-ci.yml
```

## What This Project Proves

| Skill | Where It Is Demonstrated |
| --- | --- |
| Terraform | `terraform/` modules and environments |
| GCP | GKE, IAM, network, Artifact Registry patterns |
| Kubernetes | `k8s/` deployment, service, HPA, probes |
| CI/CD | `.github/workflows/platform-ci.yml` |
| Security | Cloud Armor, IAM, RBAC, image scanning notes |
| Observability | Prometheus rules and Grafana notes |
| Python | sample FastAPI service |
| Platform Engineering | self-service, guardrails, reusable modules |
| MLOps readiness | model-serving friendly API pattern |

## Demo Commands

Local app:

```bash
cd app
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8080
```

Docker:

```bash
docker build -t platform-sample-api:local ./app
docker run -p 8080:8080 platform-sample-api:local
```

Kubernetes dry-run:

```bash
kubectl apply --dry-run=client -f k8s/base/
```

Terraform validation:

```bash
cd terraform/environments/dev
terraform init
terraform validate
terraform plan
```

## Endpoints

- `GET /health`: service health
- `GET /ready`: readiness check
- `GET /metrics`: sample Prometheus-style metrics
- `POST /predict`: MLOps-style placeholder endpoint

## How To Explain Business Impact

- Reduced provisioning effort through reusable Terraform modules.
- Improved deployment consistency using Kubernetes guardrails.
- Improved developer productivity through self-service infrastructure workflow.
- Improved reliability using probes, autoscaling, observability, and runbooks.
- Improved security posture using IAM, RBAC, Cloud Armor, and policy checks.

