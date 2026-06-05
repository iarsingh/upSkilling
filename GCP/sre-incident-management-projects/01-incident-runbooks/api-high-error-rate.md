# Runbook: API High Error Rate

1. Confirm alert and customer impact.
2. Check recent deployments.
3. Inspect API logs for top errors.
4. Check dependency health.
5. Roll back if correlated with release.
6. Scale or shed load if saturation is confirmed.
7. Communicate status every 15 minutes.

## Verification

- Error rate returns below threshold.
- Latency returns to normal.
- No new critical alerts.

