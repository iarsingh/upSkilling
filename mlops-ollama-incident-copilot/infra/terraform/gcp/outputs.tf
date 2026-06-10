output "cluster_name" {
  value = google_container_cluster.primary.name
}

output "artifact_registry_repository" {
  value = google_artifact_registry_repository.containers.name
}

output "model_bucket" {
  value = google_storage_bucket.model_artifacts.name
}

output "pubsub_topic" {
  value = google_pubsub_topic.telemetry.name
}
