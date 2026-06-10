terraform {
  required_version = ">= 1.6.0"
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

resource "docker_network" "mlops" {
  name = "mlops-local"
}

resource "docker_volume" "postgres" {
  name = "mlops-postgres"
}

resource "docker_volume" "mlflow" {
  name = "mlops-mlflow"
}
