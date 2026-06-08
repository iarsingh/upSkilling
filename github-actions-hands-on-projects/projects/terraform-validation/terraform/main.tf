terraform {
  required_version = ">= 1.6.0"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

locals {
  labels = {
    environment = var.environment
    managed_by  = "terraform"
  }
}

output "labels" {
  value = local.labels
}

