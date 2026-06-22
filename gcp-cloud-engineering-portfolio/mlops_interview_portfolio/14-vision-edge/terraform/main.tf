resource "google_storage_bucket" "defect_images" {
  name                        = "${var.project_id}-${var.image_bucket_suffix}"
  location                    = var.region
  uniform_bucket_level_access = true
}

resource "google_artifact_registry_repository" "edge_models" {
  location      = var.region
  repository_id = var.edge_repository
  description   = "Optimized VisionEdge model containers"
  format        = "DOCKER"
}

resource "google_pubsub_topic" "edge_telemetry" {
  name = var.edge_telemetry_topic
}
