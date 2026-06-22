resource "google_artifact_registry_repository" "containers" {
  location      = var.region
  repository_id = "mlops-containers"
  description   = "Container images for GKE MLOps workloads"
  format        = "DOCKER"
  labels        = local.labels

  depends_on = [google_project_service.required]
}

resource "google_storage_bucket" "model_artifacts" {
  name                        = "${var.project_id}-${var.environment}-gke-mlops-model-artifacts"
  location                    = var.region
  uniform_bucket_level_access = true
  force_destroy               = false
  labels                      = local.labels

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

resource "google_kms_key_ring" "mlops" {
  name     = "${var.cluster_name}-keys"
  location = var.region

  depends_on = [google_project_service.required]
}

resource "google_kms_crypto_key" "mlops" {
  name            = "mlops-platform"
  key_ring        = google_kms_key_ring.mlops.id
  rotation_period = "7776000s"

  lifecycle {
    prevent_destroy = true
  }
}

