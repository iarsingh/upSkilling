variable "project_id" {
  type        = string
  description = "GCP project ID"
}

variable "region" {
  type        = string
  description = "GCP region"
  default     = "us-central1"
}

variable "artifact_repository" {
  type        = string
  description = "Artifact Registry repository for Hugging Face serving images"
  default     = "ml-serving"
}

variable "artifact_bucket_suffix" {
  type        = string
  description = "Suffix for the LLMOps artifact bucket"
  default     = "llmops-artifacts"
}

variable "prediction_log_dataset" {
  type        = string
  description = "BigQuery dataset for prediction logs"
  default     = "llmops_prediction_logs"
}

variable "alert_topic" {
  type        = string
  description = "Pub/Sub topic for LLMOps monitoring alerts"
  default     = "llmops-alerts"
}
