output "project_ids" {
  value = { for k, p in google_project.env : k => p.project_id }
}

output "deployer_service_accounts" {
  value = { for k, sa in google_service_account.deployer : k => sa.email }
}

