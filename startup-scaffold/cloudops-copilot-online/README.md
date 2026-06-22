# CloudOps Copilot Online

A hostable startup operating console for the CloudOps Copilot idea.

This project turns the strategy files in `startup-scaffold/` into a working online MVP surface:

- collect and score customer leads
- track demos and pilot conversations
- paste incident context and generate a structured response through a serverless API
- manage founder tasks for validation and GTM
- use a built-in playbook for positioning, demo flow, pricing tests, and outreach
- export saved data for sharing or backup

The app is optimized for free hosting. It stores workspace data in browser `localStorage` and calls `/api/analyze` when hosted on Vercel or Netlify. If the API is unavailable, it falls back to local browser analysis so the app still works on GitHub Pages or any static server.

## Open Locally

Open `index.html` directly in a browser.

For a local web server:

```bash
python3 -m http.server 8080
```

Then visit:

```text
http://localhost:8080/startup-scaffold/cloudops-copilot-online/
```

## Host Online

### GitHub Pages

1. Commit this folder.
2. Go to repository settings.
3. Enable Pages from the branch that contains this folder.
4. Use `/startup-scaffold/cloudops-copilot-online` as the published path if your Pages setup supports folder publishing.

### Vercel

Import the repository and set:

```text
Framework Preset: Other
Root Directory: startup-scaffold/cloudops-copilot-online
Build Command: empty
Output Directory: .
```

The `/api/analyze` endpoint will run as a free serverless function.

### Netlify

Import the repository and set:

```text
Base directory: startup-scaffold/cloudops-copilot-online
Build command: empty
Publish directory: .
```

Netlify redirects `/api/analyze` to `/.netlify/functions/analyze`.

## Product Content

The hosted app includes:

- Dashboard metrics for interviews, demos, pilots, open tasks, and demo readiness
- Demo readiness tracker with grouped checklist, progress meter, next action, and copyable demo assets
- Incident analyzer with likely causes, investigation commands, runbook draft, evidence checklist, customer update, and postmortem draft
- Lead and demo tracker for validation conversations
- Founder task board for validation, product, GTM, and operations
- Playbook tab with positioning, demo script, pilot pricing, outreach copy, and interactive interview question capture

## API

Request:

```bash
curl -X POST https://your-site.example/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"type":"Kubernetes","text":"CrashLoopBackOff and 5xx after deployment"}'
```

Response:

```json
{
  "source": "api",
  "type": "Kubernetes",
  "confidence": "high",
  "summary": "Kubernetes incident: Pod restart pattern detected..."
}
```

## Next Backend Upgrade

When validation proves demand, add:

- Supabase or Firebase Auth
- Postgres for leads, incidents, demos, and tasks
- serverless or FastAPI analysis endpoint
- OpenAI, Claude, or local Ollama provider abstraction
- tenant-aware workspaces for pilot customers
