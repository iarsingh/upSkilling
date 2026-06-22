variable "project_id" {
  type        = string
  description = "GCP project ID."
}

variable "region" {
  type        = string
  description = "GCP region."
  default     = "us-central1"
}

variable "labels" {
  type        = map(string)
  description = "Common labels."
  default = {
    managed_by = "terraform"
    workload   = "vertex-monitoring"
  }
}
