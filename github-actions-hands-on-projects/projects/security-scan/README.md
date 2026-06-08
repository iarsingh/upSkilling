# Security Scan Project

## Goal

Practice GitHub Actions security scanning using Trivy and Gitleaks.

## What This Checks

- filesystem vulnerabilities
- dependency risks
- accidental secret commits

## Interview Talking Points

- Security checks should run before deployment.
- Secrets should be stored in GitHub Actions secrets or a cloud secret manager.
- Scans should block critical issues in production workflows.

