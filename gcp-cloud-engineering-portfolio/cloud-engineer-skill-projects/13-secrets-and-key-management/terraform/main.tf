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

resource "google_kms_key_ring" "platform" {
  name     = "platform-secrets"
  location = var.region
}

resource "google_kms_crypto_key" "app" {
  name            = "app-secrets"
  key_ring        = google_kms_key_ring.platform.id
  rotation_period = "7776000s"
}

resource "google_secret_manager_secret" "app_config" {
  secret_id = "app-config"
  replication {
    auto {}
  }
}

resource "google_service_account" "workload" {
  account_id   = "secret-reader"
  display_name = "Secret reader workload"
}

resource "google_secret_manager_secret_iam_member" "reader" {
  secret_id = google_secret_manager_secret.app_config.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.workload.email}"
}

