variable "project_id" {
  type        = string
  description = "GCP project ID."
}

variable "region" {
  type        = string
  description = "Artifact Registry region."
  default     = "us-central1"
}
