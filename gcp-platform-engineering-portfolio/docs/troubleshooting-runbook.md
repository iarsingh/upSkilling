# Troubleshooting Runbook

## Scenario 1: Pod In CrashLoopBackOff

Commands:

```bash
kubectl get pods -n platform-demo
kubectl describe pod <pod-name> -n platform-demo
kubectl logs <pod-name> -n platform-demo --previous
```

Check:

- app startup error
- missing env var
- invalid config
- failed secret mount
- bad image
- liveness probe too aggressive

## Scenario 2: Service Not Reachable

Commands:

```bash
kubectl get svc -n platform-demo
kubectl get endpoints -n platform-demo
kubectl describe svc platform-sample-api -n platform-demo
```

Check:

- service selector
- pod labels
- readiness probe
- namespace
- network policy

## Scenario 3: HPA Not Scaling

Commands:

```bash
kubectl get hpa -n platform-demo
kubectl describe hpa platform-sample-api -n platform-demo
kubectl top pods -n platform-demo
```

Check:

- metrics server
- resource requests
- target utilization
- traffic pattern

## Scenario 4: Terraform Plan Shows Destroy

Actions:

1. Stop the apply.
2. Review resource diff.
3. Check recent module changes.
4. Check state drift.
5. Confirm whether replacement is expected.
6. Get peer review before apply.

## Scenario 5: High API Latency

Check:

- p95 and p99 latency
- CPU and memory
- pod restarts
- recent deployment
- upstream dependency latency
- database or cache errors

