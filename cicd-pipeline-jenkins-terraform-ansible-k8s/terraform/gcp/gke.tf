resource "google_container_cluster" "quiz" {
  name     = "${var.cluster_name}-${var.environment}"
  location = var.zone
  project  = var.project_id

  network    = google_compute_network.quiz_vpc.id
  subnetwork = google_compute_subnetwork.quiz_subnet.id

  # Node pool is managed separately below so it can be resized/upgraded
  # independently of the control plane.
  remove_default_node_pool = true
  initial_node_count       = 1

  ip_allocation_policy {
    cluster_secondary_range_name  = "pods"
    services_secondary_range_name = "services"
  }

  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }

  release_channel {
    channel = "REGULAR"
  }

  # Istio (installed separately via istioctl/Helm, same as the local
  # minikube setup) needs plain Kubernetes networking underneath -- no
  # extra GKE-native mesh feature is enabled here to avoid conflicting
  # with the self-managed Istio control plane deployed by Ansible/Jenkins.
  deletion_protection = var.environment == "prod"
}

resource "google_container_node_pool" "primary" {
  name     = "${var.cluster_name}-${var.environment}-primary"
  location = var.zone
  cluster  = google_container_cluster.quiz.name
  project  = var.project_id

  initial_node_count = var.node_count

  autoscaling {
    min_node_count = var.min_node_count
    max_node_count = var.max_node_count
  }

  management {
    auto_repair  = true
    auto_upgrade = true
  }

  node_config {
    machine_type = var.machine_type
    disk_size_gb = 50
    disk_type    = "pd-standard"

    service_account = google_service_account.gke_nodes.email
    oauth_scopes    = ["https://www.googleapis.com/auth/cloud-platform"]

    workload_metadata_config {
      mode = "GKE_METADATA"
    }

    labels = {
      environment = var.environment
      app         = "quiz"
    }
  }
}

resource "google_service_account" "gke_nodes" {
  account_id   = "quiz-gke-nodes-${var.environment}"
  display_name = "GKE node service account (${var.environment})"
}

# Minimum roles a GKE node needs to pull images, write logs/metrics --
# deliberately not project-Editor.
resource "google_project_iam_member" "gke_nodes_log_writer" {
  project = var.project_id
  role    = "roles/logging.logWriter"
  member  = "serviceAccount:${google_service_account.gke_nodes.email}"
}

resource "google_project_iam_member" "gke_nodes_metric_writer" {
  project = var.project_id
  role    = "roles/monitoring.metricWriter"
  member  = "serviceAccount:${google_service_account.gke_nodes.email}"
}

resource "google_project_iam_member" "gke_nodes_artifact_reader" {
  project = var.project_id
  role    = "roles/artifactregistry.reader"
  member  = "serviceAccount:${google_service_account.gke_nodes.email}"
}
