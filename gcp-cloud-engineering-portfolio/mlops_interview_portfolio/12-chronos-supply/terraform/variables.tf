variable "project_id" {
  type        = string
  description = "GCP project ID"
}

variable "region" {
  type        = string
  default     = "us-central1"
  description = "GCP region"
}

variable "artifact_bucket_suffix" {
  type        = string
  default     = "chronos-forecast-artifacts"
  description = "Suffix for forecast artifact bucket"
}

variable "bigquery_dataset" {
  type        = string
  default     = "chronos_supply"
  description = "BigQuery dataset for forecasting workloads"
}

variable "redis_instance_name" {
  type        = string
  default     = "chronos-inventory-cache"
  description = "Memorystore Redis instance name"
}
