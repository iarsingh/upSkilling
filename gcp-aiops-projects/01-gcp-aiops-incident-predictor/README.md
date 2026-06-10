# Project 01: GCP AIOps Incident Predictor

This project is a Cloud Run-ready AIOps service that scores synthetic GCP service telemetry and recommends safe incident actions.

It is inspired by the local Ollama project design pass and adapted for GCP SRE operations.

## What It Does

- Reads service telemetry such as latency, error rate, CPU, memory, deploy recency, and alert count.
- Calculates an incident risk score from `0` to `100`.
- Classifies risk as `low`, `medium`, `high`, or `critical`.
- Explains which signals caused the risk.
- Recommends safe remediation actions with approval guardrails.

## GCP Mapping

- Cloud Monitoring alert fires.
- Pub/Sub delivers alert payload to Cloud Run.
- Cloud Run calls this risk scoring service.
- High-risk decisions create Incident Manager/PagerDuty/Jira tickets.
- Safe low-risk actions can trigger Cloud Run Jobs, Cloud Functions, or GKE rollout checks.

## Run Locally

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open:

- `http://127.0.0.1:8000/healthz`
- `http://127.0.0.1:8000/docs`

## Example API Request

```bash
curl -X POST http://127.0.0.1:8000/score \
  -H "Content-Type: application/json" \
  -d '{
    "service_name": "checkout",
    "gcp_region": "us-central1",
    "p95_latency_ms": 920,
    "error_rate_pct": 7.5,
    "cpu_utilization_pct": 88,
    "memory_utilization_pct": 82,
    "active_alert_count": 19,
    "deployment_within_30m": true,
    "slo_burn_rate": 8.2
  }'
```

## CLI Demo

```bash
python3 src/score_incidents.py --input data/sample_gcp_service_telemetry.csv
```

## Tests

```bash
python3 -m unittest discover -s tests
```

## Docker

```bash
docker build -t gcp-aiops-incident-predictor .
docker run -p 8080:8080 gcp-aiops-incident-predictor
```

## Deploy With Cloud Build

```bash
gcloud builds submit --config cloudbuild.yaml
```

## Interview Talking Points

- How AIOps augments SRE triage without blindly auto-remediating everything.
- Why remediation needs risk tiers and human approval for critical paths.
- How Cloud Monitoring, Pub/Sub, Cloud Run, and GKE can form an event-driven incident pipeline.
- How explanations make automated scoring safer for production operations.
