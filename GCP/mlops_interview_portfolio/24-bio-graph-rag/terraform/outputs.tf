output "document_topic" {
  value = google_pubsub_topic.document_events.name
}

output "biomedical_audit_dataset" {
  value = google_bigquery_dataset.biomedical_audit.dataset_id
}

output "masking_rules_secret" {
  value = google_secret_manager_secret.masking_rules.secret_id
}
