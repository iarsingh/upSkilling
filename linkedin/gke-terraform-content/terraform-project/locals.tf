locals {
  required_services = [
    "aiplatform.googleapis.com",
    "artifactregistry.googleapis.com",
    "cloudkms.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "compute.googleapis.com",
    "container.googleapis.com",
    "dns.googleapis.com",
    "iam.googleapis.com",
    "logging.googleapis.com",
    "monitoring.googleapis.com",
    "secretmanager.googleapis.com",
    "servicenetworking.googleapis.com",
    "sqladmin.googleapis.com",
    "storage.googleapis.com"
  ]

  labels = {
    app         = "gke-mlops"
    environment = var.environment
    managed_by  = "terraform"
    owner       = var.owner
  }
}

