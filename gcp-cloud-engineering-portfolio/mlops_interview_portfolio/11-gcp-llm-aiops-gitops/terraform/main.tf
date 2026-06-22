resource "google_pubsub_topic" "aiops_alerts" {
  name = var.aiops_alert_topic
}

resource "google_pubsub_subscription" "aiops_triage" {
  name  = var.aiops_subscription
  topic = google_pubsub_topic.aiops_alerts.name
}

resource "google_artifact_registry_repository" "aiops_services" {
  location      = var.region
  repository_id = var.artifact_repository
  description   = "AIOps triage and GitOps remediation service images"
  format        = "DOCKER"
}

resource "google_storage_bucket" "aiops_audit" {
  name                        = "${var.project_id}-${var.audit_bucket_suffix}"
  location                    = var.region
  uniform_bucket_level_access = true
}
