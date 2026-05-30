# GCP MLOps Interview Portfolio

This portfolio is built for ML Platform, MLOps Infrastructure, and ML SRE
interviews. It is intentionally aligned with a DevOps-to-MLOps transition story:
strong Kubernetes, CI/CD, Terraform, GCP, observability, and automation
experience applied to ML systems.

## Positioning

Use this repository section to show that you can move beyond traditional DevOps
and operate the full ML platform lifecycle:

- Provision GCP infrastructure with Terraform
- Run ML workloads on GKE
- Build CI/CD pipelines for model serving services
- Promote models with quality and approval gates
- Monitor inference reliability, drift, and latency
- Automate incident triage using Pub/Sub-driven workflows
- Explain SLOs, GitOps, model lineage, and production readiness

## Project Index

| # | Project | Focus Area | Main GCP/Platform Skills |
|---|---|---|---|
| 01 | GKE ML Platform Blueprint | Platform architecture | GKE, Terraform, GCS, GPU node pools, Helm/GitOps style manifests |
| 02 | Model Promotion Gates | Model lifecycle | MLflow-style registry, approval gates, lineage, Python automation |
| 03 | ML Observability SRE | Reliability engineering | p99 latency, error rate, drift, Prometheus alerts, SLO reporting |
| 04 | Cloud Build GKE ML CI/CD | Delivery automation | Cloud Build, Artifact Registry, GKE rollout, Kustomize overlays |
| 05 | Vertex AI Monitoring Blueprint | Managed MLOps | Vertex AI monitoring concepts, BigQuery logs, Pub/Sub alerts |
| 06 | Pub/Sub ML Incident Automation | Incident response | Pub/Sub, Cloud Function style routing, runbooks, severity mapping |

## 01. GKE ML Platform Blueprint

Path: `01-gke-ml-platform-blueprint`

A GCP/GKE platform blueprint for ML workloads. It includes Terraform,
Kubernetes manifests, autoscaling examples, an MLflow tracking deployment, an
inference service, and GitOps-ready ArgoCD application config.

Showcases:

- GKE-oriented ML platform architecture
- GCS model artifact storage
- MLflow-style tracking service
- Real-time inference deployment
- HPA-based inference autoscaling
- GPU node pool blueprint
- GitOps-ready Kubernetes manifests

Interview angle:

> "I can design and operate the Kubernetes foundation that ML teams need for
> repeatable training, serving, and promotion workflows."

## 02. Model Promotion Gates

Path: `02-model-promotion-gates`

A Python CLI that simulates model promotion from `candidate` to `staging` or
`production` using quality gates.

Showcases:

- MLflow/model-registry style promotion
- Accuracy, latency, and error-rate gates
- Approval-based production promotion
- JSON lineage registry
- CI-friendly tests

Interview angle:

> "I understand that MLOps is not just deploying containers. Model releases need
> metrics, lineage, approval, and rollback-safe promotion."

## 03. ML Observability SRE

Path: `03-ml-observability-sre`

A lightweight ML SRE toolkit for analyzing inference logs and producing SLO
signals.

Showcases:

- p95/p99 latency calculation
- Error-rate monitoring
- Drift score monitoring
- Burn-rate style alert decisions
- Prometheus alert rule examples
- Interview-ready incident summary output

Interview angle:

> "I can apply SRE practices to ML systems, including latency, availability, and
> model-quality signals like drift."

## 04. Cloud Build GKE ML CI/CD

Path: `04-cloud-build-gke-ml-cicd`

A GCP-native CI/CD pipeline for an ML inference service. It includes Cloud
Build stages, a simple Python inference API, Dockerfile, Artifact Registry
Terraform, and Kustomize overlays for dev/prod promotion.

Showcases:

- Cloud Build pipeline design
- Docker image build and push
- Artifact Registry repository provisioning
- GKE deployment rollout
- Smoke-test stage after deployment
- Kustomize environment overlays

Interview angle:

> "I can convert traditional CI/CD experience into ML serving pipelines that
> build, deploy, verify, and promote inference services safely."

## 05. Vertex AI Monitoring Blueprint

Path: `05-vertex-ai-monitoring-blueprint`

A managed GCP MLOps monitoring blueprint with policy validation. It models
Vertex AI monitoring concepts, BigQuery prediction logging, and Pub/Sub alert
routing.

Showcases:

- Vertex AI endpoint monitoring design
- Feature drift and prediction drift thresholds
- BigQuery monitoring dataset
- Pub/Sub alert topic
- Version-controlled monitoring policies
- Python validation CLI

Interview angle:

> "I know when to use managed Vertex AI monitoring and how to connect it with
> data, alerting, and incident response systems."

## 06. Pub/Sub ML Incident Automation

Path: `06-pubsub-ml-incident-automation`

A Cloud Function-style alert router for ML incidents. It reads Pub/Sub-style
alert payloads, maps them to owners and runbooks, and produces incident
summaries.

Showcases:

- Pub/Sub-driven alert routing
- Cloud Function-compatible Python handler
- Runbook mapping by alert type
- Severity classification
- Incident response recommendations
- Terraform topic/subscription foundation

Interview angle:

> "I can close the loop from monitoring to actionable operations by automating
> incident triage and runbook routing."

## How To Validate

Run all Python tests:

```bash
python3 -m pytest GCP/mlops_interview_portfolio
```

Run Terraform formatting checks:

```bash
terraform -chdir=GCP/mlops_interview_portfolio/01-gke-ml-platform-blueprint/terraform fmt -check
terraform -chdir=GCP/mlops_interview_portfolio/04-cloud-build-gke-ml-cicd/terraform fmt -check
terraform -chdir=GCP/mlops_interview_portfolio/05-vertex-ai-monitoring-blueprint/terraform fmt -check
terraform -chdir=GCP/mlops_interview_portfolio/06-pubsub-ml-incident-automation/terraform fmt -check
```

Run CLI demos:

```bash
python3 GCP/mlops_interview_portfolio/02-model-promotion-gates/src/promotion_cli.py evaluate \
  --registry GCP/mlops_interview_portfolio/02-model-promotion-gates/examples/registry.json \
  --model-id churn-model-v3 \
  --target staging

python3 GCP/mlops_interview_portfolio/03-ml-observability-sre/src/ml_sre_report.py \
  --logs GCP/mlops_interview_portfolio/03-ml-observability-sre/examples/inference_logs.jsonl

python3 GCP/mlops_interview_portfolio/05-vertex-ai-monitoring-blueprint/src/monitoring_policy.py validate \
  --policy GCP/mlops_interview_portfolio/05-vertex-ai-monitoring-blueprint/examples/model_monitoring_policy.json

python3 GCP/mlops_interview_portfolio/06-pubsub-ml-incident-automation/src/incident_router.py \
  --alert GCP/mlops_interview_portfolio/06-pubsub-ml-incident-automation/examples/model_drift_alert.json \
  --runbooks GCP/mlops_interview_portfolio/06-pubsub-ml-incident-automation/config/runbooks.json
```

## Resume Alignment

These projects support the following resume themes:

- GKE operations and Kubernetes-native ML platforms
- Terraform-based infrastructure automation
- GitOps and CI/CD delivery practices
- MLflow-style model promotion and lineage
- Vertex AI and GCP-native MLOps design
- Observability with SLOs and alerting
- Python automation for platform and incident workflows
- DevOps-to-MLOps transition with production reliability focus

## How To Present In Interviews

Suggested narrative:

1. "My background is strong DevOps and platform engineering."
2. "I extended that into MLOps by focusing on the infrastructure ML teams need:
   GKE, artifact storage, model promotion, monitoring, and incident response."
3. "These projects show the path from platform foundation to production model
   operations."
4. "I can support both sides: reliable Kubernetes platforms and ML-specific
   delivery concerns like drift, lineage, and model gates."
