output "transaction_topic" {
  value = google_pubsub_topic.transactions.name
}

output "graph_cache" {
  value = google_bigtable_instance.graph_cache.name
}

output "artifact_repository" {
  value = google_artifact_registry_repository.graph_services.name
}
