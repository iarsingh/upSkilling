output "prediction_monitoring_dataset" {
  value       = google_bigquery_dataset.prediction_monitoring.dataset_id
  description = "BigQuery dataset for prediction monitoring logs."
}

output "monitoring_alert_topic" {
  value       = google_pubsub_topic.monitoring_alerts.name
  description = "Pub/Sub topic for model monitoring alerts."
}

output "monitoring_config_bucket" {
  value       = google_storage_bucket.monitoring_configs.name
  description = "GCS bucket for monitoring policies and configs."
}
