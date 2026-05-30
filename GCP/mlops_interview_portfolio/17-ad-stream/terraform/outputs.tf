output "clickstream_topic" {
  value = google_pubsub_topic.clickstream.name
}

output "offline_feature_dataset" {
  value = google_bigquery_dataset.offline_features.dataset_id
}

output "online_feature_instance" {
  value = google_bigtable_instance.online_features.name
}

output "beam_repository" {
  value = google_artifact_registry_repository.beam_images.name
}
