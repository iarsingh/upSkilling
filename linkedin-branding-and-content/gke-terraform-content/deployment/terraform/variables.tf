variable "project_id" {
  description = "GCP project ID where the GKE MLOps platform will be deployed."
  type        = string
}

variable "region" {
  description = "GCP region for the regional GKE cluster."
  type        = string
  default     = "us-central1"
}

variable "cluster_name" {
  description = "Name of the GKE cluster."
  type        = string
  default     = "gke-mlops-platform"
}

variable "network_name" {
  description = "Name of the custom VPC."
  type        = string
  default     = "gke-mlops-vpc"
}

variable "subnet_cidr" {
  description = "Primary subnet CIDR for nodes."
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
  description = "CIDR block for the private GKE control plane."
  type        = string
  default     = "172.16.0.0/28"
}

variable "authorized_cidr_blocks" {
  description = "CIDR blocks allowed to access the public control-plane endpoint."
  type = list(object({
    cidr_block   = string
    display_name = string
  }))
  default = []
}

variable "enable_gpu_pool" {
  description = "Create an optional GPU node pool."
  type        = bool
  default     = false
}

variable "labels" {
  description = "Common labels applied to supported resources."
  type        = map(string)
  default = {
    app         = "gke-mlops"
    managed_by  = "terraform"
    environment = "learning"
  }
}

variable "enable_kms" {
  description = "Create a KMS key ring and crypto key for future secrets, disks, and artifact encryption."
  type        = bool
  default     = true
}

variable "enable_secret_manager" {
  description = "Create Secret Manager placeholders for MLOps platform secrets."
  type        = bool
  default     = true
}

variable "enable_mlflow_cloudsql" {
  description = "Create a private Cloud SQL PostgreSQL instance for MLflow metadata."
  type        = bool
  default     = false
}

variable "enable_cloud_dns" {
  description = "Create a private Cloud DNS zone for internal platform endpoints."
  type        = bool
  default     = false
}

variable "private_dns_domain" {
  description = "Private DNS domain for internal MLOps services."
  type        = string
  default     = "mlops.internal."
}

variable "mlflow_db_tier" {
  description = "Cloud SQL machine tier for the optional MLflow metadata database."
  type        = string
  default     = "db-custom-1-3840"
}

variable "notification_channels" {
  description = "Cloud Monitoring notification channel IDs for alert policies."
  type        = list(string)
  default     = []
}
