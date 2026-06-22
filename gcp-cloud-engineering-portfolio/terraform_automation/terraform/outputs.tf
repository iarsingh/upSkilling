output "state_bucket_name" {
  description = "GCS bucket used for Terraform remote state."
  value       = google_storage_bucket.state_bucket.name
}

output "artifact_bucket_name" {
  description = "GCS bucket for deployment artifacts."
  value       = google_storage_bucket.artifact_bucket.name
}

output "automation_service_account_email" {
  description = "Service account used by automation workflows."
  value       = google_service_account.automation.email
}

output "automation_events_topic" {
  description = "Pub/Sub topic for automation events."
  value       = google_pubsub_topic.automation_events.name
}
