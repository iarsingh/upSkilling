# Grafana Dashboard Notes

Recommended dashboard panels:

- Request rate
- Error rate
- p95 latency
- CPU utilization by pod
- Memory utilization by pod
- Pod restart count
- HPA replica count
- Deployment rollout status

Interview explanation:

```text
I would design dashboards around user impact first: latency, errors, and availability. Then I would add infrastructure signals such as CPU, memory, restarts, and autoscaling behavior to support root cause analysis.
```

