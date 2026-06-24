# GCP Platform Engineering Showcase

Production-style platform engineering project built to demonstrate senior GCP, SRE, DevOps, Kubernetes, Terraform Enterprise, GitOps, CI/CD, security, and observability skills.

## Executive Summary

This repository implements a reusable production path from source code to a protected GKE workload:

```text
Developer commit
  -> GitHub Actions lint, test, Terraform validation, manifest render, image scan
  -> Artifact Registry immutable image
  -> Git commit updates the production Kustomize image
  -> ArgoCD detects main branch drift and syncs GKE
  -> GCE Ingress exposes the service through Cloud Armor
  -> Prometheus, Grafana, and Alertmanager monitor service health
  -> HPA scales pods during k6 load tests
```

The project is designed as a standalone GitHub repository. In this upskilling monorepo it lives under `gcp-platform-engineering-portfolio/`; when showcased independently, this directory becomes the repository root.

## Stack

- **Infrastructure:** Terraform, Terraform Enterprise, GCP Project Factory, VPC, Cloud NAT, GKE, IAM, Artifact Registry, Cloud Armor
- **GitOps:** ArgoCD, Kustomize, `main` as the production desired-state branch
- **CI/CD:** GitHub Actions, Workload Identity Federation, Docker, Trivy
- **Application:** Python, FastAPI, Prometheus client
- **Observability:** kube-prometheus-stack, PrometheusRule, Grafana dashboard, Alertmanager
- **Reliability:** HPA, PDB, probes, resource controls, NetworkPolicy, k6

## Architecture Decisions

| Decision | Reason |
| --- | --- |
| Regional private GKE cluster | Regional control plane and private nodes improve availability and reduce direct node exposure. |
| Workload Identity | Avoids long-lived service-account keys inside Kubernetes. |
| Git as deployment authority | CI publishes images but production changes only when the GitOps manifest changes. |
| Immutable image tag | Every deployment maps to a Git commit SHA and can be rolled back deterministically. |
| Cloud Armor at GCE Ingress | Adds WAF protection and IP-based rate limiting before traffic reaches pods. |
| HPA plus cluster autoscaling | Pod and node capacity can grow independently under sustained demand. |
| ServiceMonitor and PrometheusRule | Application metrics, alerts, and runbook links are version controlled. |
| Terraform Enterprise workspace | Provides remote execution, state locking, policy hooks, RBAC, and auditable plans. |

See [Architecture](docs/architecture.md) for the detailed flow and trust boundaries.

## Repository Structure

```text
.
├── .github/workflows/platform-ci.yml
├── app/
├── argocd/
├── docs/
├── k8s/
│   ├── base/
│   └── overlays/{dev,prod}/
├── load-test/
├── observability/
├── scripts/
├── security/
└── terraform/
    ├── environments/{dev,prod}/
    ├── modules/
    └── terraform-enterprise/
```

## Delivery Workflow

### Pull request

1. Ruff lint and Pytest.
2. Terraform formatting and validation.
3. Production Kustomize rendering.
4. Docker build.
5. Trivy high/critical vulnerability gate.

### Main branch

1. GitHub authenticates to GCP using Workload Identity Federation.
2. The pipeline pushes `${GITHUB_SHA}` to Artifact Registry.
3. Kustomize updates the production image reference.
4. The pipeline commits the desired-state change to `main`.
5. ArgoCD automatically syncs and prunes the production namespace.

Required GitHub configuration:

| Type | Name | Example |
| --- | --- | --- |
| Variable | `GCP_PROJECT_ID` | `platform-prod-12345` |
| Secret | `GCP_WORKLOAD_IDENTITY_PROVIDER` | `projects/.../providers/github` |
| Secret | `GCP_DEPLOY_SERVICE_ACCOUNT` | `github-deployer@...iam.gserviceaccount.com` |
| Secret, optional | `GITOPS_TOKEN` | Fine-grained token when branch protection blocks `GITHUB_TOKEN` |

## Provision Infrastructure

```bash
cd terraform/environments/prod
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform plan
terraform apply
```

Set `create_project = true` only when the executing identity can create projects and attach billing. The safer default uses an existing project and still enables required APIs.

For Terraform Enterprise, follow [Terraform Enterprise Setup](docs/terraform-enterprise.md).

## Install ArgoCD and Deploy

Replace `YOUR_GITHUB_USERNAME` in `argocd/project.yaml`, `argocd/platform-sample-api.yaml`, and `argocd/observability-config.yaml`, then run:

```bash
gcloud container clusters get-credentials platform-prod-gke \
  --region us-central1 \
  --project YOUR_PROJECT_ID

./scripts/bootstrap-argocd.sh
kubectl apply -f argocd/project.yaml
kubectl apply -f argocd/monitoring-stack.yaml
kubectl apply -f argocd/observability-config.yaml
kubectl apply -f argocd/platform-sample-api.yaml
```

Update these production placeholders before the first sync:

- GCP service account annotation in `k8s/base/service-account.yaml`
- `PROJECT_ID` image path in `k8s/overlays/prod/kustomization.yaml`

## Verify the Platform

```bash
kubectl get applications -n argocd
kubectl get pods,svc,ingress,hpa,pdb -n platform-demo
kubectl get prometheusrules -n monitoring
kubectl describe backendconfig platform-sample-api -n platform-demo
```

Run the complete local/static validation:

```bash
make setup
make validate
```

## Demonstrate Autoscaling

```bash
BASE_URL="https://YOUR_INGRESS_IP" k6 run load-test/k6.js
./scripts/watch-autoscaling.sh
```

Expected evidence:

1. Request rate and CPU rise in Grafana.
2. HPA desired replicas increase from 3 toward 6.
3. Deployment replicas become available without failed readiness checks.
4. Replicas scale down only after the 300-second stabilization window.

Document screenshots and results using [HPA Test Evidence](docs/hpa-test-results.md).

## Observability

The dashboard covers:

- Request rate by endpoint
- 5xx error ratio
- p95 latency
- Pod CPU and memory
- HPA desired/current replicas
- Pod restarts
- Deployment availability

Alerts link directly to sections in the [Troubleshooting Runbook](docs/troubleshooting-runbook.md).

## Interview Talking Point

> I built a GCP platform engineering reference implementation where Terraform Enterprise provisions a private regional GKE foundation, GitHub Actions produces immutable and scanned images, and ArgoCD promotes the `main` branch desired state to production. I attached Cloud Armor at ingress, used Workload Identity instead of keys, and added Prometheus/Grafana monitoring with HPA load-test evidence. The design separates CI from deployment authority, supports deterministic rollback, and gives application teams a repeatable golden path.

See [Interview Explanation](docs/interview-explanation.md) for deeper questions and tradeoffs.

## Days 21-45 Build Plan

The implementation plan and evidence checklist are tracked in [Days 21-45 Plan](docs/days-21-45-plan.md).

## Cost and Safety

- GKE, external load balancing, Cloud NAT, and monitoring create billable resources.
- Start with the development environment and destroy unused infrastructure.
- Artifact Registry cleanup is initially dry-run.
- Production GKE deletion protection is enabled.
- Never commit `.tfvars`, credentials, Terraform state, or generated kubeconfig files.
