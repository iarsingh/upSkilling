# Kaggle MLOps Datasets

This folder contains Kaggle-ready datasets for MLOps portfolio and interview practice.

## Datasets

- `model-monitoring-drift/` - synthetic MLOps model monitoring and drift dataset with prediction events, model versions, latency, errors, and drift periods

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

