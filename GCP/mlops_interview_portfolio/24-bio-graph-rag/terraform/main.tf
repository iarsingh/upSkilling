resource "google_pubsub_topic" "document_events" {
  name = var.document_topic
}

resource "google_bigquery_dataset" "biomedical_audit" {
  dataset_id  = var.audit_dataset
  location    = var.region
  description = "BioGraphRAG ingestion, retrieval, and evaluation audit logs"
}

resource "google_secret_manager_secret" "masking_rules" {
  secret_id = var.masking_rules_secret

  replication {
    auto {}
  }
}
