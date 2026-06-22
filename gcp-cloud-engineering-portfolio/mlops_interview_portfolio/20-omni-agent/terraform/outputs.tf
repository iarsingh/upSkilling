output "agent_telemetry_dataset" {
  value = google_bigquery_dataset.agent_telemetry.dataset_id
}

output "agent_event_topic" {
  value = google_pubsub_topic.agent_events.name
}

output "agent_repository" {
  value = google_artifact_registry_repository.agent_images.name
}

output "database_secret" {
  value = google_secret_manager_secret.database_credentials.secret_id
}
