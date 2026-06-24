output "cluster_name" {
  value = google_container_cluster.this.name
}

output "endpoint" {
  value     = google_container_cluster.this.endpoint
  sensitive = true
}

output "node_service_account" {
  value = google_service_account.nodes.email
}
