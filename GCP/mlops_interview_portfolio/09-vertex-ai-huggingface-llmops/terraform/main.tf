resource "google_artifact_registry_repository" "huggingface_serving" {
  location      = var.region
  repository_id = var.artifact_repository
  description   = "Hugging Face model serving containers"
  format        = "DOCKER"
}

resource "google_storage_bucket" "llmops_artifacts" {
  name                        = "${var.project_id}-${var.artifact_bucket_suffix}"
  location                    = var.region
  uniform_bucket_level_access = true
}

resource "google_bigquery_dataset" "prediction_logs" {
  dataset_id  = var.prediction_log_dataset
  location    = var.region
  description = "Vertex AI Hugging Face prediction logs and evaluation outputs"
}

resource "google_pubsub_topic" "llmops_alerts" {
  name = var.alert_topic
}
