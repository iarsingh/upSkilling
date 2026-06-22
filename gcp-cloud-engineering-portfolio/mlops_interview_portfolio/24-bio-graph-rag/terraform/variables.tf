variable "region" {
  type        = string
  default     = "us-central1"
  description = "GCP region"
}

variable "document_topic" {
  type        = string
  default     = "biograph-document-events"
  description = "Pub/Sub topic for document ingestion"
}

variable "audit_dataset" {
  type        = string
  default     = "biograph_audit"
  description = "BigQuery audit dataset"
}

variable "masking_rules_secret" {
  type        = string
  default     = "biograph-masking-rules"
  description = "Secret Manager secret for masking rules"
}
