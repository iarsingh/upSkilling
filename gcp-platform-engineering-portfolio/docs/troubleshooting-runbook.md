# Troubleshooting Runbook

## High Error Rate

```bash
kubectl logs -n platform-demo deployment/platform-sample-api --since=15m
kubectl get events -n platform-demo --sort-by=.lastTimestamp
kubectl rollout history deployment/platform-sample-api -n platform-demo
```

Compare the error-rate increase with the latest image promotion, pod restarts, readiness failures, and downstream errors. If user impact is ongoing, revert the GitOps promotion commit and confirm ArgoCD syncs the previous image.

## High Latency

Check p95 latency alongside request rate, CPU throttling, memory pressure, HPA desired replicas, pending pods, and load-balancer backend latency. If desired replicas cannot schedule, inspect node-pool autoscaling and regional capacity.

## Service Unavailable

```bash
kubectl get deployment,pods,svc,endpoints,ingress -n platform-demo
kubectl describe ingress platform-sample-api -n platform-demo
kubectl describe backendconfig platform-sample-api -n platform-demo
```

Verify healthy endpoints, GCE ingress events, BackendConfig health checks, Cloud Armor logs, and NetworkPolicy source ranges.

## Pod Restarts

```bash
kubectl get pods -n platform-demo
kubectl describe pod <pod-name> -n platform-demo
kubectl logs <pod-name> -n platform-demo --previous
```

Inspect exit code, OOM state, probe failures, configuration, and recent image changes.

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
