variable "project_id" {
  description = "GCP project ID."
  type        = string
}

variable "region" {
  description = "GCP region for resources."
  type        = string
  default     = "us-central1"
}

variable "bigquery_dataset_id" {
  description = "BigQuery dataset for tabular ML features."
  type        = string
  default     = "vertex_tabular_ml_features"
}

variable "force_destroy" {
  description = "Delete bucket objects and BigQuery contents when destroying the stack."
  type        = bool
  default     = false
}

