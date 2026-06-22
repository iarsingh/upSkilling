resource "google_pubsub_topic" "security_events" {
  name = var.security_event_topic
}

resource "google_bigquery_dataset" "threat_analytics" {
  dataset_id  = var.threat_dataset
  location    = var.region
  description = "CyberStream threat features, drift metrics, and deployment comparisons"
}

resource "google_artifact_registry_repository" "threat_engines" {
  location      = var.region
  repository_id = var.threat_repository
  description   = "CyberStream threat engine and model containers"
  format        = "DOCKER"
}
