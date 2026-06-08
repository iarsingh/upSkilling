# AIOps Hands-On Projects

This folder contains AIOps projects for DevOps, SRE, GCP operations, Kubernetes operations, and MLOps incident response preparation.

## Projects

- `python/log-anomaly-detector/` - detect unusual service logs and error spikes
- `python/alert-correlation-engine/` - group related alerts into incident candidates
- `python/slo-burn-rate-analyzer/` - calculate SLO error budget burn rate
- `python/auto-remediation-simulator/` - simulate safe auto-remediation decisions
- `notebooks/01_aiops_incident_prediction.ipynb` - incident-risk scoring from metrics
- `notebooks/02_alert_noise_reduction.ipynb` - alert deduplication and correlation analysis

## Skills Practiced

- Log anomaly detection
- Alert correlation
- Incident classification
- SLO and error budget analysis
- Auto-remediation safety checks
- Kubernetes and GCP operations thinking
- MLOps incident triage

## Local Setup

```bash
cd aiops-hands-on-projects
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run Examples

```bash
python3 python/log-anomaly-detector/detect_anomalies.py --input data/service_logs.csv
python3 python/alert-correlation-engine/correlate_alerts.py --input data/alerts.csv
python3 python/slo-burn-rate-analyzer/analyze_burn_rate.py --input data/slo_events.csv
python3 python/auto-remediation-simulator/remediate.py --input data/remediation_signals.csv
```

## Production Mapping

- Cloud Logging exports logs to BigQuery.
- Cloud Monitoring exports metrics and alerts.
- AIOps jobs analyze logs, alerts, and SLOs.
- Safe remediation workflows trigger Cloud Functions, Cloud Run Jobs, Ansible, or Kubernetes actions.
- Human approval is required for high-risk actions.

## Interview Story

```text
I built AIOps projects that analyze logs, reduce alert noise, calculate SLO
burn rate, and simulate safe remediation decisions. The goal is to move from
reactive incident handling to signal-driven operations with clear guardrails.
```

