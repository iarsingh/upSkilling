variable "project_id" {
  type        = string
  description = "GCP project ID"
}

variable "region" {
  type        = string
  description = "GCP region"
  default     = "us-central1"
}

variable "pipeline_artifact_bucket_suffix" {
  type        = string
  description = "Suffix for the Vertex AI pipeline artifact bucket"
  default     = "vertex-mlops-artifacts"
}

variable "training_dataset" {
  type        = string
  description = "BigQuery dataset for training snapshots"
  default     = "ml_training"
}

variable "prediction_log_dataset" {
  type        = string
  description = "BigQuery dataset for prediction logs and monitoring signals"
  default     = "ml_prediction_logs"
}

variable "training_repository" {
  type        = string
  description = "Artifact Registry repository for ML training containers"
  default     = "ml-training"
}

variable "mlops_event_topic" {
  type        = string
  description = "Pub/Sub topic for release, monitoring, and retraining events"
  default     = "mlops-events"
}
