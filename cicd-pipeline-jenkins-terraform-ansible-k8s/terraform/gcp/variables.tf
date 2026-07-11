variable "project_id" {
  description = "GCP project ID to deploy into."
  type        = string
}

variable "region" {
  description = "GCP region for the cluster and networking."
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "GCP zone for the GKE node pool."
  type        = string
  default     = "us-central1-a"
}

variable "environment" {
  description = "Deployment environment name, used in resource naming/labels."
  type        = string
  default     = "dev"
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "environment must be one of: dev, staging, prod."
  }
}

variable "cluster_name" {
  description = "Base name for the GKE cluster (environment is appended)."
  type        = string
  default     = "quiz-cluster"
}

variable "node_count" {
  description = "Initial node count for the primary node pool (autoscaling handles growth from here)."
  type        = number
  default     = 2
}

variable "min_node_count" {
  description = "Minimum nodes for cluster autoscaler."
  type        = number
  default     = 1
}

variable "max_node_count" {
  description = "Maximum nodes for cluster autoscaler."
  type        = number
  default     = 4
}

variable "machine_type" {
  description = "GCE machine type for GKE nodes."
  type        = string
  default     = "e2-standard-2"
}

variable "ci_service_account_id" {
  description = "Account ID (not email) for the Jenkins/CI service account."
  type        = string
  default     = "quiz-cicd"
}
