terraform {
  required_version = ">= 1.6.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.30"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

module "network" {
  source = "../../modules/network"
  name   = "dev-shared-vpc"
  region = var.region
  cidr   = "10.20.0.0/20"
}

