# Data Dictionary

Dataset file: `data/013-mlops-drift-dataset.csv`

## Columns

- `record_id` - unique synthetic record identifier
- `event_date` - synthetic event date
- `project_name` - simulated cloud project name
- `service_name` - simulated cloud service name
- `gcp_region` - simulated Google Cloud region
- `environment` - resource environment label
- `owning_team` - team responsible for the record
- `signal_category` - primary signal category for analysis
- `metric_a` - synthetic normalized operations metric
- `metric_b` - synthetic volume or cost metric
- `metric_c` - synthetic quality or confidence metric
- `metric_d` - synthetic latency, duration, or workload metric
- `risk_score` - derived synthetic risk score from 0 to 100
- `retraining_needed` - target label for classification or dashboard segmentation

## Suggested Tasks

- Build a dashboard with service, region, team, and environment filters
- Train a baseline classification model using the target label
- Analyze risk score distribution across services and teams
- Practice BigQuery SQL and pandas EDA
