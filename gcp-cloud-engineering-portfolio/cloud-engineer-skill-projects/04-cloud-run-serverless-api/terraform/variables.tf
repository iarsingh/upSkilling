variable "project_id" {
  type = string
}

variable "region" {
  type    = string
  default = "us-central1"
}

variable "image" {
  type        = string
  description = "Container image to deploy."
}

variable "environment" {
  type    = string
  default = "dev"
}

