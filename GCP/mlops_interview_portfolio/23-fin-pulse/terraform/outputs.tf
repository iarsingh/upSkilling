output "gpu_telemetry_topic" {
  value = google_pubsub_topic.gpu_telemetry.name
}

output "cost_ledger_dataset" {
  value = google_bigquery_dataset.cost_ledger.dataset_id
}

output "artifact_repository" {
  value = google_artifact_registry_repository.finops_services.name
}
