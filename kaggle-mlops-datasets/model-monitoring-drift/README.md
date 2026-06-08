# MLOps Model Monitoring and Drift Dataset

This is a synthetic dataset for MLOps, model monitoring, drift detection, and production ML interview practice.

It simulates prediction events from a customer churn model deployed across multiple regions and traffic channels. The dataset includes model versions, prediction scores, actual labels, latency, request errors, and drift periods.

Kaggle URL:

```text
https://www.kaggle.com/datasets/iamarsingh/mlops-model-monitoring-drift-dataset
```

## Files

- `data/mlops_model_monitoring_dataset.csv` - main dataset
- `mlops_model_monitoring_dataset.csv` - root-level copy of the main dataset for Kaggle preview/download
- `data_dictionary.md` - column definitions
- `summary.json` - generated dataset summary
- `scripts/generate_dataset.py` - reproducible dataset generator
- `generate_dataset.py` - root-level copy of the generator for Kaggle users
- `dataset-metadata.json` - Kaggle dataset metadata

## Use Cases

- Build an MLOps monitoring dashboard
- Compare model versions
- Detect performance degradation
- Analyze data drift and concept drift
- Practice BigQuery analytics
- Practice Vertex AI / MLflow monitoring workflows
- Prepare for MLOps and AI infrastructure interviews

## Example Questions

1. Which model version has the best accuracy?
2. Did model accuracy degrade during the post-drift period?
3. Which traffic channel has the highest churn rate?
4. Which region has the highest average latency?
5. Is request error rate correlated with failed payments?
6. What drift threshold should trigger retraining?
7. How would you monitor this dataset in production?

## Recreate Dataset

```bash
python3 scripts/generate_dataset.py
```

## Kaggle Upload

After configuring Kaggle credentials:

```bash
kaggle datasets create -p kaggle-mlops-datasets/model-monitoring-drift
```

To publish a new version:

```bash
kaggle datasets version -p kaggle-mlops-datasets/model-monitoring-drift -m "Update dataset"
```
