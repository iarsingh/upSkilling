resource "google_bigquery_dataset" "agent_telemetry" {
  dataset_id  = var.telemetry_dataset
  location    = var.region
  description = "OmniAgent token, latency, hallucination, and tool-loop telemetry"
}

resource "google_pubsub_topic" "agent_events" {
  name = var.agent_event_topic
}

resource "google_artifact_registry_repository" "agent_images" {
  location      = var.region
  repository_id = var.agent_repository
  description   = "OmniAgent gateway, vLLM, and agent runtime containers"
  format        = "DOCKER"
}

resource "google_secret_manager_secret" "database_credentials" {
  secret_id = var.database_secret_name

  replication {
    auto {}
  }
}
