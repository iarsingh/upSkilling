variable "project_id" {
  type        = string
  description = "GCP project ID"
}

variable "region" {
  type        = string
  description = "GCP region"
  default     = "us-central1"
}

variable "aiops_alert_topic" {
  type        = string
  description = "Pub/Sub topic for Cloud Monitoring alert events"
  default     = "aiops-alerts"
}

variable "aiops_subscription" {
  type        = string
  description = "Pub/Sub subscription for the AIOps triage service"
  default     = "aiops-triage"
}

variable "artifact_repository" {
  type        = string
  description = "Artifact Registry repository for AIOps service containers"
  default     = "aiops-services"
}

variable "audit_bucket_suffix" {
  type        = string
  description = "Suffix for the AIOps audit bucket"
  default     = "aiops-audit"
}
