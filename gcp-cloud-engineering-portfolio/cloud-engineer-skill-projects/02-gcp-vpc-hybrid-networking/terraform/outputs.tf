output "network" {
  value = google_compute_network.hub.name
}

output "subnet" {
  value = google_compute_subnetwork.private.name
}

