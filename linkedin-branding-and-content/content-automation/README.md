# LinkedIn Daily Content Automation

Local automation for generating daily LinkedIn posts about Kubernetes, MLOps, Data Science, GenAI, DevOps, and cloud engineering.

## What It Does

- Generates one fresh LinkedIn post per run.
- Uses Ollama locally when available, with a fallback generator when Ollama is offline.
- Creates hashtags, content pillars, a suggested call to action, and a visual image asset.
- Saves a markdown draft and image under `posts/` and `assets/`.
- Can publish text-only to LinkedIn when API credentials are configured.
- Can create a local cron trigger for daily posting.

## Quick Start

```bash
cd linkedin-branding-and-content/content-automation
cp .env.example .env
npm run draft
```

Draft output is saved in:

- `posts/`
- `assets/`

## Create 100 Days Of Content

```bash
npm run prepare:100
```

This creates:

- `content-calendar.json`
- 100 markdown drafts in `posts/`
- 100 visual assets in `assets/`

The calendar starts from the day you run the command and rotates across Kubernetes, MLOps, Data Science, and IT engineering topics.

## Publish To LinkedIn

Add these values to `.env`:

```bash
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:3000/callback
LINKEDIN_SCOPES=openid profile email w_member_social
LINKEDIN_ACCESS_TOKEN=your_token
LINKEDIN_AUTHOR_URN=urn:li:person:your_person_id
```

To generate `LINKEDIN_ACCESS_TOKEN` and `LINKEDIN_AUTHOR_URN`, run:

```bash
npm run linkedin:auth
```

Open the printed URL, approve access, and the callback will update `.env`.

Then publish the next scheduled post:

```bash
npm run publish:next
```

The script publishes text only by default and records the result in `publish-state.json`. Image assets are still generated for local review, but they are not attached unless `LINKEDIN_ATTACH_IMAGES=true` is set.

## Daily Local Trigger

Generate a cron line:

```bash
npm run schedule:cron
```

Install or replace the local cron trigger:

```bash
npm run install:cron
```

Recommended schedule for profile growth: one strong weekday post at `09:00 Asia/Kolkata`, one Saturday portfolio/practical update at `10:30 Asia/Kolkata`, and one Sunday DevOps & Cloud Fundamentals post at `11:30 Asia/Kolkata`.

The installed cron trigger runs once per weekday, once on Saturday, and once on Sunday:

```bash
node src/publish-calendar-date.js
```

It uses `PUBLISH_MODE=weekly-rotation`, so the local schedule publishes one selected content stream per run.

## GitHub Actions Publishing

The repository includes `.github/workflows/linkedin-daily.yml`, which publishes scheduled text-only posts at `09:00 Asia/Kolkata` Monday-Friday, `10:30 Asia/Kolkata` on Saturday, and `11:30 Asia/Kolkata` on Sunday.

Add these repository secrets in GitHub:

```bash
LINKEDIN_ACCESS_TOKEN=your_token
LINKEDIN_AUTHOR_URN=urn:li:person:your_person_id
```

The workflow reads `content-calendar.json` and publishes one item whose `date` matches the current date in `Asia/Kolkata`. With `PUBLISH_MODE=weekly-rotation`, it rotates the existing calendar streams:

- Monday and Thursday: Kubernetes / platform engineering
- Tuesday and Friday: MLOps
- Wednesday and Saturday: Python automation / portfolio update
- Sunday: DevOps & Cloud Fundamentals (105 post ideas: three practical angles for each of 35 technology pillars, including Terraform/OpenTofu, Linux, Networking, Docker internals, CI/CD, Git, GCP/AWS/Azure, Observability, System Design, Python, Ansible, DevSecOps, Platform Engineering, MLOps/AI infra, SRE, GitOps, Helm/Kustomize, landing zones, IAM, databases, messaging, microservices, service mesh, secrets, policy as code, FinOps, HA/DR, incidents, performance, artifacts, supply-chain security, Go, Bash, and distributed systems)

You can also run it manually from the GitHub Actions tab and provide `publish_date` in `YYYY-MM-DD` format. To publish a specific stream manually, provide `publish_slot` as `09:30`, `14:30`, `19:30`, or `11:30`.

## Calendar Streams

```bash
npm run schedule:three-daily
```

By default, this creates 365 days of calendar items, **exactly one per day**, rotating across four content streams by weekday. Pass a different day count as the first argument when you need a shorter or longer planning window:

```bash
node scripts/schedule-three-daily-series.js 365 2026-07-14
```

- Monday and Thursday: Kubernetes (slot `14:30`)
- Tuesday and Friday: MLOps (slot `09:30`)
- Wednesday and Saturday: Python Automation (slot `19:30`)
- Sunday: DevOps & Cloud Fundamentals (slot `11:30` - see topic list above)

This weekday assignment is defined in `weekdayStream` in `scripts/schedule-three-daily-series.js` and mirrors `slotForWeeklyRotation` in `src/publish-calendar-date.js`, so generation and publishing always agree on the single item due each day - the calendar file itself never contains more than one item per date. `publish-calendar-date.js` also defaults to this one-per-day selection even without `PUBLISH_MODE` set; pass `PUBLISH_MODE=all-slots` only for a deliberate catch-up run. Manual GitHub workflow runs can still provide `publish_date` and an optional `publish_slot` for one-off recovery.

## Reach Optimization

The scheduled series uses five rotating post formats: practical breakdown, troubleshooting, architecture review, interview lens, and hands-on lab. Generation fails when a post is not reach-ready: it must have a strong first-line hook, 600-3,000 characters, 3-5 relevant hashtags, a practical takeaway, a conversation prompt, and no external URL in the body.

Reach is an outcome to measure, not a guarantee. Review LinkedIn combined post analytics every two weeks and track impressions, out-of-network impressions, reactions, comments, saves, sends, reposts, profile views, and follower growth by `contentFormat`, `pillar`, topic, weekday, and publish time. Keep the formats and topics that earn meaningful comments, saves, and out-of-network reach; rewrite or retire consistently weak patterns. Respond to substantive comments promptly to develop a real conversation rather than treating publishing as a one-way broadcast.

## Notes

- Ollama model default: `llama3.1:8b`.
- Ollama calls time out after `OLLAMA_TIMEOUT_MS`, then the script uses a fallback content template.
- Image generation creates an SVG and attempts PNG conversion using macOS `sips`.
- LinkedIn images are disabled by default. Set `LINKEDIN_ATTACH_IMAGES=true` only if you want the publisher to upload and attach generated assets again.
- LinkedIn publishing requires API access and the correct posting permissions for your LinkedIn app.

## LinkedIn Scope Error

If LinkedIn shows:

```text
The requested permission scope is not valid
```

your app does not have the `w_member_social` permission yet.

Fix it in LinkedIn Developer Portal:

1. Open your app at `https://www.linkedin.com/developers/apps`.
2. Go to `Products`.
3. Add `Share on LinkedIn`.
4. Confirm `w_member_social` appears under OAuth scopes in the `Auth` tab.
5. Confirm this redirect URL is listed exactly: `http://localhost:3000/callback`.
6. Run `npm run linkedin:auth` again.
