# AIOps Project: Alert Correlation Engine

## Goal

Group noisy alerts into incident candidates by namespace, service, and time window.

## Run

```bash
cd aiops-hands-on-projects
python3 python/alert-correlation-engine/correlate_alerts.py --input data/alerts.csv
```

## Interview Talking Points

- Alert correlation reduces noise during incidents.
- Group alerts by time, service, namespace, dependency, and severity.
- One incident should have a clear owner, impact, and next action.

