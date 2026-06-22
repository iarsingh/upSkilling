output "transaction_topic" {
  value = google_pubsub_topic.transactions.name
}

output "fraud_analytics_dataset" {
  value = google_bigquery_dataset.fraud_analytics.dataset_id
}

output "fraud_audit_bucket" {
  value = google_storage_bucket.fraud_audit.name
}

output "fraud_model_repository" {
  value = google_artifact_registry_repository.fraud_models.name
}
