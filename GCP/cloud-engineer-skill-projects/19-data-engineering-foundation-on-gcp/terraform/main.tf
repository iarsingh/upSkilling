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

resource "google_storage_bucket" "landing" {
  name                        = "${var.project_id}-data-landing"
  location                    = var.location
  uniform_bucket_level_access = true
}

resource "google_bigquery_dataset" "raw" {
  dataset_id = "raw"
  location   = var.location
}

resource "google_bigquery_dataset" "curated" {
  dataset_id = "curated"
  location   = var.location
}

resource "google_pubsub_topic" "ingest" {
  name = "data-ingest-events"
}

