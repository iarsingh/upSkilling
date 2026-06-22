output "aiops_alert_topic" {
  value = google_pubsub_topic.aiops_alerts.name
}

output "aiops_subscription" {
  value = google_pubsub_subscription.aiops_triage.name
}

output "artifact_repository" {
  value = google_artifact_registry_repository.aiops_services.name
}

output "audit_bucket" {
  value = google_storage_bucket.aiops_audit.name
}
