variable "region" {
  type        = string
  default     = "us-central1"
  description = "GCP region"
}

variable "artifact_repository" {
  type        = string
  default     = "aegis-sphere-images"
  description = "Artifact Registry repository for platform containers"
}

variable "llm_secret_name" {
  type        = string
  default     = "llm-provider-api-key"
  description = "Secret Manager secret for external LLM provider credentials"
}

variable "aiops_event_topic" {
  type        = string
  default     = "aegis-aiops-events"
  description = "Pub/Sub topic for self-healing events"
}

variable "cloudsql_instance" {
  type        = string
  default     = "aegis-metadata"
  description = "Cloud SQL instance for platform metadata services"
}
