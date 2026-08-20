# AI Mock Interviewer

A local-first, voice-led mock interview simulator for DevOps, SRE, Cloud, Platform Engineering, and MLOps
preparation. It runs against a local Node server and requires no cloud service in offline mode.

The app asks interview questions, reads them aloud, records or accepts typed answers, saves progress
locally, and works fully offline using a deduplicated built-in bank of more than 8,000 questions with answers and question-type metadata.

## Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Sign In And Accounts](#sign-in-and-accounts)
- [Contact Messages](#contact-messages)
- [Run With Local Ollama](#run-with-local-ollama)
- [Deploy On Vercel](#deploy-on-vercel)
- [How To Use](#how-to-use)
- [Audio Notes](#audio-notes)
- [Offline Mode](#offline-mode)
- [Job Description Practice](#job-description-practice)
- [Add Custom Skills From The UI](#add-custom-skills-from-the-ui)
- [Mock Interview Sets](#mock-interview-sets)
- [Project Structure](#project-structure)
- [Developer Customization](#developer-customization)
- [Chrome Extension](#chrome-extension)
- [Troubleshooting](#troubleshooting)
- [GitHub Publishing Notes](#github-publishing-notes)
- [License](#license)

## Features

- Voice-led mock interview flow with question audio and answer transcript.
- Offline mode with built-in mock questions and local template feedback.
- Practice by topic: Kubernetes/GKE, Docker, GCP, Terraform, Ansible, Python, FastAPI, Go, SRE, MLOps, LLMOps, CI/CD, observability, security, networking, Linux, platform engineering, behavioral, and basics.
- 50-day practice plan and fixed mock interview sets.
- Custom JD practice by pasting or uploading a job description.
- Custom skills from the UI, so developers can add Java, React, AWS, Spring Boot, or any other topic locally.
- Progress history saved in browser local storage.
- Optional local Ollama support for stronger AI feedback.

## Tech Stack

- **Runtime**: Node.js (built-in `http` module, no framework)
- **Frontend**: vanilla HTML/CSS/JS, browser Speech Synthesis + Speech Recognition APIs
- **State**: browser `localStorage`; PostgreSQL for durable accounts (local JSON fallback)
- **Optional AI**: local Ollama, or Anthropic Claude via `@anthropic-ai/sdk`
- **JD file parsing**: `pdf-parse`, `mammoth` (DOCX), `tesseract.js` (OCR)
- **Browser extension**: Manifest V3 Chrome extension (`chrome-extension/`)

## Requirements

- Node.js 20 or newer
- npm
- Git
- Chrome or Edge recommended for microphone features

Optional:

- Ollama, if you want local AI-generated feedback instead of offline template feedback.

## Quick Start

Clone the repo:

```bash
git clone https://github.com/iarsingh/ai-mock-interviewer.git
cd ai-mock-interviewer
```

Install dependencies:

```bash
npm install
```

Optional: create a private local profile for job autofill and cover-letter features. This file is git-ignored:

```bash
cp data/applicant-profile.example.json data/applicant-profile.json
```

Run offline:

```bash
npm run start:offline
```

Open:

```text
http://127.0.0.1:3030
```

This is the easiest way for another person to run the project. It works with the built-in local question bank and does not require an AI API key.

### Automatic question-bank synchronization

Both `npm start` and `npm run start:offline` synchronize every question-bank
output before the server starts. The sync rebuilds the canonical and browser
datasets, UI topic index counts, text exports, Word document, and the companion
`interview-quiz-app` flashcard dataset.

To synchronize everything without starting the server:

```bash
npm run sync:question-bank
```

### Server-persisted interviews

Interviews launched from the Skills Dashboard are persisted in SQLite and open as
`/session.html?id=<interviewId>`. Refreshing the page restores the interview configuration,
topics, generated questions, and submitted answers from the backend.

The default database is `data/interviews.sqlite`; override it with `SQLITE_PATH`. Run the
modular interview-service tests with:

```bash
npm test
```

Lifecycle APIs are under `/api/v1/interviews`. Health checks are available at `/health/live`
and `/health/ready`. See [docs/HLD_LLD.md](docs/HLD_LLD.md) for the implemented architecture.

## Sign In And Accounts

The app is gated behind sign-in. The dashboard (`/session.html`) and the admin report (`/admin.html`) both require an
account; `/admin.html` additionally requires the `admin` role. The landing page (`/`) stays public.

Accounts use PostgreSQL when `DATABASE_URL` is configured. The required `users` table is created automatically.
Without `DATABASE_URL`, local development falls back to `data/users.json`, which is git-ignored. Passwords are hashed
with Node's built-in `scrypt`; sessions use a signed, stateless cookie.

For persistent hosted accounts, create a PostgreSQL database with your preferred provider and configure:

```text
DATABASE_URL=postgresql://user:password@host:5432/database
DATABASE_SSL=true
SESSION_SECRET=a-long-random-production-secret
```

The `/api/health` response reports the database engine and connection state without exposing credentials.

## Contact Messages

The public `/contact.html` page accepts mentorship, interview-preparation, collaboration, and project-feedback
messages. With PostgreSQL configured, submissions are stored in the `contact_messages` table. JSON fallback mode
stores them in the git-ignored `data/contacts.json` file. The endpoint validates input, includes a honeypot field, and
limits each source address to five accepted messages per hour.

No default accounts or shared passwords are included. Create a user from `/signup.html`; new sign-ups receive the
`user` role. For local administration, set `BOOTSTRAP_ADMIN_NAME`, `BOOTSTRAP_ADMIN_EMAIL`, and a unique
`BOOTSTRAP_ADMIN_PASSWORD` of at least 12 characters before the first start, then remove those values after the
account is created. Existing local JSON users can be imported into PostgreSQL when the database table is empty.

Interview progress itself still lives in the browser's `localStorage`, exactly as before - signing in controls who can
reach the app and the admin report, but it does not (yet) sync interview history to a per-account server-side store.

If you change hosts or want existing sessions to survive a server restart on a read-only deployment, set a
`SESSION_SECRET` environment variable to a long random string; otherwise a secret is generated once and saved to
`data/session-secret.txt` (also git-ignored).

## Run With Local Ollama

Install Ollama from:

```text
https://ollama.com
```

Start Ollama:

```bash
ollama serve
```

In another terminal, start the app:

```bash
npm start
```

Open:

```text
http://127.0.0.1:3030
```

Default model:

```text
llama3.1:8b
```

Use another local model:

```bash
OLLAMA_MODEL=mistral npm start
```

## Deploy On Vercel

The repo includes `vercel.json` and `api/[...path].js`, which wraps `server.js` as a single Vercel serverless
function so the same Node server that runs locally also runs in production.

`vercel.json` sets:

```json
{
  "version": 2,
  "env": {
    "OFFLINE_ONLY": "1",
    "NODE_ENV": "production"
  },
  "functions": {
    "api/[...path].js": {
      "maxDuration": 10
    }
  }
}
```

Offline hosted mode (the default via `OFFLINE_ONLY=1`):

- Does not require `ANTHROPIC_API_KEY`, OpenAI keys, Gemini keys, or Ollama.
- Uses the built-in question bank, fixed mock interview sets, and template feedback.
- Allows manual JD paste and local JD file upload.
- Disables public JD URL import because it is an internet fetch.

Deploy steps:

1. Push this repository to GitHub.
2. Import the repo into Vercel.
3. Vercel reads `vercel.json` automatically; no separate build command is needed.
4. Add `DATABASE_URL`, `DATABASE_SSL=true`, and a unique random `SESSION_SECRET` of at least 32 characters in
   the Vercel project's environment variables. Production startup intentionally fails without durable account
   storage and a stable session secret.
5. Keep `OFFLINE_ONLY=1` for cost-free built-in feedback, or set `OFFLINE_ONLY=0`, choose `LLM_PROVIDER`, and add
   the corresponding provider key.
6. Run `npm run check:production` with the production environment variables before deploying.
7. Deploy.

Vercel uses `/tmp` for SQLite interview sessions. That storage is writable but ephemeral across serverless cold
starts. The browser still retains its local progress, but durable server-side interview sessions require a
long-running Node host with a persistent volume or a future PostgreSQL interview-store migration.

## Production deployment

For a public instance with durable SQLite interview sessions, deploy the included `Dockerfile` to a long-running
container host and mount persistent storage at `/app/data`. Configure at minimum:

```text
NODE_ENV=production
HOST=0.0.0.0
PORT=3030
OFFLINE_ONLY=1
DATABASE_URL=postgresql://user:password@host:5432/database
DATABASE_SSL=true
SESSION_SECRET=<unique random value with at least 32 characters>
SQLITE_PATH=/app/data/interviews.sqlite
```

Build and run locally with production-like settings:

```bash
docker build -t ai-mock-interviewer .
docker run --rm -p 3030:3030 --env-file .env -v aimi-data:/app/data ai-mock-interviewer
```

The server applies same-origin request enforcement, signed secure session cookies, authentication on private APIs,
per-address request limits, cross-user interview isolation, security headers, bounded JSON request bodies, readiness
checks, and graceful shutdown. Set `ALLOWED_ORIGINS` only when a separately hosted trusted frontend must call the API.
Do not set `ALLOW_FILE_STORAGE_IN_PRODUCTION=true` for a real public deployment; it is only an explicit ephemeral-demo
escape hatch.

## How To Use

1. Open `http://127.0.0.1:3030`.
2. Choose a `Technology practice` topic or select a `Mock interview set`.
3. Keep `Live mock interview` and `Real-time simulation` enabled for the voice interview flow.
4. Click `New question`.
5. Listen to the question.
6. Speak your answer or type it in the transcript box.
7. Click `End interview & feedback` when the round is complete.

For a fully manual flow, switch to `Mock interview`.

## Audio Notes

Question audio uses browser text-to-speech.

Answer transcription uses browser speech recognition when supported. Chrome and Edge usually work best.

If microphone transcription is unavailable, type your answer in the answer box and continue normally.

Useful settings in the app:

- `Voice tone`: changes the question reader style.
- `Mic accent`: choose English India, US, or UK.
- `Answer pause`: controls how long the app waits before auto-submitting in real-time simulation.

## Offline Mode

Run:

```bash
npm run start:offline
```

Offline mode:

- Uses local files and the built-in question bank.
- Disables internet-only features such as Claude API calls and public JD URL import.
- Still allows manual JD paste.
- Still allows local JD file upload and text extraction.
- Uses local template feedback if Ollama is not available.

## Job Description Practice

You can prepare for a specific job:

1. Paste your resume/profile into `CV / profile context`.
2. Paste the job description into `Market skills / job description`.
3. Click `Save CV and JD`.
4. Select `Custom JD mock interview` from `Mock interview set`.
5. Click `New question`.

You can also upload a local JD file. Supported formats include PDF, DOCX, TXT, Markdown, and common image formats.

## Add Custom Skills From The UI

Developers can add their own practice topics without changing code.

1. Open the app.
2. Expand `Custom skills`.
3. Enter a skill name, for example `Java`, `React`, `AWS`, or `Spring Boot`.
4. Add one question per line, or leave the question box empty.
5. Click `Add skill`.
6. The skill appears in `Technology practice` as `Custom - <skill name>`.
7. Select it and click `New question`.

If the question box is empty, the app creates starter questions for that skill, covering fundamentals, system design, troubleshooting, security, performance, CI/CD, and senior ownership.

Custom skills are saved in browser local storage.

## Mock Interview Sets

The app includes fixed mock interview rounds. Use `Mock interview set` to choose one.

Examples:

- GKE production troubleshooting
- Terraform and GCP platform design
- SRE incident and reliability
- CI/CD and GitOps
- Security and observability
- Platform engineering
- MLOps and LLMOps
- Behavioral ownership
- Today's audio interview recap

The 50-day plan is available in the app and in:

```text
50-day-interview-plan.md
```

The mock set list is available in:

```text
mock-interview-sets.md
```

## Project Structure

```text
ai-mock-interviewer/
  public/
    index.html
    app.js
    styles.css
    mock-interview-sets.json
    50-day-plan.json
  server.js
  package.json
  package-lock.json
  data/
  scripts/
  chrome-extension/
  README.md
```

Important files:

- `server.js`: local Node.js server and API routes.
- `public/index.html`: main app page.
- `public/app.js`: interview logic, audio, state, and question flow.
- `public/styles.css`: UI styling.
- `public/mock-interview-sets.json`: fixed mock interview rounds.
- `public/50-day-plan.json`: daily practice plan.

## Developer Customization

Developers can customize the app in two ways:

- From the UI: add custom skills and questions in `Custom skills`.
- From code/data files: edit mock sets, topic banks, styles, or backend behavior.

Common files to edit:

- Add fixed interview rounds: `public/mock-interview-sets.json`
- Add daily practice questions: `public/50-day-plan.json`
- Change frontend UI: `public/index.html`
- Change frontend logic/audio behavior: `public/app.js`
- Change styling: `public/styles.css`
- Change backend routes and LLM/offline behavior: `server.js`

## Chrome Extension

The `chrome-extension/` folder contains a local job autofill helper.

Install it manually:

1. Open `chrome://extensions`.
2. Enable `Developer mode`.
3. Click `Load unpacked`.
4. Select `ai-mock-interviewer/chrome-extension`.

The extension uses the same local server and profile data.

## Troubleshooting

Port `3030` already in use:

```bash
lsof -nP -iTCP:3030 -sTCP:LISTEN
kill <PID>
```

Then restart:

```bash
npm run start:offline
```

Dependencies fail to install:

```bash
node -v
npm -v
npm install
```

Make sure Node.js is version 20 or newer.

Microphone does not work:

- Use Chrome or Edge.
- Allow microphone permission in the browser.
- Try `Mic accent: English India`.
- Use typed answers if speech recognition is unavailable.

Ollama is not reachable:

```bash
ollama serve
```

Or use offline mode:

```bash
npm run start:offline
```

## GitHub Publishing Notes

Before publishing a fork, review the entire working tree and Git history for secrets and personal data. Never commit
`.env`, `data/applicant-profile.json`, local account/contact files, SQLite databases, logs, API credentials, session
secrets, résumés, or OAuth tokens. The repository includes safe examples and ignore rules, but those do not remove
data that was committed previously.

If sensitive data has ever been committed, removing it in a later commit is insufficient. Rotate exposed credentials
and use a history-rewriting tool such as `git filter-repo` before making the repository public, then coordinate the
forced update with every collaborator.

## License

This project is available under the [MIT License](LICENSE). See [CONTRIBUTING.md](CONTRIBUTING.md),
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), and [SECURITY.md](SECURITY.md) before contributing or reporting a problem.

## Maintainer

Maintained by [Akhilesh Ranjan Singh](https://github.com/iarsingh). For project questions, contact
[akhileshranjan.ks@gmail.com](mailto:akhileshranjan.ks@gmail.com) or open a GitHub issue.
