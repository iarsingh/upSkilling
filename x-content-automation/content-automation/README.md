# X Content Automation

Local-only X content generation and posting for MLOps, Kubernetes, infrastructure, and data science threads.

This project mirrors the LinkedIn automation style, but it does not use GitHub Actions. It runs from your laptop or any local machine where you configure X API credentials.

## What it creates

- Short X threads with:
  - hook
  - answer
  - architecture flow
  - production checklist
  - closing question
- Markdown drafts in `posts/`
- A 30-day local calendar in `content-calendar.json`
- Local publish state in `publish-state.json`

## X API setup

Create an X Developer app and enable user-context posting. Configure this callback URL in the app:

```text
http://127.0.0.1:3001/callback
```

Use these OAuth scopes:

```text
tweet.read tweet.write users.read offline.access
```

The post API used by this project is X API v2:

```text
POST https://api.x.com/2/tweets
```

## Local setup

```bash
cd x-content-automation/content-automation
cp .env.example .env
```

Edit `.env` and add:

```text
X_CLIENT_ID=your_client_id
X_CLIENT_SECRET=your_client_secret_if_your_app_has_one
```

Then run OAuth:

```bash
npm run x:auth
```

Open the printed authorization URL, approve the app, and the callback will save `X_ACCESS_TOKEN` and `X_REFRESH_TOKEN` into `.env`.

## Generate content

Create one draft for today:

```bash
npm run draft
```

Create 30 days of drafts and a local calendar:

```bash
npm run prepare:30
```

## Publish locally

Publish a fresh thread immediately:

```bash
npm run publish
```

Publish the next due item from `content-calendar.json`:

```bash
npm run publish:next
```

Publish a specific scheduled date:

```bash
npm run publish:date -- 2026-06-11
```

## Manual posting without paid API access

If you do not want to use paid X API credits, use the local drafts and paste them into X manually.

Print the next due thread and copy Post 1 to your clipboard:

```bash
npm run manual:next
```

Print a specific date and copy Post 1:

```bash
npm run manual:date -- 2026-06-11
```

Copy a specific post from a thread:

```bash
npm run manual:copy -- 2026-06-11 2
```

Paste Post 1 into X, reply to it with Post 2, then continue with each copied post.

## Optional local schedule

Install a local cron job using `POST_TIME` from `.env`:

```bash
npm run install:cron
```

Important: this is local scheduling. If your Mac is asleep or offline, cron will not publish. For always-on posting, keep LinkedIn on GitHub Actions or move this X flow later to GitHub Actions, Cloud Run, or a VM.

## Token refresh

If the access token expires:

```bash
npm run x:refresh
```

## Notes

- This first version posts text-only threads.
- Each thread part is kept below X's normal 280-character text limit.
- `.env` is ignored by git so tokens do not get committed.
