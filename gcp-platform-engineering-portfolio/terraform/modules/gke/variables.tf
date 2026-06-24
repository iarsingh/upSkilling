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

variable "pods_range_name" {
  type        = string
  description = "Secondary range name for pods"
}

variable "services_range_name" {
  type        = string
  description = "Secondary range name for services"
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

variable "min_node_count" {
  type        = number
  description = "Minimum nodes per zone"
  default     = 1
}

variable "max_node_count" {
  type        = number
  description = "Maximum nodes per zone"
  default     = 5
}

variable "master_ipv4_cidr_block" {
  type        = string
  description = "Private control-plane CIDR"
  default     = "172.16.0.0/28"
}

variable "deletion_protection" {
  type        = bool
  description = "Protect the cluster from accidental deletion"
  default     = true
}
