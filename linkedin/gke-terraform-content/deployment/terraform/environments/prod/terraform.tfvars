project_id   = "your-prod-gcp-project-id"
region       = "us-central1"
cluster_name = "gke-mlops-prod"

authorized_cidr_blocks = [
  {
    cidr_block   = "198.51.100.10/32"
    display_name = "corp-vpn"
  }
]

enable_gpu_pool        = true
enable_kms             = true
enable_secret_manager  = true
enable_mlflow_cloudsql = true
enable_cloud_dns       = true
private_dns_domain     = "mlops.internal."

labels = {
  app         = "gke-mlops"
  managed_by  = "terraform"
  environment = "prod"
  owner       = "platform"
}

