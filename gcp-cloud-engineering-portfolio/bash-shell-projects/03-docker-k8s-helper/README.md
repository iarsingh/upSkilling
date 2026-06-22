# Project 03: Docker and Kubernetes Helper

## Skill
Container troubleshooting, Kubernetes diagnostics, rollout status, logs, events, and namespace workflows.

## Run

```sh
bash scripts/k8s-debug.bash default my-deployment
bash scripts/docker-cleanup.bash
```

## Interview Q&A

**Q: What is the first command you run when a Kubernetes deployment fails?**  
A: Usually `kubectl describe pod` or `kubectl rollout status`, depending on whether the issue is scheduling, image pull, readiness, or rollout.

**Q: Why inspect Kubernetes events?**  
A: Events explain scheduling failures, image pull errors, probe failures, and resource quota issues.

