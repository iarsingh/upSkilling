# Security Policy

## Reporting a vulnerability

Please do not publish exploitable details in a public issue. Use GitHub's private vulnerability reporting feature or email the maintainer at [akhileshranjan.ks@gmail.com](mailto:akhileshranjan.ks@gmail.com). Include affected versions, reproduction steps, impact, and any suggested mitigation.

Maintainers will acknowledge a report when available, investigate it, and coordinate a fix and disclosure. This community project does not guarantee a response SLA.

## Supported versions

Security fixes are made on the latest `main` branch. Older snapshots are not supported.

## Deployment guidance

- Never commit `.env`, applicant profiles, credentials, database files, or session secrets.
- Use PostgreSQL and a unique `SESSION_SECRET` for public deployments.
- Keep `OFFLINE_ONLY=1` unless an explicitly configured AI provider is required.
- Rotate any credential immediately if it is accidentally exposed.
