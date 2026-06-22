output "hub_cluster" {
  value = google_container_cluster.hub.name
}

output "artifact_repository" {
  value = google_artifact_registry_repository.ml_images.name
}

output "kms_key_ring" {
  value = google_kms_key_ring.healthcare.name
}
