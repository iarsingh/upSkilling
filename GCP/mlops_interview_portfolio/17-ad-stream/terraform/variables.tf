variable "region" {
  type        = string
  default     = "us-central1"
  description = "GCP region"
}

variable "zone" {
  type        = string
  default     = "us-central1-a"
  description = "GCP zone for Bigtable development cluster"
}

variable "clickstream_topic" {
  type        = string
  default     = "adstream-clickstream"
  description = "Pub/Sub topic for clickstream events"
}

variable "offline_feature_dataset" {
  type        = string
  default     = "adstream_offline_features"
  description = "BigQuery dataset for offline features"
}

variable "bigtable_instance" {
  type        = string
  default     = "adstream-online-features"
  description = "Bigtable instance for online features"
}

variable "beam_repository" {
  type        = string
  default     = "adstream-beam"
  description = "Artifact Registry repository for Beam and model images"
}
