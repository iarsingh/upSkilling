resource "google_container_cluster" "main" {
  provider = google-beta

  name     = var.cluster_name
  location = var.region

  network    = google_compute_network.main.id
  subnetwork = google_compute_subnetwork.gke.id

  remove_default_node_pool = true
  initial_node_count       = 1
  deletion_protection      = true
  networking_mode          = "VPC_NATIVE"

  ip_allocation_policy {
    cluster_secondary_range_name  = "pods"
    services_secondary_range_name = "services"
  }

  private_cluster_config {
    enable_private_nodes    = true
    enable_private_endpoint = false
    master_ipv4_cidr_block  = var.master_ipv4_cidr_block
  }

  dynamic "master_authorized_networks_config" {
    for_each = length(var.authorized_cidr_blocks) > 0 ? [1] : []
    content {
      dynamic "cidr_blocks" {
        for_each = var.authorized_cidr_blocks
        content {
          cidr_block   = cidr_blocks.value.cidr_block
          display_name = cidr_blocks.value.display_name
        }
      }
    }
  }

  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }

  release_channel {
    channel = "REGULAR"
  }

  maintenance_policy {
    recurring_window {
      start_time = "2026-01-01T02:00:00Z"
      end_time   = "2026-01-01T06:00:00Z"
      recurrence = "FREQ=WEEKLY;BYDAY=SA"
    }
  }

  addons_config {
    http_load_balancing {
      disabled = false
    }

    horizontal_pod_autoscaling {
      disabled = false
    }

    gcp_filestore_csi_driver_config {
      enabled = true
    }
  }

  logging_config {
    enable_components = ["SYSTEM_COMPONENTS", "WORKLOADS"]
  }

  monitoring_config {
    enable_components = ["SYSTEM_COMPONENTS"]

    managed_prometheus {
      enabled = true
    }
  }

  network_policy {
    enabled  = true
    provider = "CALICO"
  }

  node_config {
    service_account = google_service_account.nodes.email
    oauth_scopes    = ["https://www.googleapis.com/auth/cloud-platform"]
  }

  resource_labels = local.labels

  depends_on = [
    google_compute_router_nat.nat,
    google_project_service.required
  ]
}

resource "google_container_node_pool" "system" {
  name     = "system-pool"
  cluster  = google_container_cluster.main.name
  location = var.region

  initial_node_count = 1

  autoscaling {
    min_node_count = 1
    max_node_count = 3
  }

  management {
    auto_repair  = true
    auto_upgrade = true
  }

  node_config {
    machine_type    = "e2-standard-4"
    service_account = google_service_account.nodes.email
    oauth_scopes    = ["https://www.googleapis.com/auth/cloud-platform"]
    labels          = merge(local.labels, { pool = "system" })

    shielded_instance_config {
      enable_secure_boot          = true
      enable_integrity_monitoring = true
    }
  }
}

resource "google_container_node_pool" "apps" {
  name     = "app-pool"
  cluster  = google_container_cluster.main.name
  location = var.region

  initial_node_count = 1

  autoscaling {
    min_node_count = 1
    max_node_count = 6
  }

  management {
    auto_repair  = true
    auto_upgrade = true
  }

  node_config {
    machine_type    = "e2-standard-4"
    service_account = google_service_account.nodes.email
    oauth_scopes    = ["https://www.googleapis.com/auth/cloud-platform"]
    labels          = merge(local.labels, { pool = "apps" })

    shielded_instance_config {
      enable_secure_boot          = true
      enable_integrity_monitoring = true
    }
  }
}

resource "google_container_node_pool" "spot_batch" {
  name     = "spot-batch-pool"
  cluster  = google_container_cluster.main.name
  location = var.region

  initial_node_count = 0

  autoscaling {
    min_node_count = 0
    max_node_count = 10
  }

  management {
    auto_repair  = true
    auto_upgrade = true
  }

  node_config {
    machine_type    = "e2-standard-8"
    service_account = google_service_account.nodes.email
    oauth_scopes    = ["https://www.googleapis.com/auth/cloud-platform"]
    spot            = true
    labels          = merge(local.labels, { pool = "spot-batch" })

    taint {
      key    = "workload"
      value  = "batch"
      effect = "NO_SCHEDULE"
    }

    shielded_instance_config {
      enable_secure_boot          = true
      enable_integrity_monitoring = true
    }
  }
}

resource "google_container_node_pool" "gpu" {
  count = var.enable_gpu_pool ? 1 : 0

  name     = "gpu-pool"
  cluster  = google_container_cluster.main.name
  location = var.region

  initial_node_count = 0

  autoscaling {
    min_node_count = 0
    max_node_count = 3
  }

  management {
    auto_repair  = true
    auto_upgrade = true
  }

  node_config {
    machine_type    = "g2-standard-8"
    service_account = google_service_account.nodes.email
    oauth_scopes    = ["https://www.googleapis.com/auth/cloud-platform"]
    labels          = merge(local.labels, { pool = "gpu" })

    guest_accelerator {
      type  = "nvidia-l4"
      count = 1

      gpu_driver_installation_config {
        gpu_driver_version = "LATEST"
      }
    }

    taint {
      key    = "accelerator"
      value  = "gpu"
      effect = "NO_SCHEDULE"
    }

    shielded_instance_config {
      enable_secure_boot          = true
      enable_integrity_monitoring = true
    }
  }
}

