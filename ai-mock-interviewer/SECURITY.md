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

## Storage and hosting limitations

PostgreSQL stores accounts/contact data when configured; Skills Dashboard interviews
still use SQLite at `SQLITE_PATH`. A production host needs persistent storage for that
file and a backup strategy. The Vercel configuration uses `/tmp`, so those interviews
are ephemeral and are not shared reliably across instances. PostgreSQL configuration
alone does not make every feature durable.

`check:production` validates configuration and required assets, not network connectivity,
database health, authorization coverage, or production capacity. Validate those on the
chosen host before accepting real user data. Keep public deployments behind HTTPS and
configure origins and secrets for that deployment.

Repository checks scan common credential formats and tracked private-file paths. They
are not a comprehensive secret scanner and do not inspect all Git history or establish
permission to redistribute contributed material.
