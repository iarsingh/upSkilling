# Project 03: Go GCP Metadata Client

## Skill
GCP Compute Engine metadata, HTTP headers, timeouts, and cloud-aware workload identity.

## Run

```sh
go run ./cmd
```

This returns local fallback values when not running on Compute Engine.

## Interview Q&A

**Q: What is the GCP metadata server?**  
A: It is a local endpoint available to GCE/GKE workloads that exposes instance metadata, service account tokens, project ID, zone, and other runtime information.

**Q: Why is the `Metadata-Flavor: Google` header required?**  
A: It helps protect metadata requests from accidental or unauthorized cross-protocol access.

