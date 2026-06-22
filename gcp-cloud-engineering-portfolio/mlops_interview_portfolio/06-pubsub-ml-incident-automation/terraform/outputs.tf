output "alert_topic" {
  value       = google_pubsub_topic.ml_alerts.name
  description = "Pub/Sub topic for ML platform alerts."
}

output "incident_subscription" {
  value       = google_pubsub_subscription.incident_router.name
  description = "Subscription consumed by the incident router."
}

output "incident_router_service_account" {
  value       = google_service_account.incident_router.email
  description = "Service account for incident automation."
}
