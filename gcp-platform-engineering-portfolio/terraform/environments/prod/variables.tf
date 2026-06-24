variable "project_id" {
  type        = string
  description = "Globally unique GCP project ID"
}

variable "project_name" {
  type        = string
  description = "Human-readable GCP project name"
  default     = "Platform Engineering Production"
}

variable "create_project" {
  type        = bool
  description = "Create a new project. Set false to use an existing project."
  default     = false
}

variable "billing_account" {
  type        = string
  description = "Billing account ID required when creating a project"
  default     = null
  sensitive   = true
}

variable "org_id" {
  type        = string
  description = "Organization ID for project creation"
  default     = null
}

variable "folder_id" {
  type        = string
  description = "Folder ID for project creation"
  default     = null
}

variable "region" {
  type        = string
  description = "GCP region"
  default     = "us-central1"
}

variable "gke_machine_type" {
  type        = string
  description = "Machine type for the primary GKE node pool"
  default     = "e2-standard-4"
}
