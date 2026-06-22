# Python Project: BigQuery Cost Reporter

## Goal

Run a BigQuery query and generate a small cost-style report from a table.

This project is useful for FinOps, cloud reporting, platform engineering, and data analytics interviews.

## GCP Services

- BigQuery
- Cloud Run Jobs or Cloud Scheduler
- Cloud Logging

## Expected Table Shape

Use any table with these fields:

```text
service STRING
environment STRING
cost FLOAT
usage_date DATE
```

## Local Run

```bash
pip install -r requirements.txt

export PROJECT_ID="YOUR_PROJECT_ID"
export TABLE_ID="YOUR_PROJECT_ID.dataset.cost_table"

python main.py
```

## Interview Talking Points

- BigQuery query jobs
- Cost reporting and FinOps
- Partition filtering
- Scheduled reporting
- Service account permissions

