variable "project_id" {
  type        = string
  description = "GCP project id."
}

variable "region" {
  type        = string
  default     = "us-central1"
  description = "Primary GCP region."
}

variable "cluster_name" {
  type        = string
  default     = "mlops-incident-copilot"
  description = "GKE cluster name."
}
