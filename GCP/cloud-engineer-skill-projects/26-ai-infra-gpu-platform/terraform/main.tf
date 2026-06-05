terraform {
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

resource "google_container_node_pool" "gpu" {
  name     = "gpu-pool"
  location = var.region
  cluster  = var.cluster_name

  autoscaling {
    min_node_count = 0
    max_node_count = 2
  }

  node_config {
    machine_type = "g2-standard-4"
    guest_accelerator {
      type  = "nvidia-l4"
      count = 1
    }
    taint {
      key    = "nvidia.com/gpu"
      value  = "present"
      effect = "NO_SCHEDULE"
    }
    oauth_scopes = ["https://www.googleapis.com/auth/cloud-platform"]
  }
}

