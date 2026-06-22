variable "region" {
  type        = string
  default     = "us-central1"
  description = "GCP region"
}

variable "telemetry_topic" {
  type        = string
  default     = "finpulse-gpu-telemetry"
  description = "Pub/Sub topic for GPU and token telemetry"
}

variable "cost_dataset" {
  type        = string
  default     = "finpulse_cost_ledger"
  description = "BigQuery dataset for cost ledger"
}

variable "artifact_repository" {
  type        = string
  default     = "finpulse-services"
  description = "Artifact Registry repository"
}
