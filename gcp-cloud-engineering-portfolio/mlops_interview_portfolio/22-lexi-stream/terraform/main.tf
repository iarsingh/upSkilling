resource "google_artifact_registry_repository" "gateway_images" {
  location      = var.region
  repository_id = var.gateway_repository
  description   = "LexiStream gateway containers"
  format        = "DOCKER"
}

resource "google_secret_manager_secret" "safety_tokens" {
  secret_id = var.safety_token_secret

  replication {
    auto {}
  }
}

resource "google_pubsub_topic" "gateway_metrics" {
  name = var.metrics_topic
}
