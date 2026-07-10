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

## Run All Portals

Edit `config/campaigns.json` to control portals, keywords, locations, limits, and direct ATS URLs.

```bash
npm run campaign
node src/campaign.js --login-only --only linkedin,naukri,indeed
node src/campaign.js --only linkedin,naukri,indeed --limit 3
node src/campaign.js --submit --only naukri --limit 5
```

The campaign runner continues to the next portal if one site fails. It defaults to review mode unless you pass `--submit` or set a campaign's `mode` to `submit`.

## Run After Manual Login

Use this when you want to log in normally yourself, open the job/application page, and then let the tool fill the current page.

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --user-data-dir=/tmp/job-apply-chrome
```

After Chrome opens, log in to the portal and open an application page:

```bash
npm run attach
node src/attachRunner.js --url-match linkedin.com --steps 3
```

By default this is review mode and will not click final submit. Add `--submit` only after you have tested that page flow.

## Chrome Extension

The `extension/` folder contains a local Chrome extension for filling the page you are already viewing.

1. Open `chrome://extensions`.
2. Enable Developer mode.
3. Click Load unpacked.
4. Select `job-application-bot/extension`.
5. Open the extension popup, paste `config/profile.json`, and click Save Profile.
6. Open any job application page and click Fill Page.

The extension never clicks final submit and cannot upload resume files automatically; review the page before submitting.

## Mock Interview

The questions in `config/profile.json` under `interviewQuestions` can be used for terminal-based interview practice.

```bash
npm run mock-interview
npm run mock-interview -- --category aiMlopsLlm --limit 5
npm run mock-interview -- --category kubernetesNetworkingDns --no-feedback
node src/mockInterview.js --list
```

By default the mock interview asks questions interactively and uses local Ollama for short coaching feedback after each answer. Transcripts are saved under `data/mock-interview-*.json`.

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
src/campaign.js             Multi-portal campaign runner
src/attachRunner.js         Fill an application page in already-open Chrome
src/sites/linkedin.js       LinkedIn Easy Apply adapter
src/sites/naukri.js         Naukri adapter
src/sites/indeed.js         Indeed adapter
src/sites/genericAts.js     Greenhouse, Lever, Workday public form adapter
src/sites/uplers.js         Experimental Uplers adapter
src/sites/cutshort.js       Experimental CutShort adapter
config/campaigns.json       Multi-portal search/apply campaign config
extension/                  Local Chrome extension for current-page filling
data/applied-jobs.json      Local application log
browser-data/<site>/        Saved login sessions, gitignored
```

## Suggested Workflow

1. Run `--login-only` for the portal.
2. Run a small review batch with `--limit 3`.
3. Check the browser and `data/applied-jobs.json`.
4. Adjust `config/profile.json` and keywords.
5. Use `--submit` only for portals and flows you have personally verified.
