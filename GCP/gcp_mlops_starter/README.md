# GCP MLOps Starter

A lightweight MLOps project for Google Cloud Platform. It combines Terraform
infrastructure with a Python training pipeline that creates model artifacts and
metrics for a customer churn prediction use case.

## What This Project Builds

Terraform provisions:

- A raw data bucket
- A versioned model artifacts bucket
- A BigQuery dataset for feature data
- A Pub/Sub topic for model lifecycle events
- A service account for pipeline execution

Python provides:

- Synthetic churn dataset generation
- A small Gaussian Naive Bayes training pipeline
- Model and metrics artifact generation
- Optional artifact upload to GCS

## Use Case

This project simulates a practical MLOps workflow:

1. Provision cloud infrastructure with Terraform.
2. Generate or ingest customer churn training data.
3. Train a model locally or in CI.
4. Store model artifacts and metrics.
5. Upload artifacts to GCS for deployment or review.
6. Use Pub/Sub as an event hook for downstream automation.

It is intentionally small so it can be understood, modified, and deployed
without needing expensive managed training jobs.

## Project Layout

```text
.
├── README.md
├── pyproject.toml
├── requirements.txt
├── src/gcp_mlops_starter/
│   ├── cli.py
│   ├── config.py
│   ├── data.py
│   ├── gcs.py
│   ├── model.py
│   └── pipeline.py
├── terraform/
│   ├── backend.tf
│   ├── main.tf
│   ├── outputs.tf
│   └── variables.tf
└── tests/
```

## Prerequisites

- Python 3.10+
- Terraform 1.0+
- Google Cloud SDK
- A GCP project with billing enabled
- Application Default Credentials configured

Authenticate:

```bash
gcloud auth login
gcloud auth application-default login
gcloud config set project YOUR_PROJECT_ID
```

## Local Setup

```bash
cd GCP/gcp_mlops_starter
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip install -e .
```

Run tests:

```bash
python -m pytest
```

## Train Locally

```bash
python -m gcp_mlops_starter.cli train \
  --project-id YOUR_PROJECT_ID \
  --region us-central1 \
  --rows 500
```

This writes:

```text
data/churn.csv
artifacts/model.json
artifacts/metrics.json
```

## Terraform Deployment

Create or reuse a remote state bucket:

```bash
export PROJECT_ID="your-gcp-project-id"
export REGION="us-central1"
export TF_STATE_BUCKET="${PROJECT_ID}-mlops-tf-state"

gcloud storage buckets create "gs://${TF_STATE_BUCKET}" \
  --project="${PROJECT_ID}" \
  --location="${REGION}" \
  --uniform-bucket-level-access
```

Initialize Terraform:

```bash
terraform -chdir=terraform init \
  -reconfigure \
  -backend-config="bucket=${TF_STATE_BUCKET}" \
  -backend-config="prefix=mlops/state"
```

Plan:

```bash
terraform -chdir=terraform plan \
  -var="project_id=${PROJECT_ID}" \
  -var="region=${REGION}"
```

Apply:

```bash
terraform -chdir=terraform apply \
  -auto-approve \
  -var="project_id=${PROJECT_ID}" \
  -var="region=${REGION}"
```

Show outputs:

```bash
terraform -chdir=terraform output
```

## Upload Model Artifacts

After training and applying Terraform:

```bash
MODEL_BUCKET="$(terraform -chdir=terraform output -raw model_artifacts_bucket)"

python -m gcp_mlops_starter.cli upload-artifacts \
  --bucket "${MODEL_BUCKET}" \
  --artifact-dir artifacts \
  --prefix models/customer-churn
```

## Benefits

- Reproducible cloud infrastructure with Terraform
- Simple model training pipeline that can run locally or in CI
- Clear separation between data, model artifacts, and infrastructure
- GCS-backed model artifact storage
- BigQuery-ready foundation for feature data
- Pub/Sub hook for future event-driven automation

## Notes

The training model is intentionally lightweight and dependency-minimal. It is
designed to demonstrate the MLOps workflow, not to maximize predictive
performance.
