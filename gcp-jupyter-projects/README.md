# GCP Jupyter Projects

This folder contains Jupyter notebook projects for GCP hands-on learning and interview preparation.

The goal is to practice cloud engineering, data engineering, and MLOps workflows in notebooks before converting them into production services.

## Projects

- `notebooks/01_gcs_csv_etl.ipynb` - Cloud Storage style CSV ETL project
- `notebooks/02_bigquery_cost_report.ipynb` - BigQuery cost reporting and FinOps analysis
- `notebooks/03_pubsub_event_analysis.ipynb` - Pub/Sub event payload validation and analysis
- `notebooks/04_vertex_ai_training_workflow.ipynb` - Vertex AI style ML training workflow
- `notebooks/05_mlops_model_monitoring_dashboard.ipynb` - model accuracy, latency, error, and drift monitoring
- `notebooks/06_gke_capacity_rightsizing.ipynb` - Kubernetes requests vs usage capacity analysis
- `notebooks/07_cloud_logging_incident_analysis.ipynb` - log-based incident and latency analysis
- `notebooks/08_terraform_gcp_cost_estimator.ipynb` - Terraform-style GCP cost estimation

## Local Setup

```bash
cd gcp-jupyter-projects
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
jupyter lab
```

## Optional GCP Setup

```bash
gcloud auth application-default login
gcloud config set project YOUR_PROJECT_ID
```

Enable APIs when using real GCP services:

```bash
gcloud services enable storage.googleapis.com bigquery.googleapis.com pubsub.googleapis.com aiplatform.googleapis.com
```

## Portfolio Story

Use these notebooks to explain:

- How raw data moves through Cloud Storage and ETL logic
- How BigQuery can support cloud cost reporting
- How Pub/Sub events are validated before processing
- How an ML training workflow can be tracked and packaged for Vertex AI
- How model monitoring detects drift, errors, and latency regressions
- How GKE workload requests can be rightsized
- How cloud logs help incident response
- How Terraform plans can include cost review

## Convert Notebook to Production Project

After each notebook works:

1. Move reusable logic into `.py` files.
2. Add tests.
3. Add a Dockerfile.
4. Add GitHub Actions.
5. Deploy to Cloud Run, Cloud Run Jobs, or GKE.
