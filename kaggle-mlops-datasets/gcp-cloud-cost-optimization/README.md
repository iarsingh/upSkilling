# GCP Cloud Cost Optimization Dataset

Synthetic GCP billing and FinOps dataset for cost anomaly detection, rightsizing analysis, and budget dashboards.

This is a synthetic, Kaggle-ready dataset created for cloud, MLOps, AIOps, and GenAI portfolio practice.

## Files

- `data/gcp_cloud_cost_optimization.csv` - main dataset
- `gcp_cloud_cost_optimization.csv` - root-level copy for Kaggle preview
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

- Cloud cost anomaly detection
- FinOps dashboard creation
- Rightsizing opportunity analysis
- GCP billing export SQL practice
- Cloud engineer interview preparation

## Example Questions

1. Which service has the largest rightsizing opportunity?
2. Which team has the highest anomaly rate?
3. How much cost is covered by committed use discounts?
4. Which unlabeled resources should be fixed first?

## Recreate Dataset

```bash
python3 scripts/generate_dataset.py
```

## Kaggle Upload

```bash
kaggle datasets create -p kaggle-mlops-datasets/gcp-cloud-cost-optimization
```

To publish a new version:

```bash
kaggle datasets version -p kaggle-mlops-datasets/gcp-cloud-cost-optimization -m "Update dataset"
```
