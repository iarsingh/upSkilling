variable "region" {
  type        = string
  default     = "us-central1"
  description = "GCP region"
}

variable "bigquery_dataset" {
  type        = string
  default     = "shield_llm_governance"
  description = "BigQuery dataset for LLM governance telemetry"
}

variable "telemetry_topic" {
  type        = string
  default     = "shield-llm-telemetry"
  description = "Pub/Sub telemetry topic"
}

variable "gateway_repository" {
  type        = string
  default     = "shield-llm-gateway"
  description = "Artifact Registry repository for gateway images"
}
