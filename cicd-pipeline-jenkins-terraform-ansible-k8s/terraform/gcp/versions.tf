terraform {
  required_version = ">= 1.7.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.40"
    }
  }

  # Real deployments should use a remote backend so state isn't local-only.
  # Left commented out here since this project targets a GCS bucket that
  # doesn't exist yet -- create it once, then uncomment:
  #
  #   gsutil mb -l us-central1 gs://<your-project-id>-tfstate
  #
  # backend "gcs" {
  #   bucket = "<your-project-id>-tfstate"
  #   prefix = "quiz-app/terraform/state"
  # }
}

provider "google" {
  project = var.project_id
  region  = var.region
}
