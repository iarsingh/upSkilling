variable "project_id" {
  type        = string
  description = "GCP project ID"
}

variable "region" {
  type        = string
  description = "Primary GCP region"
  default     = "us-central1"
}

variable "zone" {
  type        = string
  description = "Primary GCP zone"
  default     = "us-central1-a"
}

variable "environment" {
  type        = string
  description = "Environment label"
  default     = "prod"
}

variable "mlflow_database_password" {
  type        = string
  description = "MLflow Cloud SQL database password"
  sensitive   = true
}

variable "retrainer_image_uri" {
  type        = string
  description = "Artifact Registry URI for the Cloud Run retrainer image"
}

variable "training_image_uri" {
  type        = string
  description = "Artifact Registry URI used by Vertex AI custom training"
}
