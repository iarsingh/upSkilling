provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_service_account" "mlops" {
  account_id   = "mlops-incident-copilot"
  display_name = "MLOps Incident Copilot"
}

resource "google_container_cluster" "primary" {
  name     = var.cluster_name
  location = var.region

  remove_default_node_pool = true
  initial_node_count       = 1

  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }
}

resource "google_container_node_pool" "cpu" {
  name       = "cpu-pool"
  location   = var.region
  cluster    = google_container_cluster.primary.name
  node_count = 2

  node_config {
    machine_type    = "e2-standard-4"
    service_account = google_service_account.mlops.email
    oauth_scopes    = ["https://www.googleapis.com/auth/cloud-platform"]
  }
}

resource "google_container_node_pool" "gpu" {
  name       = "gpu-pool"
  location   = var.region
  cluster    = google_container_cluster.primary.name
  node_count = 0

  autoscaling {
    min_node_count = 0
    max_node_count = 2
  }

  node_config {
    machine_type    = "n1-standard-8"
    service_account = google_service_account.mlops.email
    oauth_scopes    = ["https://www.googleapis.com/auth/cloud-platform"]

    guest_accelerator {
      type  = "nvidia-tesla-t4"
      count = 1
    }

    taint {
      key    = "nvidia.com/gpu"
      value  = "present"
      effect = "NO_SCHEDULE"
    }
  }
}

resource "google_artifact_registry_repository" "containers" {
  location      = var.region
  repository_id = "mlops-containers"
  format        = "DOCKER"
}

resource "google_storage_bucket" "model_artifacts" {
  name                        = "${var.project_id}-incident-copilot-models"
  location                    = var.region
  uniform_bucket_level_access = true
}

resource "google_pubsub_topic" "telemetry" {
  name = "incident-telemetry"
}
