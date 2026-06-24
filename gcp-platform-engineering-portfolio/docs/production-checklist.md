# Production Readiness Checklist

## Infrastructure

- [ ] Terraform modules reviewed
- [ ] Terraform Enterprise workspace and remote state configured
- [ ] Environment variables separated
- [ ] IAM least privilege implemented
- [ ] Required labels added
- [ ] Network rules reviewed
- [ ] Cloud Armor policy reviewed

## Kubernetes

- [ ] Namespace defined
- [ ] Service account defined
- [ ] RBAC reviewed
- [ ] Resource requests and limits configured
- [ ] Readiness probe configured
- [ ] Liveness probe configured
- [ ] HPA configured
- [ ] Rollback command documented

## CI/CD

- [ ] Lint stage
- [ ] Test stage
- [ ] Terraform validate
- [ ] Kubernetes dry-run validation
- [ ] Docker build
- [ ] Security scan
- [ ] Immutable Artifact Registry image
- [ ] GitOps promotion commit
- [ ] ArgoCD sync and rollback verified

## Observability

- [ ] Health endpoint
- [ ] Readiness endpoint
- [ ] Metrics endpoint
- [ ] Grafana dashboard loaded
- [ ] Prometheus targets healthy
- [ ] Alerts tested
- [ ] Runbook linked

## Security

- [ ] No hardcoded secrets
- [ ] Image scanning enabled
- [ ] IAM reviewed
- [ ] RBAC reviewed
- [ ] WAF/rate limit reviewed
- [ ] Audit logging enabled
- [ ] GitHub OIDC federation used instead of a service-account key
- [ ] Workload Identity binding verified

## Performance

- [ ] k6 load test completed
- [ ] HPA scale-up captured
- [ ] Scale-down stabilization confirmed
- [ ] p95 latency below target
- [ ] Error rate below target
