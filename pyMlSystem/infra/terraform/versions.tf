terraform {
  required_version = ">= 1.10, < 2.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "= 8.4.0"
    }
  }
  # Bootstrap a versioned GCS state bucket separately before a future cloud apply.
  backend "gcs" {}
}

provider "google" {
  project = var.project_id
  region  = var.region
}
