# GCP Terraform Automation

Python and Terraform automation for provisioning a small Google Cloud Platform
environment with remote Terraform state, validation helpers, and a Click-based
CLI wrapper.

## What It Deploys

This project currently manages:

- A GCS bucket for Terraform remote state
- A GCS bucket for application artifacts
- A service account for automation workflows
- A Pub/Sub topic for automation events

Terraform state is stored in a GCS backend so the infrastructure can be managed
consistently across runs.

## Repository Layout

```text
.
├── requirements.txt
├── pyproject.toml
├── scripts/
│   └── run.py
├── src/
│   └── terraform_automation/
│       ├── cli.py
│       ├── config.py
│       ├── gcp_project.py
│       ├── state_validator.py
│       └── terraform_helper.py
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
- Permissions to create and manage:
  - Cloud Storage buckets
  - Service accounts
  - Pub/Sub topics

Authenticate both the `gcloud` CLI and Application Default Credentials:

```bash
gcloud auth login
gcloud auth application-default login
gcloud config set project YOUR_PROJECT_ID
```

## Python Setup

Run these commands from the project root:

```bash
cd GCP/terraform_automation
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip install -e .
```

Verify the CLI:

```bash
python -m terraform_automation.cli --help
```

## Terraform Backend Setup

Create the remote state bucket once:

```bash
export PROJECT_ID="your-gcp-project-id"
export REGION="us-central1"
export BACKEND_BUCKET="${PROJECT_ID}-terraform-state"

gcloud storage buckets create "gs://${BACKEND_BUCKET}" \
  --project="${PROJECT_ID}" \
  --location="${REGION}" \
  --uniform-bucket-level-access
```

Initialize Terraform with the GCS backend:

```bash
terraform -chdir=terraform init \
  -reconfigure \
  -backend-config="bucket=${BACKEND_BUCKET}" \
  -backend-config="prefix=terraform/state"
```

If the state bucket already exists but is not yet tracked by Terraform, import
it:

```bash
terraform -chdir=terraform import \
  -input=false \
  -var="project_id=${PROJECT_ID}" \
  -var="region=${REGION}" \
  -var="backend_bucket=${BACKEND_BUCKET}" \
  google_storage_bucket.state_bucket \
  "${BACKEND_BUCKET}"
```

## Deploy Infrastructure

Preview changes:

```bash
terraform -chdir=terraform plan \
  -input=false \
  -var="project_id=${PROJECT_ID}" \
  -var="region=${REGION}" \
  -var="backend_bucket=${BACKEND_BUCKET}" \
  -var="backend_prefix=terraform/state"
```

Apply changes:

```bash
terraform -chdir=terraform apply \
  -auto-approve \
  -input=false \
  -var="project_id=${PROJECT_ID}" \
  -var="region=${REGION}" \
  -var="backend_bucket=${BACKEND_BUCKET}" \
  -var="backend_prefix=terraform/state"
```

Show outputs:

```bash
terraform -chdir=terraform output
```

## CLI Usage

Show Terraform workspace and state metadata:

```bash
python -m terraform_automation.cli status --terraform-dir terraform
```

Deploy through the Python wrapper:

```bash
python -m terraform_automation.cli deploy \
  --project-id "${PROJECT_ID}" \
  --terraform-dir terraform \
  --backend-bucket "${BACKEND_BUCKET}" \
  --region "${REGION}"
```

Validate Terraform state:

```bash
python -m terraform_automation.cli validate-state \
  --project-id "${PROJECT_ID}" \
  --terraform-dir terraform
```

## Managed Outputs

Terraform exports:

- `state_bucket_name`
- `artifact_bucket_name`
- `automation_service_account_email`
- `automation_events_topic`

Example:

```text
artifact_bucket_name = "your-project-id-app-artifacts"
automation_events_topic = "terraform-automation-events"
automation_service_account_email = "terraform-automation@your-project-id.iam.gserviceaccount.com"
state_bucket_name = "your-project-id-terraform-state"
```

## Test

```bash
python -m pytest
terraform -chdir=terraform validate
```

## Troubleshooting

If Terraform cannot authenticate:

```text
storage.NewClient() failed: credentials: could not find default credentials
```

Run:

```bash
gcloud auth application-default login
```

If `pip install -r requirements.txt` fails with `No such file or directory`,
make sure you are in the project root:

```bash
cd GCP/terraform_automation
```

If Terraform prompts for `bucket` during `terraform init`, pass backend config
explicitly:

```bash
terraform -chdir=terraform init \
  -reconfigure \
  -backend-config="bucket=${BACKEND_BUCKET}" \
  -backend-config="prefix=terraform/state"
```
