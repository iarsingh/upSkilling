variable "project_id" {
  type        = string
  description = "GCP project ID"
}

variable "account_id" {
  type        = string
  description = "Service account ID"
}

variable "display_name" {
  type        = string
  description = "Service account display name"
}

variable "description" {
  type        = string
  description = "Service account description"
  default     = "Managed by Terraform"
}

variable "roles" {
  type        = list(string)
  description = "IAM roles to bind"
  default     = []
}

variable "workload_identity_namespace" {
  type        = string
  description = "Kubernetes namespace allowed to impersonate the service account"
  default     = null
}

variable "workload_identity_service_account" {
  type        = string
  description = "Kubernetes service account allowed to impersonate the GCP service account"
  default     = null
}
