variable "billing_account" {
  description = "Billing account ID used for new projects."
  type        = string
}

variable "org_id" {
  description = "GCP organization ID."
  type        = string
}

variable "prefix" {
  description = "Name prefix for folders and projects."
  type        = string
  default     = "skill-lab"
}

variable "region" {
  description = "Default GCP region."
  type        = string
  default     = "us-central1"
}

