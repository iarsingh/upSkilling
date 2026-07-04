# Model Drift Monitor

Compares baseline and current model input distributions using Population Stability Index. The demo also checks schema compatibility and produces a drift report.

## Why This Is Useful

Production ML models decay when traffic, users, or upstream systems change. Drift monitoring helps teams decide when to investigate, retrain, or roll back.

## Run

```bash
python3 app.py
```

The script writes `drift_report.md`.

## What This Proves

- Production ML observability
- Feature drift detection
- Schema validation
- Release and retraining signals

## Interview Talking Points

- When does drift require retraining?
- How would you combine drift with live model performance?
- What alerts would be too noisy for an on-call team?
