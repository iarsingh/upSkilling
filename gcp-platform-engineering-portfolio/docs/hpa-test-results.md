# HPA Test Evidence

Complete this document after deploying the project.

## Test Metadata

| Field | Value |
| --- | --- |
| Date | |
| Git commit | |
| Image tag | |
| GKE cluster | |
| k6 base URL | |
| HPA target | CPU 70% |
| Minimum/maximum pods | 2 / 6 |

## Baseline

- Starting replicas:
- Baseline CPU:
- Baseline p95 latency:
- Baseline error rate:

## Load Profile

```bash
BASE_URL="https://YOUR_INGRESS_IP" k6 run load-test/k6.js
```

## Results

| Time | Virtual users | Current pods | Desired pods | CPU | p95 latency | Error rate |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Baseline | 0 | | | | | |
| Ramp 1 | 20 | | | | | |
| Ramp 2 | 100 | | | | | |
| Peak | 200 | | | | | |
| Recovery | 0 | | | | | |

## Evidence

Add screenshots for:

1. `kubectl get hpa,pods -n platform-demo`
2. Grafana HPA replica panel
3. Grafana request-rate and p95-latency panels
4. k6 summary

## Conclusion

Document whether the service stayed within the 1% error-rate and 500 ms p95 thresholds, how quickly the HPA reacted, and any tuning required.
