resource "google_pubsub_topic" "transactions" {
  name = var.transaction_topic
}

resource "google_bigquery_dataset" "fraud_analytics" {
  dataset_id  = var.bigquery_dataset
  location    = var.region
  description = "Fraud features, prediction logs, and drift evidence"
}

resource "google_storage_bucket" "fraud_audit" {
  name                        = "${var.project_id}-${var.audit_bucket_suffix}"
  location                    = var.region
  uniform_bucket_level_access = true
}

resource "google_artifact_registry_repository" "fraud_models" {
  location      = var.region
  repository_id = var.model_repository
  description   = "NexusFraud training and serving containers"
  format        = "DOCKER"
}
