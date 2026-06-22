# Hosting And Operations

## Goal

Host the CloudOps Copilot startup console online quickly, then use it to manage customer validation and MVP demos.

## Recommended First Hosting Path

Use Vercel or Netlify for the first version because this project has a static frontend and a small serverless API.

Production settings:

```text
Root directory: startup-scaffold/cloudops-copilot-online
Build command: empty
Publish directory: .
```

Vercel serves `api/analyze.js` as `/api/analyze`.

Netlify serves `netlify/functions/analyze.js` through a redirect from `/api/analyze`.

## Data Model

The current app stores workspace data in browser `localStorage`. Incident analysis is requested through `/api/analyze` on Vercel or Netlify, with local fallback for static hosts.

This is good for:

- solo founder operating dashboard
- demo workflow
- customer validation tracking
- quick online MVP preview

This is not enough for:

- multiple users
- customer accounts
- sensitive incident logs
- paid SaaS usage

## Online Management Workflow

Daily:

- add new LinkedIn and community leads
- track pain signals from calls
- paste one anonymized incident into the analyzer
- create follow-up founder tasks
- export data at the end of the day

Weekly:

- count interviews, demos, pilots, and paid intent
- update startup docs with the strongest customer language
- record a fresh demo using real anonymized examples
- decide whether to build the backend or continue validation

## Production Upgrade Path

Phase 1:

- static hosted app
- browser storage
- serverless incident analysis API
- manual export

Phase 2:

- Supabase Auth
- Postgres tables for leads, tasks, incidents, demos
- row-level security

Phase 3:

- FastAPI backend
- AI provider abstraction
- encrypted incident storage
- customer workspaces
- audit logs

Phase 4:

- GKE or Cloud Run deployment
- Stripe billing
- organization-level RBAC
- integrations for Slack, PagerDuty, Grafana, GCP Logging, and GitHub Actions
