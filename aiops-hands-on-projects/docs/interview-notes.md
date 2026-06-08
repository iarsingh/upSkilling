# AIOps Interview Notes

## What Is AIOps?

AIOps applies analytics, automation, and machine learning techniques to IT operations data such as logs, metrics, traces, alerts, incidents, and deployment events.

## Core Use Cases

- Alert noise reduction
- Incident prediction
- Root-cause analysis support
- Log anomaly detection
- SLO burn-rate alerting
- Capacity forecasting
- Auto-remediation with guardrails

## Interview Questions

1. What is AIOps?
2. How is AIOps different from traditional monitoring?
3. What data sources are useful for AIOps?
4. How do you reduce alert noise?
5. What is alert correlation?
6. What is an SLO burn rate?
7. When should auto-remediation be avoided?
8. How do you evaluate an anomaly detection system?
9. How would you build AIOps on GCP?
10. How would you connect AIOps with Kubernetes operations?

## GCP Architecture

```text
Cloud Logging + Cloud Monitoring + GKE metrics
        -> BigQuery / Pub/Sub
        -> AIOps analysis job on Cloud Run or GKE
        -> Incident candidate + recommended action
        -> Human approval or safe automation
```

