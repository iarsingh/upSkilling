variable "project_id" {
  type        = string
  description = "Globally unique GCP project ID"
}

variable "project_name" {
  type        = string
  description = "Human-readable project name"
}

variable "create_project" {
  type        = bool
  description = "Create the project instead of using an existing project"
  default     = false
}

variable "billing_account" {
  type        = string
  description = "Billing account ID used when creating the project"
  default     = null
}

variable "org_id" {
  type        = string
  description = "Organization ID for the new project"
  default     = null
}

variable "folder_id" {
  type        = string
  description = "Folder ID for the new project"
  default     = null
}

variable "labels" {
  type        = map(string)
  description = "Project labels"
  default     = {}
}

variable "services" {
  type        = list(string)
  description = "Google APIs to enable"
  default = [
    "artifactregistry.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "compute.googleapis.com",
    "container.googleapis.com",
    "iam.googleapis.com",
    "iamcredentials.googleapis.com",
    "logging.googleapis.com",
    "monitoring.googleapis.com",
    "serviceusage.googleapis.com",
    "sts.googleapis.com",
  ]
}
