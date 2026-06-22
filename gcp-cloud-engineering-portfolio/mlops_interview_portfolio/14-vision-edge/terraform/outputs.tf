output "defect_image_bucket" {
  value = google_storage_bucket.defect_images.name
}

output "edge_model_repository" {
  value = google_artifact_registry_repository.edge_models.name
}

output "edge_telemetry_topic" {
  value = google_pubsub_topic.edge_telemetry.name
}
