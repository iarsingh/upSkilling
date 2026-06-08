project_id   = "your-dev-gcp-project-id"
region       = "us-central1"
cluster_name = "gke-mlops-dev"

authorized_cidr_blocks = [
  {
    cidr_block   = "203.0.113.10/32"
    display_name = "developer-vpn"
  }
]

enable_gpu_pool        = false
enable_kms             = true
enable_secret_manager  = true
enable_mlflow_cloudsql = false
enable_cloud_dns       = false

labels = {
  app         = "gke-mlops"
  managed_by  = "terraform"
  environment = "dev"
  owner       = "platform"
}

