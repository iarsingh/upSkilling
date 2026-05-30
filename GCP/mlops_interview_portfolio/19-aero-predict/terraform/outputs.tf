output "telemetry_topic" {
  value = google_pubsub_topic.sensor_telemetry.name
}

output "fleet_lakehouse_dataset" {
  value = google_bigquery_dataset.fleet_lakehouse.dataset_id
}

output "online_feature_instance" {
  value = google_bigtable_instance.online_features.name
}

output "model_repository" {
  value = google_artifact_registry_repository.fleet_models.name
}
