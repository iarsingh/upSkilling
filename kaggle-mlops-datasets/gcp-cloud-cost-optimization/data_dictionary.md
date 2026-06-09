# Data Dictionary

Dataset file: `data/gcp_cloud_cost_optimization.csv`

## Columns

- `billing_record_id` - unique synthetic billing record identifier
- `usage_date` - billing usage date
- `project_id` - simulated GCP project id
- `service_name` - GCP service category
- `sku_category` - billing SKU category
- `environment` - resource environment label
- `owning_team` - team owning the spend
- `gcp_region` - region or global billing scope
- `usage_quantity` - synthetic usage quantity
- `usage_unit` - unit for the usage quantity
- `daily_cost_usd` - daily cost in USD
- `committed_use_covered_pct` - fraction of spend covered by commitments
- `idle_resource_score` - synthetic idle or waste signal from 0 to 1
- `rightsizing_savings_usd` - estimated savings from rightsizing
- `label_compliance` - whether the resource has required labels
- `budget_threshold_pct` - percentage of expected budget consumed
- `cost_anomaly` - target label indicating anomalous cost behavior

## Suggested Tasks

- Cloud cost anomaly detection
- FinOps dashboard creation
- Rightsizing opportunity analysis
- GCP billing export SQL practice
- Cloud engineer interview preparation
