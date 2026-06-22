CREATE TABLE IF NOT EXISTS `PROJECT_ID.curated.customer_features` (
  customer_id STRING NOT NULL,
  event_count_7d INT64 NOT NULL,
  avg_value_30d FLOAT64 NOT NULL,
  feature_timestamp TIMESTAMP NOT NULL
)
PARTITION BY DATE(feature_timestamp)
CLUSTER BY customer_id;

