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

