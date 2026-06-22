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

resource "google_service_account_iam_member" "workload_identity_mlops" {
  service_account_id = google_service_account.ml_workloads.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "serviceAccount:${var.project_id}.svc.id.goog[mlops/model-serving]"
}

