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

resource "google_storage_bucket" "model_artifacts" {
  name                        = "${var.project_id}-ml-platform-models"
  location                    = var.region
  uniform_bucket_level_access = true
  force_destroy               = false
  labels                      = var.labels

  versioning {
    enabled = true
  }
}

resource "google_service_account" "ml_workload" {
  account_id   = "ml-platform-workload"
  display_name = "ML Platform Workload"
  description  = "Workload identity service account for ML platform workloads."
}

resource "google_container_cluster" "ml_platform" {
  name                     = var.cluster_name
  location                 = var.region
  remove_default_node_pool = true
  initial_node_count       = 1
  deletion_protection      = false

  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }

  resource_labels = var.labels
}

resource "google_container_node_pool" "cpu_pool" {
  name       = "cpu-pool"
  location   = var.region
  cluster    = google_container_cluster.ml_platform.name
  node_count = 2

  node_config {
    machine_type    = "e2-standard-4"
    service_account = google_service_account.ml_workload.email
    oauth_scopes    = ["https://www.googleapis.com/auth/cloud-platform"]
    labels          = var.labels
  }
}

resource "google_container_node_pool" "gpu_pool_blueprint" {
  name       = "gpu-pool-blueprint"
  location   = var.region
  cluster    = google_container_cluster.ml_platform.name
  node_count = 0

  autoscaling {
    min_node_count = 0
    max_node_count = 2
  }

  node_config {
    machine_type    = "g2-standard-4"
    service_account = google_service_account.ml_workload.email
    oauth_scopes    = ["https://www.googleapis.com/auth/cloud-platform"]
    labels          = merge(var.labels, { accelerator = "gpu" })

    guest_accelerator {
      type  = "nvidia-l4"
      count = 1
    }

    taint {
      key    = "nvidia.com/gpu"
      value  = "present"
      effect = "NO_SCHEDULE"
    }
  }
}
