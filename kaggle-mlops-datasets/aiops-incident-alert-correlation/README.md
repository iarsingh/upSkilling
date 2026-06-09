# AIOps Incident Alert Correlation Dataset

Synthetic incident and alert telemetry for practicing AIOps correlation, escalation prediction, and SRE dashboards.

This is a synthetic, Kaggle-ready dataset created for cloud, MLOps, AIOps, and GenAI portfolio practice.

## Files

- `data/aiops_incident_alert_correlation.csv` - main dataset
- `aiops_incident_alert_correlation.csv` - root-level copy for Kaggle preview
- `dataset-cover-image.png` - cover image for Kaggle dataset metadata
- `data_dictionary.md` - column definitions and suggested tasks
- `summary.json` - machine-readable quality and schema summary
- `scripts/generate_dataset.py` - reproducible dataset generator
- `generate_dataset.py` - root-level generator copy for Kaggle users
- `dataset-metadata.json` - Kaggle dataset metadata

## Quality Notes

- Fixed random seed for reproducibility.
- No missing values.
- CSV format with simple scalar columns for Kaggle compatibility.
- CC0 license for public portfolio use.
- Synthetic data only; no real customer, system, billing, or production data.

## Use Cases

- Alert deduplication and incident correlation
- Escalation prediction
- MTTR analysis
- SRE dashboard practice
- AIOps interview case studies

## Example Questions

1. Which service has the highest escalation rate?
2. Which root causes create the most duplicate alerts?
3. How does deployment timing affect incident severity?
4. Can escalation be predicted from latency, errors, and alert volume?

## Recreate Dataset

```bash
python3 scripts/generate_dataset.py
```

## Kaggle Upload

```bash
kaggle datasets create -p kaggle-mlops-datasets/aiops-incident-alert-correlation
```

To publish a new version:

```bash
kaggle datasets version -p kaggle-mlops-datasets/aiops-incident-alert-correlation -m "Update dataset"
```
