variable "project_id" {
  type        = string
  description = "GCP project ID"
}

variable "region" {
  type        = string
  default     = "us-central1"
  description = "GCP region"
}

variable "image_bucket_suffix" {
  type        = string
  default     = "vision-edge-images"
  description = "Cloud Storage bucket suffix for defect images"
}

variable "edge_repository" {
  type        = string
  default     = "vision-edge-models"
  description = "Artifact Registry repository for edge containers"
}

variable "edge_telemetry_topic" {
  type        = string
  default     = "vision-edge-telemetry"
  description = "Pub/Sub topic for edge uncertainty and drift metrics"
}
