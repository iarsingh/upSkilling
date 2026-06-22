terraform {
  required_version = ">= 1.6.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.30"
    }
  }
}

provider "google" {
  region = var.region
}

resource "google_folder" "platform" {
  display_name = "${var.prefix}-platform"
  parent       = "organizations/${var.org_id}"
}

resource "google_project" "env" {
  for_each        = toset(["dev", "stage", "prod"])
  name            = "${var.prefix}-${each.key}"
  project_id      = "${var.prefix}-${each.key}"
  folder_id       = google_folder.platform.name
  billing_account = var.billing_account
  labels = {
    env     = each.key
    managed = "terraform"
  }
}

resource "google_service_account" "deployer" {
  for_each     = google_project.env
  project      = each.value.project_id
  account_id   = "platform-deployer"
  display_name = "Platform deployment service account"
}

resource "google_project_iam_member" "deployer_log_writer" {
  for_each = google_project.env
  project  = each.value.project_id
  role     = "roles/logging.logWriter"
  member   = "serviceAccount:${google_service_account.deployer[each.key].email}"
}

resource "google_org_policy_policy" "disable_sa_key_creation" {
  name   = "organizations/${var.org_id}/policies/iam.disableServiceAccountKeyCreation"
  parent = "organizations/${var.org_id}"
  spec {
    rules {
      enforce = "TRUE"
    }
  }
}

