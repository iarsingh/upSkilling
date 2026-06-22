# GCP Load Balancer Design

- Frontend: global HTTPS forwarding rule.
- Certificate: Google-managed certificate.
- Backend: managed instance group or network endpoint group.
- Health check: HTTP `/healthz`.
- Security: Cloud Armor policy.
- Observability: request logs and latency dashboard.

