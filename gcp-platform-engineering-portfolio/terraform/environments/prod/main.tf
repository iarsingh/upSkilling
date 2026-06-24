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

  project_id      = var.project_id
  project_name    = var.project_name
  create_project  = var.create_project
  billing_account = var.billing_account
  org_id          = var.org_id
  folder_id       = var.folder_id
  labels = {
    environment = "prod"
    managed_by  = "terraform"
    owner       = "platform-team"
  }
}

module "network" {
  source = "../../modules/network"

  project_id  = var.project_id
  name        = "platform-prod"
  region      = var.region
  environment = "prod"

  depends_on = [module.project]
}

module "artifact_registry" {
  source = "../../modules/artifact-registry"

  project_id  = var.project_id
  region      = var.region
  repository  = "platform"
  environment = "prod"

  depends_on = [module.project]
}

module "workload_identity" {
  source = "../../modules/iam"

  project_id                        = var.project_id
  account_id                        = "platform-app"
  display_name                      = "Platform sample API"
  roles                             = ["roles/monitoring.metricWriter"]
  workload_identity_namespace       = "platform-demo"
  workload_identity_service_account = "platform-sample-api"

  depends_on = [module.project]
}

module "cloud_armor" {
  source = "../../modules/cloud-armor"

  project_id   = var.project_id
  name         = "platform-prod-armor"
  address_name = "platform-sample-api"

  depends_on = [module.project]
}

module "gke" {
  source = "../../modules/gke"

  project_id          = var.project_id
  region              = var.region
  name                = "platform-prod-gke"
  network             = module.network.network_name
  subnetwork          = module.network.subnet_name
  pods_range_name     = module.network.pods_range_name
  services_range_name = module.network.services_range_name
  environment         = "prod"
  machine_type        = var.gke_machine_type
  node_count          = 1
  min_node_count      = 1
  max_node_count      = 5
  deletion_protection = true
}
