# Runbook: High Latency

1. Check Cloud Monitoring latency dashboard.
2. Compare latency by route, region, and release version.
3. Check recent Cloud Build, Cloud Deploy, or Argo CD changes.
4. Inspect saturation: CPU, memory, database connections, queue depth.
5. Roll back if the issue correlates with a release.
6. Scale horizontally if saturation is confirmed.

## Useful Commands

```sh
kubectl top pods -A
kubectl rollout history deployment/sample-api -n sample-api
gcloud logging read 'severity>=ERROR' --limit=50
```

