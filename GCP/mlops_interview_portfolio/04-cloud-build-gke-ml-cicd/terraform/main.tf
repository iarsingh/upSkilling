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

resource "google_artifact_registry_repository" "ml_services" {
  location      = var.region
  repository_id = "ml-services"
  description   = "Container images for ML inference services."
  format        = "DOCKER"
}

resource "google_service_account" "cloud_build_deployer" {
  account_id   = "cloud-build-ml-deployer"
  display_name = "Cloud Build ML Deployer"
}
