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
  name        = "platform-dev"
  region      = var.region
  environment = "dev"
}

module "artifact_registry" {
  source      = "../../modules/artifact-registry"
  project_id  = var.project_id
  region      = var.region
  repository  = "platform"
  environment = "dev"
}

module "gke" {
  source      = "../../modules/gke"
  project_id  = var.project_id
  region      = var.region
  name        = "platform-dev-gke"
  network     = module.network.network_name
  subnetwork  = module.network.subnet_name
  environment = "dev"
}

