# Service account Jenkins uses to push images and deploy to GKE.
# Jenkins here runs outside GCP (local docker-compose), so it authenticates
# with this SA via a downloaded key (see outputs.tf) for this demo. In a
# real deployment, prefer Workload Identity Federation so no long-lived
# JSON key ever exists: https://cloud.google.com/iam/docs/workload-identity-federation
resource "google_service_account" "ci" {
  account_id   = "${var.ci_service_account_id}-${var.environment}"
  display_name = "Jenkins CI/CD (${var.environment})"
}

resource "google_project_iam_member" "ci_artifact_writer" {
  project = var.project_id
  role    = "roles/artifactregistry.writer"
  member  = "serviceAccount:${google_service_account.ci.email}"
}

resource "google_project_iam_member" "ci_gke_deployer" {
  project = var.project_id
  role    = "roles/container.developer"
  member  = "serviceAccount:${google_service_account.ci.email}"
}
