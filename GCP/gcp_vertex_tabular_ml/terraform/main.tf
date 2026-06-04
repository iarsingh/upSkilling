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

locals {
  name_prefix = "${var.project_id}-vertex-tabular-ml"
}

resource "google_storage_bucket" "data" {
  name                        = "${local.name_prefix}-data"
  location                    = var.region
  uniform_bucket_level_access = true
  force_destroy               = var.force_destroy
}

resource "google_storage_bucket" "model" {
  name                        = "${local.name_prefix}-models"
  location                    = var.region
  uniform_bucket_level_access = true
  force_destroy               = var.force_destroy

  versioning {
    enabled = true
  }
}

resource "google_bigquery_dataset" "features" {
  dataset_id                 = var.bigquery_dataset_id
  location                   = var.region
  delete_contents_on_destroy = var.force_destroy
}

resource "google_service_account" "vertex_runner" {
  account_id   = "vertex-tabular-ml-runner"
  display_name = "Vertex Tabular ML Runner"
}

resource "google_project_iam_member" "vertex_runner_roles" {
  for_each = toset([
    "roles/aiplatform.user",
    "roles/bigquery.dataEditor",
    "roles/storage.objectAdmin",
  ])

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.vertex_runner.email}"
}

