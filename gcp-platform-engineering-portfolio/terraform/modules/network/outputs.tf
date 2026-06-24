output "network_name" {
  value = google_compute_network.this.name
}

output "subnet_name" {
  value = google_compute_subnetwork.this.name
}

output "pods_range_name" {
  value = google_compute_subnetwork.this.secondary_ip_range[0].range_name
}

output "services_range_name" {
  value = google_compute_subnetwork.this.secondary_ip_range[1].range_name
}
