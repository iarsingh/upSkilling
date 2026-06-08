# Data Dictionary

Dataset file:

```text
data/mlops_model_monitoring_dataset.csv
```

## Columns

- `event_id` - unique synthetic event id
- `event_timestamp` - UTC timestamp for prediction request
- `customer_id` - synthetic customer identifier
- `region` - simulated GCP serving region
- `traffic_channel` - source channel for prediction traffic
- `model_name` - model identifier
- `model_version` - deployed model version
- `drift_period` - baseline, gradual drift, or post-drift period
- `customer_age` - synthetic customer age
- `account_age_days` - account tenure in days
- `monthly_spend_usd` - monthly spend in USD
- `support_tickets_30d` - support tickets opened in last 30 days
- `failed_payments_30d` - failed payments in last 30 days
- `usage_hours_7d` - product usage hours in last 7 days
- `predicted_churn` - predicted churn class
- `predicted_probability` - churn probability score
- `prediction_score_band` - low, medium, or high risk score band
- `actual_churn` - observed churn label
- `prediction_correct` - whether prediction matched actual label
- `latency_ms` - simulated model API latency in milliseconds
- `request_error` - simulated request error indicator
- `drift_score` - synthetic drift severity score from 0 to 1

## Suggested Tasks

- Model performance monitoring
- Data drift analysis
- Concept drift analysis
- Latency monitoring
- Error-rate monitoring
- Model version comparison
- Churn prediction retraining
- Dashboard creation for MLOps/SRE interviews

