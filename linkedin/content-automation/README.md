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
cd linkedin/content-automation
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

Recommended daily schedule: `09:30 Asia/Kolkata`.

The installed cron trigger runs:

```bash
npm run publish:next
```

That means one scheduled content item is posted per day until the 100-day calendar is complete.

## GitHub Actions Daily Publishing

The repository includes `.github/workflows/linkedin-daily.yml`, which publishes one scheduled text-only post every day at `09:47 Asia/Kolkata`.

Add these repository secrets in GitHub:

```bash
LINKEDIN_ACCESS_TOKEN=your_token
LINKEDIN_AUTHOR_URN=urn:li:person:your_person_id
```

The workflow reads `content-calendar.json` and publishes the item whose `date` matches the current date in `Asia/Kolkata`. You can also run it manually from the GitHub Actions tab and provide `publish_date` in `YYYY-MM-DD` format.

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
