resource "google_artifact_registry_repository" "aegis_images" {
  location      = var.region
  repository_id = var.artifact_repository
  description   = "AegisSphere RAG, agent, Triton, and fine-tuning containers"
  format        = "DOCKER"
}

resource "google_secret_manager_secret" "llm_provider_api_key" {
  secret_id = var.llm_secret_name

  replication {
    auto {}
  }
}

resource "google_pubsub_topic" "aiops_events" {
  name = var.aiops_event_topic
}

resource "google_sql_database_instance" "metadata" {
  name             = var.cloudsql_instance
  database_version = "POSTGRES_15"
  region           = var.region

  settings {
    tier = "db-f1-micro"
  }
}
