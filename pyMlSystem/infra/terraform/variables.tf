variable "project_id" {
  description = "Existing billing-enabled GCP project. Nothing is provisioned by local setup."
  type        = string
}
variable "region" {
  type    = string
  default = "us-central1"
}
variable "name" {
  type    = string
  default = "incident-ops"
}
variable "operator_cidr" {
  description = "Trusted operator or CI runner public CIDR allowed to reach the control plane."
  type        = string
  validation {
    condition     = can(cidrhost(var.operator_cidr, 0)) && var.operator_cidr != "0.0.0.0/0"
    error_message = "Use a restricted valid operator CIDR."
  }
}
