terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.30"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_pubsub_topic" "retraining" {
  name = "model-retraining-events"
}

resource "google_monitoring_notification_channel" "email" {
  display_name = "mlops-email"
  type         = "email"
  labels = {
    email_address = var.alert_email
  }
}

