output "security_event_topic" {
  value = google_pubsub_topic.security_events.name
}

output "threat_analytics_dataset" {
  value = google_bigquery_dataset.threat_analytics.dataset_id
}

output "threat_repository" {
  value = google_artifact_registry_repository.threat_engines.name
}
