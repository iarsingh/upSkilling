variable "project_id" {
  type        = string
  description = "GCP project ID"
}

variable "name" {
  type        = string
  description = "GKE cluster name"
}

variable "region" {
  type        = string
  description = "GCP region"
}

variable "network" {
  type        = string
  description = "VPC network name"
}

variable "subnetwork" {
  type        = string
  description = "Subnetwork name"
}

variable "environment" {
  type        = string
  description = "Environment name"
}

variable "machine_type" {
  type        = string
  description = "GKE node machine type"
  default     = "e2-standard-4"
}

variable "node_count" {
  type        = number
  description = "Number of nodes"
  default     = 2
}

