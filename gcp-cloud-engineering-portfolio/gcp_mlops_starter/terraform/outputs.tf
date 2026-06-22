output "raw_data_bucket" {
  description = "Bucket for raw training data."
  value       = google_storage_bucket.raw_data.name
}

output "model_artifacts_bucket" {
  description = "Bucket for trained model artifacts."
  value       = google_storage_bucket.model_artifacts.name
}

output "feature_dataset" {
  description = "BigQuery dataset for features."
  value       = google_bigquery_dataset.features.dataset_id
}

output "model_events_topic" {
  description = "Pub/Sub topic for model lifecycle events."
  value       = google_pubsub_topic.model_events.name
}

output "pipeline_runner_service_account" {
  description = "Service account for pipeline runs."
  value       = google_service_account.pipeline_runner.email
}
