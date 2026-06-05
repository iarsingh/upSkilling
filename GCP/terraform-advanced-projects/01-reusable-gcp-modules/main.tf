module "service_account" {
  source       = "./modules/service-account"
  project_id   = var.project_id
  account_id   = "app-runtime"
  display_name = "Application runtime identity"
}

