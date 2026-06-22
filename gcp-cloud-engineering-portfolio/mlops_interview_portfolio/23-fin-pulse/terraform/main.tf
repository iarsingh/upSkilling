resource "google_pubsub_topic" "gpu_telemetry" {
  name = var.telemetry_topic
}

resource "google_bigquery_dataset" "cost_ledger" {
  dataset_id  = var.cost_dataset
  location    = var.region
  description = "FinPulse token, latency, GPU utilization, and cost telemetry"
}

resource "google_artifact_registry_repository" "finops_services" {
  location      = var.region
  repository_id = var.artifact_repository
  description   = "FinPulse gateway and scheduler containers"
  format        = "DOCKER"
}
