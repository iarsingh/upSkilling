resource "google_bigquery_dataset" "llm_governance" {
  dataset_id  = var.bigquery_dataset
  location    = var.region
  description = "ShieldLLM prompt, response, token, and safety telemetry"
}

resource "google_pubsub_topic" "llm_telemetry" {
  name = var.telemetry_topic
}

resource "google_artifact_registry_repository" "gateway_images" {
  location      = var.region
  repository_id = var.gateway_repository
  format        = "DOCKER"
  description   = "ShieldLLM gateway containers"
}
