variable "region" {
  type        = string
  default     = "us-central1"
  description = "GCP region"
}

variable "zone" {
  type        = string
  default     = "us-central1-a"
  description = "GCP zone for Bigtable"
}

variable "telemetry_topic" {
  type        = string
  default     = "aero-predict-telemetry"
  description = "Pub/Sub topic for sensor telemetry"
}

variable "bigquery_dataset" {
  type        = string
  default     = "aero_predict_lakehouse"
  description = "BigQuery dataset for historical telemetry"
}

variable "bigtable_instance" {
  type        = string
  default     = "aero-predict-online-features"
  description = "Bigtable instance for online features"
}

variable "model_repository" {
  type        = string
  default     = "aero-predict-models"
  description = "Artifact Registry repository for model containers"
}
