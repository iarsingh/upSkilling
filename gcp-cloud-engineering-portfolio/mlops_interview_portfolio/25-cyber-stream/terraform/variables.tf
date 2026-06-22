variable "region" {
  type        = string
  default     = "us-central1"
  description = "GCP region"
}

variable "security_event_topic" {
  type        = string
  default     = "cyberstream-security-events"
  description = "Pub/Sub topic for security events"
}

variable "threat_dataset" {
  type        = string
  default     = "cyberstream_threat_analytics"
  description = "BigQuery dataset for threat analytics"
}

variable "threat_repository" {
  type        = string
  default     = "cyberstream-engines"
  description = "Artifact Registry repository"
}
