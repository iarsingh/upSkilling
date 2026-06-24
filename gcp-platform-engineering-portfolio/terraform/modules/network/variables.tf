variable "name" {
  type        = string
  description = "Network name prefix"
}

variable "project_id" {
  type        = string
  description = "GCP project ID"
}

variable "region" {
  type        = string
  description = "GCP region"
}

variable "environment" {
  type        = string
  description = "Environment name"
}

variable "subnet_cidr" {
  type        = string
  description = "Primary subnet CIDR"
  default     = "10.10.0.0/20"
}

variable "pods_cidr" {
  type        = string
  description = "Pod secondary CIDR"
  default     = "10.20.0.0/16"
}

variable "services_cidr" {
  type        = string
  description = "Service secondary CIDR"
  default     = "10.30.0.0/20"
}
