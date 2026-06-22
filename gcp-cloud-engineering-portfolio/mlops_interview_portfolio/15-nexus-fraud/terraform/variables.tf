variable "project_id" {
  type        = string
  description = "GCP project ID"
}

variable "region" {
  type        = string
  default     = "us-central1"
  description = "GCP region"
}

variable "transaction_topic" {
  type        = string
  default     = "nexus-fraud-transactions"
  description = "Pub/Sub topic for transaction events"
}

variable "bigquery_dataset" {
  type        = string
  default     = "nexus_fraud"
  description = "BigQuery dataset for fraud analytics"
}

variable "audit_bucket_suffix" {
  type        = string
  default     = "nexus-fraud-audit"
  description = "Audit bucket suffix"
}

variable "model_repository" {
  type        = string
  default     = "nexus-fraud-models"
  description = "Artifact Registry repository for fraud model containers"
}
