# Data Dictionary

Dataset file: `data/aiops_incident_alert_correlation.csv`

## Columns

- `incident_id` - unique synthetic incident identifier
- `event_timestamp` - UTC timestamp for the incident event
- `service_name` - affected application or platform service
- `gcp_region` - simulated Google Cloud region
- `owning_team` - team responsible for the affected service
- `severity` - incident severity level
- `root_cause` - synthetic root cause category
- `alert_count` - number of alerts emitted during the incident
- `duplicate_alerts` - number of noisy duplicate alerts
- `p95_latency_ms` - simulated p95 service latency in milliseconds
- `error_rate_pct` - simulated request error rate percentage
- `cpu_utilization_pct` - average CPU utilization during the incident
- `memory_utilization_pct` - average memory utilization during the incident
- `deployment_within_2h` - whether a deployment happened within two hours
- `customer_impact_score` - synthetic impact score from 0 to 100
- `mttr_minutes` - mean time to resolution in minutes
- `escalated` - target label indicating whether the incident was escalated

## Suggested Tasks

- Alert deduplication and incident correlation
- Escalation prediction
- MTTR analysis
- SRE dashboard practice
- AIOps interview case studies
