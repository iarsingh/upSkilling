resource "google_artifact_registry_repository" "this" {
  project       = var.project_id
  location      = var.region
  repository_id = var.repository
  description   = "Container images for ${var.environment} platform workloads"
  format        = "DOCKER"

  cleanup_policy_dry_run = true

  cleanup_policies {
    id     = "delete-untagged"
    action = "DELETE"

    condition {
      tag_state  = "UNTAGGED"
      older_than = "2592000s"
    }
  }
}
