output "gateway_repository" {
  value = google_artifact_registry_repository.gateway_images.name
}

output "safety_token_secret" {
  value = google_secret_manager_secret.safety_tokens.secret_id
}

output "metrics_topic" {
  value = google_pubsub_topic.gateway_metrics.name
}
