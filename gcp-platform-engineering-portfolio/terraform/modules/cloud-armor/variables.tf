variable "project_id" {
  type        = string
  description = "GCP project ID"
}

variable "name" {
  type        = string
  description = "Cloud Armor security policy name"
}

variable "address_name" {
  type        = string
  description = "Global IP address resource name"
}
