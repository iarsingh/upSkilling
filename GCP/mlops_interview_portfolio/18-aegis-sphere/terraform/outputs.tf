output "artifact_repository" {
  value = google_artifact_registry_repository.aegis_images.name
}

output "llm_secret" {
  value = google_secret_manager_secret.llm_provider_api_key.secret_id
}

output "aiops_event_topic" {
  value = google_pubsub_topic.aiops_events.name
}

output "metadata_database_instance" {
  value = google_sql_database_instance.metadata.name
}
