# ML Observability SRE

This project is a small ML SRE toolkit for inference services. It analyzes
JSONL inference logs and produces practical SLO signals: p95/p99 latency, error
rate, drift score, and alert decisions.

## What It Demonstrates

- Production inference monitoring concepts
- SLO-oriented reporting
- p99 latency tracking
- Drift and error-rate signals
- Incident-summary style output
- Python automation for operational workflows

## Run

```bash
python3 src/ml_sre_report.py --logs examples/inference_logs.jsonl
```

Example output:

```json
{
  "status": "alert",
  "summary": "SLO breach: p99 latency or error rate exceeded threshold",
  "metrics": {
    "requests": 20,
    "p95_latency_ms": 310,
    "p99_latency_ms": 480,
    "error_rate": 0.05,
    "max_drift_score": 0.22
  }
}
```

## Interview Talking Points

- ML services need standard SRE signals plus ML-specific signals like drift.
- p99 latency matters more than average latency for real-time inference.
- Alert rules should combine reliability and ML quality indicators.
- This can be extended into Prometheus, Grafana, OpenTelemetry, or ELK.
