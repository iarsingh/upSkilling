# MLOps Interview Portfolio

This portfolio is designed for ML Platform, MLOps Infrastructure, and ML SRE
interviews. It connects a DevOps/platform engineering background with practical
MLOps responsibilities: Kubernetes platform design, CI/CD model promotion, and
production ML observability.

## Why These Projects

The projects map directly to common MLOps interview themes:

- Building Kubernetes-native ML platforms on GCP
- Promoting ML models safely using metrics, lineage, and approval gates
- Operating inference services with SLOs, alerts, and anomaly detection
- Using Terraform, Kubernetes, Python, and GitOps-style workflows together

## Projects

### 01. GKE ML Platform Blueprint

Path: `01-gke-ml-platform-blueprint`

A GCP/GKE platform blueprint for ML workloads. It includes Terraform,
Kubernetes manifests, autoscaling examples, and GitOps deployment structure.

Showcases:

- GKE-oriented ML platform architecture
- GCS artifact storage
- MLflow-style tracking service
- Real-time inference deployment
- HPA-based inference autoscaling
- GPU node pool blueprint
- GitOps-ready Kubernetes manifests

### 02. Model Promotion Gates

Path: `02-model-promotion-gates`

A Python CLI that simulates production model promotion from `candidate` to
`staging` or `production` using quality gates.

Showcases:

- MLflow/model-registry style promotion
- Accuracy, latency, and error-rate gates
- Approval-based production promotion
- JSON lineage registry
- CI-friendly tests

### 03. ML Observability SRE

Path: `03-ml-observability-sre`

A lightweight ML SRE toolkit for analyzing inference logs and producing SLO
signals.

Showcases:

- p95/p99 latency calculation
- Error-rate monitoring
- Drift score monitoring
- Burn-rate style alert decisions
- Interview-ready incident summary output

## Suggested Interview Story

Use these projects to explain your transition from DevOps to MLOps:

1. You already know how to run reliable platforms on Kubernetes.
2. You extended that platform skill into ML-specific concerns: model artifacts,
   model promotion, inference latency, and drift.
3. You can automate the lifecycle end to end: infrastructure, deployment,
   promotion, observability, and incident response.

## Local Validation

Run all Python tests:

```bash
python3 -m pytest GCP/mlops_interview_portfolio
```

Run the two Python project CLIs manually:

```bash
python3 GCP/mlops_interview_portfolio/02-model-promotion-gates/src/promotion_cli.py evaluate \
  --registry GCP/mlops_interview_portfolio/02-model-promotion-gates/examples/registry.json \
  --model-id churn-model-v3 \
  --target staging

python3 GCP/mlops_interview_portfolio/03-ml-observability-sre/src/ml_sre_report.py \
  --logs GCP/mlops_interview_portfolio/03-ml-observability-sre/examples/inference_logs.jsonl
```
