variable "project_id" {
  type        = string
  description = "GCP project ID for the ML platform."
}

variable "region" {
  type        = string
  description = "GCP region."
  default     = "us-central1"
}

variable "cluster_name" {
  type        = string
  description = "GKE cluster name."
  default     = "ml-platform-gke"
}

variable "labels" {
  type        = map(string)
  description = "Common resource labels."
  default = {
    managed_by = "terraform"
    platform   = "mlops"
  }
}
