resource "google_artifact_registry_repository" "quiz" {
  project       = var.project_id
  location      = var.region
  repository_id = "quiz-${var.environment}"
  format        = "DOCKER"
  description   = "quiz-api / quiz-web container images (${var.environment})"

  cleanup_policies {
    id     = "keep-last-20"
    action = "KEEP"
    most_recent_versions {
      keep_count = 20
    }
  }
}
