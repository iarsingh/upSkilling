variable "project_id" {
  description = "GCP project ID."
  type        = string
}

variable "region" {
  description = "Primary GCP region."
  type        = string
  default     = "us-central1"
}

variable "cluster_name" {
  description = "GKE cluster name."
  type        = string
  default     = "gke-mlops-platform"
}

variable "network_name" {
  description = "Custom VPC name."
  type        = string
  default     = "gke-mlops-vpc"
}

variable "subnet_cidr" {
  description = "Primary subnet CIDR for GKE nodes."
  type        = string
  default     = "10.10.0.0/20"
}

variable "pods_cidr" {
  description = "Secondary CIDR range for pods."
  type        = string
  default     = "10.20.0.0/16"
}

variable "services_cidr" {
  description = "Secondary CIDR range for services."
  type        = string
  default     = "10.30.0.0/20"
}

variable "master_ipv4_cidr_block" {
  description = "Private control-plane CIDR."
  type        = string
  default     = "172.16.0.0/28"
}

variable "authorized_cidr_blocks" {
  description = "CIDR blocks allowed to access the Kubernetes control plane."
  type = list(object({
    cidr_block   = string
    display_name = string
  }))
  default = []
}

variable "environment" {
  description = "Environment name."
  type        = string
  default     = "dev"
}

variable "owner" {
  description = "Platform owner label."
  type        = string
  default     = "platform"
}

variable "enable_gpu_pool" {
  description = "Create the optional GPU node pool."
  type        = bool
  default     = false
}

variable "enable_mlflow_cloudsql" {
  description = "Create private Cloud SQL PostgreSQL for MLflow metadata."
  type        = bool
  default     = false
}

variable "enable_private_dns" {
  description = "Create private Cloud DNS zone for internal MLOps endpoints."
  type        = bool
  default     = false
}

variable "private_dns_domain" {
  description = "Private DNS domain."
  type        = string
  default     = "mlops.internal."
}

variable "mlflow_db_tier" {
  description = "Cloud SQL machine tier for MLflow metadata."
  type        = string
  default     = "db-custom-1-3840"
}

variable "notification_channels" {
  description = "Cloud Monitoring notification channel IDs."
  type        = list(string)
  default     = []
}

