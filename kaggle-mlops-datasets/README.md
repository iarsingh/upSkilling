# Kaggle MLOps Datasets

This folder contains Kaggle-ready datasets for MLOps portfolio and interview practice.

## Datasets

- `model-monitoring-drift/` - synthetic MLOps model monitoring and drift dataset with prediction events, model versions, latency, errors, and drift periods
- `aiops-incident-alert-correlation/` - synthetic incident and alert telemetry for AIOps correlation, escalation prediction, and SRE dashboards
- `gcp-cloud-cost-optimization/` - synthetic GCP billing and FinOps data for anomaly detection, rightsizing, and budget analysis
- `genai-rag-evaluation-observability/` - synthetic RAG evaluation telemetry for GenAI observability, hallucination analysis, and prompt comparison
- `kaggle-100-portfolio-datasets/` - 100 synthetic Kaggle-ready datasets for cloud, DevOps, MLOps, AIOps, FinOps, security, and GenAI practice

## Kaggle Upload Setup

Install Kaggle CLI:

```bash
pip install kaggle
```

Create an API token from Kaggle:

```text
Kaggle -> Account -> API -> Create New Token
```

Then place `kaggle.json` here:

```text
~/.kaggle/kaggle.json
```

Set permissions:

```bash
chmod 600 ~/.kaggle/kaggle.json
```

Upload a dataset:

```bash
kaggle datasets create -p kaggle-mlops-datasets/model-monitoring-drift
```

Create a new version:

```bash
kaggle datasets version -p kaggle-mlops-datasets/model-monitoring-drift -m "Update dataset"
```

Upload or version all Kaggle-ready datasets:

```bash
bash kaggle-mlops-datasets/upload_all_datasets.sh
```

## Quality Checklist

Each Kaggle-ready dataset includes:

- `dataset-metadata.json` with title, subtitle, description, license, resources, schema fields, tags, source notes, update frequency, and cover image path
- Root-level CSV for Kaggle preview
- `data/` CSV copy for clean project structure
- `data_dictionary.md`
- `summary.json`
- Reproducible generator script
- `dataset-cover-image.png`
- Zero missing values in generated CSVs
