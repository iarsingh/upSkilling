terraform {
  required_version = ">= 1.6.0"

  required_providers {
    tfe = {
      source  = "hashicorp/tfe"
      version = "~> 0.62"
    }
  }
}

provider "tfe" {
  hostname = var.hostname
}

resource "tfe_workspace" "prod" {
  name              = var.workspace_name
  organization      = var.organization
  description       = "Production GCP platform infrastructure"
  working_directory = "terraform/environments/prod"
  terraform_version = var.terraform_version
  auto_apply        = false

  vcs_repo {
    identifier     = var.github_repository
    oauth_token_id = var.oauth_token_id
    branch         = "main"
  }

  tag_names = [
    "gcp",
    "gke",
    "platform-engineering",
    "production",
  ]
}

resource "tfe_workspace_settings" "prod" {
  workspace_id   = tfe_workspace.prod.id
  execution_mode = "remote"
}

resource "tfe_variable" "project_id" {
  key          = "project_id"
  value        = var.gcp_project_id
  category     = "terraform"
  workspace_id = tfe_workspace.prod.id
  description  = "GCP project managed by the production workspace"
}

resource "tfe_variable" "region" {
  key          = "region"
  value        = var.gcp_region
  category     = "terraform"
  workspace_id = tfe_workspace.prod.id
}
