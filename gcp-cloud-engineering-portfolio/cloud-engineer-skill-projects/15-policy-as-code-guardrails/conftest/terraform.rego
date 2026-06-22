package terraform.gcp

deny[msg] {
  resource := input.resource.google_compute_firewall[_]
  resource.allow[_].ports[_] == "22"
  resource.source_ranges[_] == "0.0.0.0/0"
  msg := "Firewall rules must not expose SSH to the internet"
}

deny[msg] {
  bucket := input.resource.google_storage_bucket[_]
  not bucket.uniform_bucket_level_access
  msg := sprintf("Bucket %s must enable uniform bucket level access", [bucket.name])
}

