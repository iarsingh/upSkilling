CREATE TABLE IF NOT EXISTS `PROJECT_ID.analytics.events` (
  event_id STRING NOT NULL,
  user_id STRING,
  event_name STRING NOT NULL,
  event_timestamp TIMESTAMP NOT NULL,
  attributes JSON
)
PARTITION BY DATE(event_timestamp)
CLUSTER BY event_name, user_id;

