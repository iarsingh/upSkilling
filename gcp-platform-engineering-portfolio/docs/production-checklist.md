# Production Readiness Checklist

## Infrastructure

- [ ] Terraform modules reviewed
- [ ] Remote state configured
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
- [ ] Approval before production

## Observability

- [ ] Health endpoint
- [ ] Readiness endpoint
- [ ] Metrics endpoint
- [ ] Dashboard defined
- [ ] Alerts defined
- [ ] Runbook linked

## Security

- [ ] No hardcoded secrets
- [ ] Image scanning enabled
- [ ] IAM reviewed
- [ ] RBAC reviewed
- [ ] WAF/rate limit reviewed
- [ ] Audit logging enabled

