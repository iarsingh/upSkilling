provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_storage_bucket" "state_bucket" {
  name          = var.backend_bucket
  location      = var.region
  force_destroy = false
  labels        = var.labels
}

resource "google_storage_bucket" "artifact_bucket" {
  name                        = "${var.project_id}-app-artifacts"
  location                    = var.region
  force_destroy               = false
  uniform_bucket_level_access = true
  labels                      = var.labels

  versioning {
    enabled = true
  }
}

resource "google_service_account" "automation" {
  account_id   = "terraform-automation"
  display_name = "Terraform Automation"
  description  = "Service account for Terraform-managed automation workflows."
}

resource "google_pubsub_topic" "automation_events" {
  name   = "terraform-automation-events"
  labels = var.labels
}
