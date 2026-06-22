variable "project_id" {
  type        = string
  description = "GCP project ID used for deployment."
}

variable "region" {
  type        = string
  description = "GCP region for resources."
  default     = "us-central1"
}

variable "backend_bucket" {
  type        = string
  description = "GCS bucket name for remote Terraform state."
}

variable "backend_prefix" {
  type        = string
  description = "GCS backend prefix for Terraform state."
  default     = "terraform/state"
}

variable "labels" {
  type        = map(string)
  description = "Labels applied to managed resources."
  default = {
    managed_by = "terraform"
    project    = "terraform-automation"
  }
}
