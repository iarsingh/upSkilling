# AIOps Project: Log Anomaly Detector

## Goal

Detect unusual service behavior from logs using simple rules and service-level aggregation.

## Run

```bash
cd aiops-hands-on-projects
python3 python/log-anomaly-detector/detect_anomalies.py --input data/service_logs.csv
```

## Interview Talking Points

- Start with simple explainable rules before complex ML.
- Detect high latency, 5xx spikes, and repeated dependency errors.
- Export Cloud Logging to BigQuery for production analysis.

