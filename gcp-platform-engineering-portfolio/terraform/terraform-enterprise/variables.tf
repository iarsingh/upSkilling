variable "hostname" {
  type        = string
  description = "Terraform Enterprise hostname"
  default     = "app.terraform.io"
}

variable "organization" {
  type        = string
  description = "Terraform Enterprise organization"
}

variable "workspace_name" {
  type        = string
  description = "Production workspace name"
  default     = "gcp-platform-production"
}

variable "terraform_version" {
  type        = string
  description = "Terraform version used by remote runs"
  default     = "1.9.8"
}

variable "github_repository" {
  type        = string
  description = "GitHub repository in owner/repository format"
}

variable "oauth_token_id" {
  type        = string
  description = "Terraform Enterprise VCS OAuth token ID"
  sensitive   = true
}

variable "gcp_project_id" {
  type        = string
  description = "Production GCP project ID"
}

variable "gcp_region" {
  type        = string
  description = "Production GCP region"
  default     = "us-central1"
}
