output "artifact_repository" {
  value = google_artifact_registry_repository.huggingface_serving.name
}

output "artifact_bucket" {
  value = google_storage_bucket.llmops_artifacts.name
}

output "prediction_log_dataset" {
  value = google_bigquery_dataset.prediction_logs.dataset_id
}

output "alert_topic" {
  value = google_pubsub_topic.llmops_alerts.name
}
