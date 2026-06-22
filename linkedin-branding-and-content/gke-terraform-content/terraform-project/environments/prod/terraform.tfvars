project_id   = "your-prod-gcp-project-id"
region       = "us-central1"
environment  = "prod"
cluster_name = "gke-mlops-prod"
network_name = "gke-mlops-prod-vpc"
owner        = "platform"

authorized_cidr_blocks = [
  {
    cidr_block   = "198.51.100.10/32"
    display_name = "corp-vpn"
  }
]

enable_gpu_pool        = true
enable_mlflow_cloudsql = true
enable_private_dns     = true
private_dns_domain     = "mlops.internal."

