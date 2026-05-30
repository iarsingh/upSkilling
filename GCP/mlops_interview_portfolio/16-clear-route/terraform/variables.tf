variable "region" {
  type        = string
  default     = "us-central1"
  description = "GCP region"
}

variable "hub_cluster_name" {
  type        = string
  default     = "clearroute-hub"
  description = "GKE Enterprise hub cluster name"
}

variable "artifact_repository" {
  type        = string
  default     = "clearroute-ml-images"
  description = "Artifact Registry repository for ML images"
}

variable "kms_key_ring" {
  type        = string
  default     = "clearroute-healthcare"
  description = "KMS key ring for healthcare workloads"
}
