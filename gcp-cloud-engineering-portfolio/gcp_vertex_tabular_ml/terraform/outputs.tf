output "data_bucket" {
  value       = google_storage_bucket.data.name
  description = "GCS bucket for datasets."
}

output "model_bucket" {
  value       = google_storage_bucket.model.name
  description = "Versioned GCS bucket for model artifacts."
}

output "bigquery_dataset_id" {
  value       = google_bigquery_dataset.features.dataset_id
  description = "BigQuery feature dataset ID."
}

output "vertex_service_account_email" {
  value       = google_service_account.vertex_runner.email
  description = "Service account for Vertex AI custom jobs."
}

