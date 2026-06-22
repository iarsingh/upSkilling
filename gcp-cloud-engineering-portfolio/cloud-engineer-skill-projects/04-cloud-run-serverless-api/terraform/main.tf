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

resource "google_artifact_registry_repository" "apps" {
  location      = var.region
  repository_id = "skill-apps"
  format        = "DOCKER"
}

resource "google_service_account" "runtime" {
  account_id   = "cloud-run-skill-api"
  display_name = "Cloud Run skill API runtime"
}

resource "google_cloud_run_v2_service" "api" {
  name     = "skill-api"
  location = var.region

  template {
    service_account = google_service_account.runtime.email
    containers {
      image = var.image
      env {
        name  = "APP_ENV"
        value = var.environment
      }
    }
  }
}

