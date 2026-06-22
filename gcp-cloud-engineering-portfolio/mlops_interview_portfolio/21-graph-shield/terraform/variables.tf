variable "region" {
  type        = string
  default     = "us-central1"
  description = "GCP region"
}

variable "zone" {
  type        = string
  default     = "us-central1-a"
  description = "Bigtable zone"
}

variable "transaction_topic" {
  type        = string
  default     = "graphshield-transactions"
  description = "Pub/Sub topic for transaction events"
}

variable "bigtable_instance" {
  type        = string
  default     = "graphshield-adjacency"
  description = "Bigtable adjacency cache"
}

variable "artifact_repository" {
  type        = string
  default     = "graphshield-services"
  description = "Artifact Registry repository"
}
