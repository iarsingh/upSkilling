terraform {
  required_version = ">= 1.6.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

module "project" {
  source = "../../modules/project"

  project_id     = var.project_id
  project_name   = var.project_name
  create_project = false
  labels = {
    environment = "dev"
    managed_by  = "terraform"
    owner       = "platform-team"
  }
}

module "network" {
  source = "../../modules/network"

  project_id  = var.project_id
  name        = "platform-dev"
  region      = var.region
  environment = "dev"

  depends_on = [module.project]
}

module "artifact_registry" {
  source = "../../modules/artifact-registry"

  project_id  = var.project_id
  region      = var.region
  repository  = "platform-dev"
  environment = "dev"

  depends_on = [module.project]
}

module "gke" {
  source = "../../modules/gke"

  project_id          = var.project_id
  region              = var.region
  name                = "platform-dev-gke"
  network             = module.network.network_name
  subnetwork          = module.network.subnet_name
  pods_range_name     = module.network.pods_range_name
  services_range_name = module.network.services_range_name
  environment         = "dev"
  machine_type        = "e2-standard-2"
  node_count          = 1
  min_node_count      = 1
  max_node_count      = 2
  deletion_protection = false
}
