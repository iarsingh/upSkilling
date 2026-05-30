variable "region" {
  type        = string
  default     = "us-central1"
  description = "GCP region"
}

variable "telemetry_dataset" {
  type        = string
  default     = "omni_agent_telemetry"
  description = "BigQuery dataset for agent telemetry"
}

variable "agent_event_topic" {
  type        = string
  default     = "omni-agent-events"
  description = "Pub/Sub topic for agent runtime events"
}

variable "agent_repository" {
  type        = string
  default     = "omni-agent-images"
  description = "Artifact Registry repository for agent containers"
}

variable "database_secret_name" {
  type        = string
  default     = "omni-agent-db-credentials"
  description = "Secret Manager secret for private database credentials"
}
