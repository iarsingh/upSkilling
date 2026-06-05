# Project 04: Go Kubernetes Rollout Checker

## Skill
Kubernetes deployment status, JSON parsing, release gates, and CLI automation.

## Run

```sh
kubectl get deploy my-app -o json > deployment.json
go run ./cmd --file deployment.json
```

## Interview Q&A

**Q: What makes a Kubernetes deployment ready?**  
A: Desired replicas should match ready and available replicas, and observed generation should catch up with metadata generation.

**Q: Why automate rollout checks?**  
A: CI/CD pipelines need deterministic pass/fail gates before promoting releases.

