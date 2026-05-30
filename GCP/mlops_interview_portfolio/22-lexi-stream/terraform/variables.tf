variable "region" {
  type        = string
  default     = "us-central1"
  description = "GCP region"
}

variable "gateway_repository" {
  type        = string
  default     = "lexistream-gateway"
  description = "Artifact Registry repository"
}

variable "safety_token_secret" {
  type        = string
  default     = "lexistream-safety-tokens"
  description = "Secret Manager secret for safety tokens"
}

variable "metrics_topic" {
  type        = string
  default     = "lexistream-metrics"
  description = "Pub/Sub topic for gateway metrics"
}
