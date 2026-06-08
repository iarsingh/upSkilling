project_id   = "your-dev-gcp-project-id"
region       = "us-central1"
environment  = "dev"
cluster_name = "gke-mlops-dev"
network_name = "gke-mlops-dev-vpc"
owner        = "platform"

authorized_cidr_blocks = [
  {
    cidr_block   = "203.0.113.10/32"
    display_name = "developer-vpn"
  }
]

enable_gpu_pool        = false
enable_mlflow_cloudsql = false
enable_private_dns     = false

