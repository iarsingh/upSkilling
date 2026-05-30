terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_bigquery_dataset" "prediction_monitoring" {
  dataset_id                 = "vertex_prediction_monitoring"
  location                   = "US"
  delete_contents_on_destroy = false
  labels                     = var.labels
}

resource "google_pubsub_topic" "monitoring_alerts" {
  name   = "vertex-model-monitoring-alerts"
  labels = var.labels
}

resource "google_storage_bucket" "monitoring_configs" {
  name                        = "${var.project_id}-vertex-monitoring-configs"
  location                    = var.region
  uniform_bucket_level_access = true
  force_destroy               = false
  labels                      = var.labels
}
