# Python GCP Automation Toolkit

Five production-oriented Python automation tools packaged as one Click CLI and FastAPI service.

## Outcome

This project demonstrates the Python automation skills commonly expected from senior GCP DevOps, SRE, Platform Engineering, and MLOps candidates:

```text
gcp-ops
├── gke-health
├── iam-audit
├── cost-optimize
├── cloud-run-deploy
└── vertex
    ├── train
    ├── models
    └── deploy
```

The package uses official `google-cloud-*` SDKs and the Kubernetes Python client. Detection logic is isolated from SDK collection, which supports unit testing, safer dry runs, and API reuse.

## Stack

- Python 3.11+
- Click CLI
- FastAPI
- Kubernetes Python client
- Google Cloud Resource Manager and IAM APIs
- Compute Engine, Cloud Billing, BigQuery billing export
- Cloud Build, Artifact Registry, Cloud Run
- Vertex AI Python SDK
- Rich console reports
- JSON and CSV exports

## Tool 1: GKE Health Checker

Scans all nodes and pods in the selected Kubernetes context.

Detects:

- NotReady nodes
- Memory, disk, PID, and network pressure
- CrashLoopBackOff
- OOMKilled containers
- High restart counts
- Pending, failed, and unknown pods

```bash
gcp-ops gke-health \
  --context gke_project_region_cluster \
  --output reports/gke-health.json
```

## Tool 2: IAM Audit Scanner

Reads the complete project IAM policy and flags:

- Public project IAM
- Owner/editor primitive roles
- Privileged service accounts
- Service Account Token Creator
- Project IAM administrators
- Project-level role sprawl

```bash
gcp-ops iam-audit \
  --project-id YOUR_PROJECT_ID \
  --output-format csv \
  --output reports/iam-audit.csv
```

## Tool 3: Cost Optimizer

Uses Compute Engine APIs, Cloud Billing API, and optional BigQuery billing export.

Detects:

- Terminated VMs retaining resources
- Unattached persistent disks
- Large idle disks
- Snapshots older than the retention threshold
- Highest-cost services from billing export

```bash
export BILLING_EXPORT_TABLE="billing-project.dataset.gcp_billing_export_v1_XXXXXX"

gcp-ops cost-optimize \
  --project-id YOUR_PROJECT_ID \
  --billing-days 30 \
  --snapshot-age-days 90 \
  --output reports/cost-report.json
```

## Tool 4: Cloud Run Deployer

The deployer:

1. Packages a local source directory.
2. Uploads it to a GCS staging bucket.
3. Starts Cloud Build.
4. Pushes the image to Artifact Registry.
5. Creates or updates Cloud Run using the Python SDK.

Dry run is the default:

```bash
gcp-ops cloud-run-deploy \
  --project-id YOUR_PROJECT_ID \
  --service toolkit-demo \
  --source-dir examples/cloud-run-app \
  --repository cloud-run \
  --staging-bucket YOUR_BUILD_SOURCE_BUCKET \
  --tag v1
```

Execute:

```bash
gcp-ops cloud-run-deploy \
  --project-id YOUR_PROJECT_ID \
  --service toolkit-demo \
  --source-dir examples/cloud-run-app \
  --repository cloud-run \
  --staging-bucket YOUR_BUILD_SOURCE_BUCKET \
  --tag v1 \
  --allow-unauthenticated \
  --execute
```

## Tool 5: Vertex AI Automation

Plan or submit custom-container training:

```bash
gcp-ops vertex train \
  --project-id YOUR_PROJECT_ID \
  --display-name churn-training-v1 \
  --container-uri us-central1-docker.pkg.dev/YOUR_PROJECT_ID/ml/training:v1 \
  --service-account vertex-training@YOUR_PROJECT_ID.iam.gserviceaccount.com \
  --arg=--epochs \
  --arg=10
```

Add `--execute` to submit.

List models:

```bash
gcp-ops vertex models --project-id YOUR_PROJECT_ID
```

Plan endpoint deployment:

```bash
gcp-ops vertex deploy \
  --project-id YOUR_PROJECT_ID \
  --model-name projects/.../locations/us-central1/models/... \
  --endpoint-name churn-production
```

Add `--execute` to deploy.

## FastAPI

Run:

```bash
make setup
make api
```

Open:

```text
http://127.0.0.1:8080/docs
```

Available API operations:

- `GET /health`
- `GET /gke/health`
- `GET /iam/audit/{project_id}`
- `GET /cost/optimize/{project_id}`
- `GET /vertex/models/{project_id}`
- `POST /cloud-run/plan`
- `POST /vertex/training-plan`

Live mutation operations remain CLI-only and require `--execute`, reducing accidental deployments through an exposed API.

## Installation

```bash
cd python-gcp-automation-toolkit
make setup
source .venv/bin/activate
gcp-ops --help
```

Authentication:

```bash
gcloud auth application-default login
gcloud config set project YOUR_PROJECT_ID
```

Kubernetes access:

```bash
gcloud container clusters get-credentials CLUSTER \
  --region REGION \
  --project YOUR_PROJECT_ID
```

## Reports

Read-only scanners support JSON and CSV export. A report includes:

- Generation timestamp
- Project/tool metadata
- Finding severity and category
- Affected resource
- Explanation and recommendation
- Tool-specific evidence

## Safety

- Cloud Run and Vertex commands default to dry-run.
- Mutating operations require `--execute`.
- Reports do not contain access tokens or credentials.
- IAM scanning is read-only.
- Cost optimization produces recommendations and never deletes resources.
- Use dedicated service accounts and least privilege for automation.

See [Permissions](docs/permissions.md).

## Testing

```bash
make validate
```

The test suite runs without GCP credentials because SDK collection and decision logic are separated.

## Architecture

See [Architecture](docs/architecture.md).

## Interview Talking Point

> I built a Python GCP automation toolkit with five operational tools under one Click CLI. It uses the Kubernetes client for cluster health, Resource Manager IAM policies for least-privilege auditing, Compute and Billing data for cost recommendations, Cloud Build and Cloud Run SDKs for deployment, and Vertex AI for training and model endpoint automation. Read-only scanners export structured reports, while mutation commands are dry-run by default and require an explicit execute flag.

## Days 1-75

The 30-minute daily development and interview-preparation plan is documented in [Days 1-75 Plan](docs/days-1-75-plan.md).
