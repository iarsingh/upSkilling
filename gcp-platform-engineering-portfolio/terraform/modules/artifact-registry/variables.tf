variable "project_id" {
  type        = string
  description = "GCP project ID"
}

variable "region" {
  type        = string
  description = "GCP region"
}

variable "repository" {
  type        = string
  description = "Artifact Registry repository name"
}

variable "environment" {
  type        = string
  description = "Environment name"
}

