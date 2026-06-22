output "llm_governance_dataset" {
  value = google_bigquery_dataset.llm_governance.dataset_id
}

output "llm_telemetry_topic" {
  value = google_pubsub_topic.llm_telemetry.name
}

output "gateway_repository" {
  value = google_artifact_registry_repository.gateway_images.name
}
