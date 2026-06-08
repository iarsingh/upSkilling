# GKE MLOps Monitoring

Production model APIs on GKE should monitor request volume, latency, error rate, model confidence, prediction distribution, and business outcome quality.

Useful metrics include p50 latency, p95 latency, HTTP 5xx rate, request count, model version, average prediction score, and drift score.

Alerts should focus on user impact. Good examples include high p95 latency, rising 5xx errors, model version rollback, or accuracy degradation during post-drift periods.

