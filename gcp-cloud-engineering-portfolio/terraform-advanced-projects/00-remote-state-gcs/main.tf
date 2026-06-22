terraform {
  required_version = ">= 1.6.0"
  backend "gcs" {}
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

resource "google_storage_bucket" "logs" {
  name                        = "${var.project_id}-platform-logs"
  location                    = "US"
  uniform_bucket_level_access = true
}

