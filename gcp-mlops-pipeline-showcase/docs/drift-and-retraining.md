# Drift Detection and Retraining

## Prediction Record

Each inference batch writes:

```json
{
  "timestamp": "2026-06-25T10:00:00+00:00",
  "model": "diabetes-regressor",
  "version": "commit-sha",
  "instances": [[0.038, 0.051, 0.062, 0.022, -0.044, -0.035, -0.043, -0.003, 0.019, -0.018]],
  "predictions": [173.4]
}
```

## PSI Policy

| PSI | Interpretation |
| ---: | --- |
| `< 0.1` | Stable |
| `0.1-0.2` | Moderate shift; investigate |
| `>= 0.2` | Material drift; publish retraining event |

The threshold is configurable through `DRIFT_THRESHOLD`.

## Event

```json
{
  "reason": "feature_drift",
  "detected_at": "2026-06-25T10:30:00+00:00",
  "max_psi": 0.31,
  "mean_psi": 0.12,
  "sample_count": 842,
  "feature_psi": {
    "bmi": 0.31,
    "bp": 0.17
  }
}
```

## Manual Test

Run the drift job:

```bash
kubectl create job \
  --from=cronjob/model-drift-monitor \
  drift-test-$(date +%s) \
  -n mlops-demo
```

Inspect:

```bash
kubectl logs -n mlops-demo job/<job-name>
gcloud pubsub subscriptions pull model-retraining-cloud-run --limit=1 --auto-ack
gcloud ai custom-jobs list --region us-central1
```

## Promotion Gate

The retraining trigger creates a candidate. Production promotion should require:

- RMSE does not regress beyond tolerance.
- R2 meets the minimum threshold.
- Candidate artifact and baseline exist under `models/diabetes/candidates/<job-name>/`.
- Image and dependency scans pass.
- A human or policy engine approves model promotion.
- KServe canary metrics remain within SLO.
