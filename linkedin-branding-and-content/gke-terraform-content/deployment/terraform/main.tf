locals {
  services = [
    "compute.googleapis.com",
    "container.googleapis.com",
    "artifactregistry.googleapis.com",
    "iam.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "monitoring.googleapis.com",
    "logging.googleapis.com",
    "storage.googleapis.com",
    "aiplatform.googleapis.com",
    "cloudkms.googleapis.com",
    "secretmanager.googleapis.com",
    "sqladmin.googleapis.com",
    "servicenetworking.googleapis.com",
    "dns.googleapis.com"
  ]
}

resource "google_project_service" "required" {
  for_each = toset(local.services)

  project            = var.project_id
  service            = each.value
  disable_on_destroy = false
}

resource "google_compute_network" "main" {
  name                    = var.network_name
  auto_create_subnetworks = false

  depends_on = [google_project_service.required]
}

resource "google_compute_subnetwork" "gke" {
  name          = "${var.network_name}-${var.region}-subnet"
  ip_cidr_range = var.subnet_cidr
  region        = var.region
  network       = google_compute_network.main.id

  secondary_ip_range {
    range_name    = "pods"
    ip_cidr_range = var.pods_cidr
  }

  secondary_ip_range {
    range_name    = "services"
    ip_cidr_range = var.services_cidr
  }

  private_ip_google_access = true
}

resource "google_compute_router" "nat_router" {
  name    = "${var.cluster_name}-router"
  region  = var.region
  network = google_compute_network.main.id
}

resource "google_compute_router_nat" "nat" {
  name                               = "${var.cluster_name}-nat"
  router                             = google_compute_router.nat_router.name
  region                             = var.region
  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "LIST_OF_SUBNETWORKS"

  subnetwork {
    name                    = google_compute_subnetwork.gke.id
    source_ip_ranges_to_nat = ["PRIMARY_IP_RANGE", "LIST_OF_SECONDARY_IP_RANGES"]

    secondary_ip_range_names = [
      "pods",
      "services"
    ]
  }
}

resource "google_service_account" "cluster" {
  account_id   = "${var.cluster_name}-cluster"
  display_name = "GKE cluster service account"
}

resource "google_service_account" "nodes" {
  account_id   = "${var.cluster_name}-nodes"
  display_name = "GKE node service account"
}

resource "google_service_account" "ml_workloads" {
  account_id   = "${var.cluster_name}-ml"
  display_name = "GKE MLOps workload service account"
}

resource "google_project_iam_member" "node_logging" {
  project = var.project_id
  role    = "roles/logging.logWriter"
  member  = "serviceAccount:${google_service_account.nodes.email}"
}

resource "google_project_iam_member" "node_monitoring" {
  project = var.project_id
  role    = "roles/monitoring.metricWriter"
  member  = "serviceAccount:${google_service_account.nodes.email}"
}

resource "google_project_iam_member" "node_artifact_reader" {
  project = var.project_id
  role    = "roles/artifactregistry.reader"
  member  = "serviceAccount:${google_service_account.nodes.email}"
}

resource "google_artifact_registry_repository" "containers" {
  location      = var.region
  repository_id = "mlops-containers"
  description   = "Container images for GKE MLOps workloads"
  format        = "DOCKER"
  labels        = var.labels

  depends_on = [google_project_service.required]
}

resource "google_storage_bucket" "model_artifacts" {
  name                        = "${var.project_id}-gke-mlops-model-artifacts"
  location                    = var.region
  uniform_bucket_level_access = true
  force_destroy               = false
  labels                      = var.labels

  versioning {
    enabled = true
  }
}

resource "google_storage_bucket_iam_member" "ml_model_artifact_reader" {
  bucket = google_storage_bucket.model_artifacts.name
  role   = "roles/storage.objectViewer"
  member = "serviceAccount:${google_service_account.ml_workloads.email}"
}

resource "google_storage_bucket_iam_member" "ml_model_artifact_writer" {
  bucket = google_storage_bucket.model_artifacts.name
  role   = "roles/storage.objectCreator"
  member = "serviceAccount:${google_service_account.ml_workloads.email}"
}

resource "google_container_cluster" "main" {
  provider = google-beta

  name     = var.cluster_name
  location = var.region

  network    = google_compute_network.main.id
  subnetwork = google_compute_subnetwork.gke.id

  remove_default_node_pool = true
  initial_node_count       = 1
  deletion_protection      = true

  networking_mode = "VPC_NATIVE"

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

  database_encryption {
    state = "DECRYPTED"
  }

  node_config {
    service_account = google_service_account.nodes.email
    oauth_scopes    = ["https://www.googleapis.com/auth/cloud-platform"]
  }

  resource_labels = var.labels

  depends_on = [
    google_project_service.required,
    google_compute_router_nat.nat
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
    labels          = merge(var.labels, { pool = "system" })

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
    labels          = merge(var.labels, { pool = "apps" })

    shielded_instance_config {
      enable_secure_boot          = true
      enable_integrity_monitoring = true
    }
  }
}

resource "google_container_node_pool" "spot" {
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
    labels          = merge(var.labels, { pool = "spot-batch" })

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
    labels          = merge(var.labels, { pool = "gpu" })

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

resource "google_service_account_iam_member" "workload_identity_mlops" {
  service_account_id = google_service_account.ml_workloads.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "serviceAccount:${var.project_id}.svc.id.goog[mlops/model-serving]"
}
