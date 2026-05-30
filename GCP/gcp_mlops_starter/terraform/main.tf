provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_storage_bucket" "raw_data" {
  name                        = "${var.project_id}-${var.resource_prefix}-raw-data"
  location                    = var.region
  force_destroy               = false
  uniform_bucket_level_access = true
  labels                      = var.labels
}

resource "google_storage_bucket" "model_artifacts" {
  name                        = "${var.project_id}-${var.resource_prefix}-models"
  location                    = var.region
  force_destroy               = false
  uniform_bucket_level_access = true
  labels                      = var.labels

  versioning {
    enabled = true
  }
}

resource "google_bigquery_dataset" "features" {
  dataset_id                 = replace("${var.resource_prefix}_features", "-", "_")
  location                   = "US"
  delete_contents_on_destroy = false
  labels                     = var.labels
}

resource "google_pubsub_topic" "model_events" {
  name   = "${var.resource_prefix}-model-events"
  labels = var.labels
}

resource "google_service_account" "pipeline_runner" {
  account_id   = "mlops-pipeline-runner"
  display_name = "MLOps Pipeline Runner"
  description  = "Service account for lightweight MLOps pipeline runs."
}
