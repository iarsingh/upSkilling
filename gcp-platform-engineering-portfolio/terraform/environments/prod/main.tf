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

module "network" {
  source      = "../../modules/network"
  name        = "platform-prod"
  region      = var.region
  environment = "prod"
}

module "artifact_registry" {
  source      = "../../modules/artifact-registry"
  project_id  = var.project_id
  region      = var.region
  repository  = "platform"
  environment = "prod"
}

module "gke" {
  source      = "../../modules/gke"
  project_id  = var.project_id
  region      = var.region
  name        = "platform-prod-gke"
  network     = module.network.network_name
  subnetwork  = module.network.subnet_name
  environment = "prod"
}

