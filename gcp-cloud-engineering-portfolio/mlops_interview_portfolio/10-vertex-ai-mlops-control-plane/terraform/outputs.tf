output "pipeline_artifact_bucket" {
  value = google_storage_bucket.pipeline_artifacts.name
}

output "training_dataset" {
  value = google_bigquery_dataset.training_data.dataset_id
}

output "prediction_log_dataset" {
  value = google_bigquery_dataset.prediction_logs.dataset_id
}

output "training_repository" {
  value = google_artifact_registry_repository.training_images.name
}

output "mlops_event_topic" {
  value = google_pubsub_topic.mlops_events.name
}
