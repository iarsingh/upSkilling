# Pub/Sub ML Incident Automation

This project demonstrates how ML platform alerts can be routed into automated
incident triage workflows on GCP. It uses Pub/Sub-style alert payloads and a
Cloud Function-compatible Python handler.

## What It Demonstrates

- Pub/Sub alert routing for ML incidents
- Cloud Function style event handler
- Runbook mapping by alert type
- Severity classification
- Incident response summary generation
- Terraform foundation for alert topics

## Example Alerts

- High inference p99 latency
- High inference error rate
- Model drift detected
- Prediction data quality issue

## Run Locally

```bash
python3 src/incident_router.py \
  --alert examples/model_drift_alert.json \
  --runbooks config/runbooks.json
```

## Interview Talking Points

- Monitoring is only useful when it triggers actionable workflows.
- ML incidents need both platform and model-quality runbooks.
- Pub/Sub decouples alert producers from incident response consumers.
- This can be extended to Slack, PagerDuty, Jira, or ServiceNow.
