resource "google_project" "this" {
  name            = var.name
  project_id      = var.project_id
  billing_account = var.billing_account
  folder_id       = var.folder_id
  labels = {
    managed_by = "terraform"
  }
}

