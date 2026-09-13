# AI Mock Interviewer

<!-- repository-summary -->
Voice-led AI mock interview practice for DevOps, SRE, Cloud, Platform Engineering, MLOps, and software engineering roles.
<!-- /repository-summary -->

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
- [Choose a Run Mode](#choose-a-run-mode)
- [Run With Local Ollama](#run-with-local-ollama)
- [Run Online With an API Key](#run-online-with-an-api-key)
- [Use ChatGPT or Another Chat UI](#use-chatgpt-or-another-chat-ui)
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

From an existing checkout, run these commands in the `ai-mock-interviewer` folder.
Use Node.js 22 (the version in `.nvmrc`); if you use nvm, run `nvm install` and `nvm use` first.

```bash
npm ci
cp .env.example .env
npm run start:offline
```

On Windows PowerShell, use `Copy-Item .env.example .env` in place of `cp`.
If you already have `.env`, keep it and update its local settings instead of overwriting it:

```dotenv
NODE_ENV=development
HOST=127.0.0.1
PORT=3030
OFFLINE_ONLY=1
DATABASE_URL=
SESSION_SECRET=
```

Open **http://127.0.0.1:3030**, create an account at `/signup.html` (password: 8–128
characters), then sign in and choose a practice topic. No API key, PostgreSQL,
Python environment, or frontend build is required. Dependencies must be installed
before working offline. Typed answers work without browser speech recognition;
voice recognition may require an internet connection supplied by the browser.

Leave the terminal running. Press **Ctrl+C** to stop the server. For automatic
restart while editing server code, run `node --watch server.js` with `OFFLINE_ONLY=1`
in `.env`.

To verify startup, open http://127.0.0.1:3030/health/ready; it should return
`"status":"READY"`. You can also run:

```bash
curl http://127.0.0.1:3030/health/ready
npm test
```

Optional: create a private local profile for job autofill and cover-letter features:

```bash
cp data/applicant-profile.example.json data/applicant-profile.json
```

### Question-bank maintenance (optional)

Startup uses the checked-in question bank directly. It does not regenerate large
exports or require another repository's Python environment.

After changing question-bank sources, regenerate the JSON and text exports with:

```bash
node scripts/generate-full-qa-document.js
node scripts/generate-txt-exports.js
```

The legacy `npm run sync:question-bank` command also builds the Word document and
requires `../.venv/bin/python` with `python-docx` installed. For a standalone clone,
you can generate that document separately using your own Python environment:

```bash
python3 -m venv .venv
.venv/bin/python -m pip install python-docx
.venv/bin/python scripts/build-docx.py
```

On Windows, use `.venv\Scripts\python.exe` for the last two commands.

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

Legacy practice history and custom skills live in browser `localStorage`. Skills Dashboard interviews
are stored separately in SQLite and associated with the signed-in account. Back up `data/` to retain
local accounts and server-persisted interviews; browser-only progress stays in that browser and origin.

If you change hosts or want existing sessions to survive a server restart on a read-only deployment, set a
`SESSION_SECRET` environment variable to a long random string; otherwise a secret is generated once and saved to
`data/session-secret.txt` (also git-ignored).

## Choose a Run Mode

Complete [Quick Start](#quick-start) once, then choose one of these modes. The app
always opens at **http://127.0.0.1:3030** unless you change `PORT`.
Here, “online” means using a cloud AI API while the app runs on your computer;
public hosting is covered separately under deployment.

| Mode | Configuration in `.env` | Start command | API key / internet |
| --- | --- | --- | --- |
| Offline question bank and template feedback | `OFFLINE_ONLY=1` | `npm run start:offline` | No key; no internet for typed practice after installation |
| Local Ollama AI | `OFFLINE_ONLY=0`, `LLM_PROVIDER=ollama` | `npm start` | No key; internet needed to download the local model initially |
| OpenAI API | `OFFLINE_ONLY=0`, `LLM_PROVIDER=openai` | `npm start` | OpenAI API key and internet |
| Anthropic Claude API | `OFFLINE_ONLY=0`, `LLM_PROVIDER=claude` | `npm start` | Anthropic API key and internet |
| ChatGPT or another chat UI alongside the app | Keep the app in offline mode | `npm run start:offline` | Manual copy/paste; the chat tool has its own requirements |

Keep `NODE_ENV=development` and `DATABASE_URL=` for local use in every mode.
Edit the existing variables in `.env`, then stop the server with **Ctrl+C** and
restart it. Terminal environment variables override `.env`.
**`npm run start:offline` always forces offline mode**, even when `.env` says `OFFLINE_ONLY=0`.

## Run With Local Ollama

1. Install Ollama using the [official quickstart](https://docs.ollama.com/quickstart).
2. Start the Ollama desktop app or run this in a separate terminal:

   ```bash
   ollama serve
   ```

   If Ollama is already running on port `11434`, keep that instance running;
   you do not need a second server.

3. Download the app's default local model and check that it is installed:

   ```bash
   ollama pull llama3.1:8b
   ollama list
   ```

4. Set these values in the project's `.env`:

   ```dotenv
   OFFLINE_ONLY=0
   LLM_PROVIDER=ollama
   OLLAMA_URL=http://127.0.0.1:11434
   OLLAMA_MODEL=llama3.1:8b
   OLLAMA_TIMEOUT_MS=90000
   ```

5. Start the interview app from the project folder:

   ```bash
   npm start
   ```

Open **http://127.0.0.1:3030**, sign in, and begin a practice interview.
To use another model, download it with `ollama pull <model-name>` and set
`OLLAMA_MODEL` to the exact installed name shown by `ollama list`.

With a downloaded local model, inference runs on your machine without a cloud API
key. `OFFLINE_ONLY=0` enables AI calls, including calls to local Ollama; it does not
mean Ollama requires cloud inference. Public JD URL import and browser speech
recognition may still use the internet. Use pasted JD text and typed answers when
you want to practice without internet access.

## Run Online With an API Key

The server supports OpenAI and Anthropic directly. Put the selected provider's key
in the project's git-ignored `.env` file, never in browser JavaScript or a chat
prompt. Cloud mode sends the relevant interview prompt and included context to
that provider. API usage is subject to the provider's billing and access limits.

### OpenAI API

Create an API key in the OpenAI developer platform and configure API billing/access
for your project; follow the [official API quickstart](https://developers.openai.com/api/docs/quickstart).
Then edit `.env`:

```dotenv
OFFLINE_ONLY=0
LLM_PROVIDER=openai
OPENAI_API_KEY=replace-with-your-openai-api-key
OPENAI_MODEL=gpt-5-mini
```

`gpt-5-mini` is this repository's configured default. If it is unavailable to your
API project, set `OPENAI_MODEL` to a model your project can use with the Responses
API. The server calls `https://api.openai.com/v1/responses`.

```bash
npm start
```

Open **http://127.0.0.1:3030**, sign in, and request an interview question or feedback.
The app authenticates with `OPENAI_API_KEY`; signing in to ChatGPT in another tab
does not configure this integration.

### Anthropic Claude API

Create a key through the Claude Console following the
[official authentication guide](https://platform.claude.com/docs/en/manage-claude/authentication).
Add or update these variables in `.env`:

```dotenv
OFFLINE_ONLY=0
LLM_PROVIDER=claude
ANTHROPIC_API_KEY=replace-with-your-anthropic-api-key
CLAUDE_MODEL=replace-with-an-accessible-claude-model-id
```

Replace `CLAUDE_MODEL` with an actual model ID available to your API account before
starting. Set it explicitly rather than relying on the repository's baked-in default.
The server uses Anthropic's Messages API through its SDK.

```bash
npm start
```

Open **http://127.0.0.1:3030**, sign in, and begin an interview.

### Verify the selected provider

Open **http://127.0.0.1:3030/api/health**. Its `provider` field should be `offline`,
`ollama`, `openai`, or `claude`, matching your selection. You can also run:

```bash
curl http://127.0.0.1:3030/api/health
```

For cloud providers, `ok: true` checks that a key is configured; it does **not**
validate the key, model access, billing, or a successful AI response. For Ollama,
it checks the server's model-list endpoint. Request a question or feedback in the
app and inspect the server terminal for provider errors; some interview flows
fall back to built-in questions when generation fails.

## Use ChatGPT or Another Chat UI

You can use ChatGPT, Claude's chat interface, or another chat tool alongside this
app without adding an API key to the app:

1. Run `npm run start:offline` and open **http://127.0.0.1:3030**.
2. Pick a question and write or speak your own answer.
3. Copy the question and your answer into your preferred chat UI with this prompt:

   ```text
   Act as a technical interview coach.
   Role: [target role]
   Question: [paste the interview question]
   My answer: [paste my answer]

   Assess technical accuracy, clarity, and practical depth. Point out mistakes,
   suggest a stronger answer, and ask one follow-up question. Do not invent
   experience or achievements on my behalf.
   ```

4. Review the feedback in that chat tool and continue practicing in the app.

This is a manual workflow: chat feedback and conversation history are not
imported or synchronized into the interview app. The app has no built-in ChatGPT
login connector or browser-chat integration. For automatic AI feedback inside the
app, use the Ollama or API configurations above.

A separate local chat UI can be used for manual practice too, but the app's Ollama
connection must point to the **Ollama API** at port `11434`, not that UI's web page.
Other tools exposing only an OpenAI-compatible Chat Completions endpoint are not
currently configurable through `.env`: this app's OpenAI endpoint is fixed to the
OpenAI Responses API. Supporting a different endpoint/provider requires code changes.

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
2. Create an account or sign in, then choose a `Technology practice` topic or select a `Mock interview set`.
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
- Uses local template feedback without calling an AI provider.

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

Eleven additional question-only sets preserve the order of user-shared interview summaries:

- **Actual Interview - GKE Architecture, Policy as Code and GitOps**: 10 topic groups with follow-ups.
- **Actual Interview - GCP Troubleshooting, CI/CD, Migration and Docker**: 28 questions.
- **Actual Interview - SRE Observability, GKE Internals and Python**: 23 questions.

- **Actual Interview - Vendor POC, Terraform Troubleshooting and AI/SRE Agents**: 25 questions.

- **Actual Interview - GCP DevOps and SRE Scenarios**: 70 questions.
- **Actual Interview - Production Experience, Multi-Cloud and SRE**: 62 questions.
- **Actual Interview - Wipro Director of Engineering: SRE, Python and Kubernetes**: 10 questions.
- **Actual Interview - Senior AWS Banking and Platform Architecture**: 17 questions.
- **Actual Interview - Managerial and HR Fitment**: 25 questions.
- **Actual Interview - Azure, AKS and Argo CD**: 35 questions.
- **Actual Interview - HR, GCP, Terraform and Artifact Promotion**: 38 questions.

Select **All technologies** under `Technology practice`, then choose the named
`Mock interview set` to include the full round. See
[the captured rounds and separate HR discussion notes](docs/user-shared-interview-rounds.md).
Personal answers and employer policies are not inferred from these questions.

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

Port `3030` already in use: set `PORT=3031` in `.env`, restart the app, and open
http://127.0.0.1:3031. Browser-local progress is specific to each origin, including its port.

Startup reports `SESSION_SECRET` or `DATABASE_URL` is required: your environment is
set to production. For local use, set `NODE_ENV=development` and leave `DATABASE_URL`
blank. Check exported terminal variables too: they take precedence over `.env`.

Dependencies fail to install, or `better-sqlite3` reports a native module mismatch:
use the Node version in `.nvmrc`, then rerun `npm ci` from the project folder.
If npm needs to compile native modules, install your platform's C/C++ build tools
and Python. `npm ci` replaces installed dependencies without changing the lockfile.

Sign-in does not persist: use the same host consistently (`127.0.0.1` or `localhost`),
allow cookies, and use `NODE_ENV=development` for local HTTP. Production cookies require HTTPS.

AI mode still shows `offline`: start with `npm start` after setting `OFFLINE_ONLY=0`.
The `start:offline` command deliberately overrides that setting.

Cloud AI returns an authentication, quota, or model error: check the selected
provider, its API key, API billing/access, and the exact model ID. Restart after
editing `.env`. A successful health response alone does not validate cloud credentials.

Ollama reports a missing model or times out: check `ollama list`, download the model
named in `OLLAMA_MODEL`, and confirm `OLLAMA_URL`. A smaller installed model or a
larger `OLLAMA_TIMEOUT_MS` can help on slower machines.

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
