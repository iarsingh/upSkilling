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

resource "google_pubsub_topic" "ml_alerts" {
  name = "ml-platform-alerts"

  labels = {
    managed_by = "terraform"
    workload   = "ml-incident-automation"
  }
}

resource "google_pubsub_subscription" "incident_router" {
  name  = "ml-incident-router"
  topic = google_pubsub_topic.ml_alerts.name

  ack_deadline_seconds = 30
}

resource "google_service_account" "incident_router" {
  account_id   = "ml-incident-router"
  display_name = "ML Incident Router"
}
