resource "google_service_account" "this" {
  project      = var.project_id
  account_id   = var.account_id
  display_name = var.display_name
}

output "email" {
  value = google_service_account.this.email
}

