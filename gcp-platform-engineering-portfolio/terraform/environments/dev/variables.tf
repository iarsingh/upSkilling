variable "project_id" {
  type        = string
  description = "GCP project ID"
}

variable "project_name" {
  type        = string
  description = "Human-readable GCP project name"
  default     = "Platform Engineering Development"
}

variable "region" {
  type        = string
  description = "GCP region"
  default     = "us-central1"
}
