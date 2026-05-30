resource "google_storage_bucket" "pipeline_artifacts" {
  name                        = "${var.project_id}-${var.pipeline_artifact_bucket_suffix}"
  location                    = var.region
  uniform_bucket_level_access = true
}

resource "google_bigquery_dataset" "training_data" {
  dataset_id  = var.training_dataset
  location    = var.region
  description = "Training snapshots and feature validation outputs"
}

resource "google_bigquery_dataset" "prediction_logs" {
  dataset_id  = var.prediction_log_dataset
  location    = var.region
  description = "Prediction logs, drift summaries, and model performance signals"
}

resource "google_artifact_registry_repository" "training_images" {
  location      = var.region
  repository_id = var.training_repository
  description   = "Training and evaluation containers for Vertex AI pipelines"
  format        = "DOCKER"
}

resource "google_pubsub_topic" "mlops_events" {
  name = var.mlops_event_topic
}
