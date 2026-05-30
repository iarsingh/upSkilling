resource "google_container_cluster" "hub" {
  name     = var.hub_cluster_name
  location = var.region

  initial_node_count = 1
}

resource "google_artifact_registry_repository" "ml_images" {
  location      = var.region
  repository_id = var.artifact_repository
  description   = "ClearRoute secure ML workload images"
  format        = "DOCKER"
}

resource "google_kms_key_ring" "healthcare" {
  name     = var.kms_key_ring
  location = var.region
}
