variable "project_id" {
  type        = string
  description = "GCP project ID used for the MLOps deployment."
}

variable "region" {
  type        = string
  description = "GCP region for regional resources."
  default     = "us-central1"
}

variable "resource_prefix" {
  type        = string
  description = "Prefix for MLOps resources."
  default     = "mlops-starter"
}

variable "labels" {
  type        = map(string)
  description = "Labels applied to managed resources."
  default = {
    managed_by = "terraform"
    workload   = "mlops"
  }
}
