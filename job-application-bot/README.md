# job-application-bot

A review-first job application assistant for LinkedIn, Naukri, Indeed, Greenhouse/Lever/Workday career pages, Uplers, and CutShort.

It helps you search jobs, score fit, prepare forms, draft screening answers with a local Ollama model, and log application status. By default it stops before final submission so you can review every application.

## Important Boundaries

- The default mode is `--review`: prepare/fill forms, then stop before final submit.
- Use `--submit` only when you personally want the bot to submit on a supported site and you are monitoring the browser.
- The bot does not bypass CAPTCHAs, OTP, login checks, paywalls, rate limits, or anti-bot protections.
- Some portals prohibit automation. Use each site in line with its terms and keep volumes modest.
- Screening answers can affect your hiring outcome. Review generated answers before submitting.

## Setup

```bash
cd job-application-bot
npm install
cp .env.example .env
```

This project uses your existing Google Chrome installation through Playwright. Make sure Chrome is installed.

For local AI screening-answer drafts, run Ollama and set the model in `.env`:

```bash
ollama serve
```

Edit `config/profile.json` with your name, contact details, resume paths, target roles, keywords, notice period, and standard answers.

## First Login Per Site

```bash
node src/cli.js --site linkedin --login-only
node src/cli.js --site naukri --login-only
node src/cli.js --site indeed --login-only
node src/cli.js --site uplers --login-only
node src/cli.js --site cutshort --login-only
```

Log in manually in the opened browser and complete OTP/2FA yourself. The session is saved under `browser-data/<site>/`, which is gitignored.

## Review Mode

Review mode is the default. It searches, scores, prepares supported forms, and stops before final submission.

```bash
node src/cli.js --site linkedin --keywords "MLOps Engineer Kubernetes GCP" --location "India" --limit 10
node src/cli.js --site indeed --keywords "Platform Engineer Kubernetes" --location "India" --limit 10
node src/cli.js --site naukri --keywords "DevOps Engineer GCP" --location "India" --limit 10
```

For direct company application links:

```bash
node src/cli.js --site generic-ats --urls "https://boards.greenhouse.io/acme/jobs/123,https://jobs.lever.co/acme/456"
```

## Submit Mode

Only use this when you are ready for real applications to be submitted:

```bash
node src/cli.js --site linkedin --keywords "MLOps Engineer Kubernetes GCP" --location "India" --limit 5 --submit
```

Keep the browser visible for new sites or after portal UI changes.

## What It Automates

- Job search URL construction for supported job boards
- Fit scoring using `config/profile.json`
- Deduplication using `data/applied-jobs.json`
- Basic form filling from profile fields
- Draft answers for screening questions using local Ollama
- Application logs with status, score, keywords, company, title, and URL

## What It Does Not Automate

- CAPTCHA solving
- OTP/2FA
- Account creation
- Bulk spam submissions
- Terms-of-service bypass
- Guaranteed completion for every custom portal

## Project Layout

```text
config/profile.json        Your profile, target roles, keywords, resume paths
src/cli.js                  Entry point and CLI flags
src/lib/config.js           Profile and environment loading
src/lib/ollama.js           Local LLM scoring and screening-answer drafts
src/lib/browserSession.js   Persistent per-site Chrome sessions
src/lib/applicationLog.js   Application log and dedupe
src/lib/formFiller.js       Label-to-profile field matching
src/lib/genericFormPass.js  Generic multi-step form helper
src/sites/linkedin.js       LinkedIn Easy Apply adapter
src/sites/naukri.js         Naukri adapter
src/sites/indeed.js         Indeed adapter
src/sites/genericAts.js     Greenhouse, Lever, Workday public form adapter
src/sites/uplers.js         Experimental Uplers adapter
src/sites/cutshort.js       Experimental CutShort adapter
data/applied-jobs.json      Local application log
browser-data/<site>/        Saved login sessions, gitignored
```

## Suggested Workflow

1. Run `--login-only` for the portal.
2. Run a small review batch with `--limit 3`.
3. Check the browser and `data/applied-jobs.json`.
4. Adjust `config/profile.json` and keywords.
5. Use `--submit` only for portals and flows you have personally verified.
