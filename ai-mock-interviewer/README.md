# AI Mock Interviewer

A local-first, voice-led mock interview simulator for DevOps, SRE, Cloud, Platform Engineering, and MLOps
preparation — runs entirely in your browser against a local Node server, with zero cloud dependency
required.

The app asks interview questions, reads them aloud, records or accepts typed answers, saves progress
locally, and works fully offline using a built-in question bank of 2,000+ questions with answers.

## Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Run With Local Ollama](#run-with-local-ollama)
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
- 30-day practice plan and fixed mock interview sets.
- Custom JD practice by pasting or uploading a job description.
- Custom skills from the UI, so developers can add Java, React, AWS, Spring Boot, or any other topic locally.
- Progress history saved in browser local storage.
- Optional local Ollama support for stronger AI feedback.

## Tech Stack

- **Runtime**: Node.js (built-in `http` module, no framework)
- **Frontend**: vanilla HTML/CSS/JS, browser Speech Synthesis + Speech Recognition APIs
- **State**: browser `localStorage` (no server-side database)
- **Optional AI**: local Ollama, or Anthropic Claude via `@anthropic-ai/sdk`
- **JD file parsing**: `pdf-parse`, `mammoth` (DOCX), `tesseract.js` (OCR)
- **Browser extension**: Manifest V3 Chrome extension (`chrome-extension/`)

## Requirements

- Node.js 18 or newer
- npm
- Git
- Chrome or Edge recommended for microphone features

Optional:

- Ollama, if you want local AI-generated feedback instead of offline template feedback.

## Quick Start

Clone the repo:

```bash
git clone <your-github-repo-url>
cd ai-mock-interviewer
```

Install dependencies:

```bash
npm install
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

The 30-day plan is available in the app and in:

```text
30-day-interview-plan.md
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
    30-day-plan.json
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
- `public/30-day-plan.json`: daily practice plan.

## Developer Customization

Developers can customize the app in two ways:

- From the UI: add custom skills and questions in `Custom skills`.
- From code/data files: edit mock sets, topic banks, styles, or backend behavior.

Common files to edit:

- Add fixed interview rounds: `public/mock-interview-sets.json`
- Add daily practice questions: `public/30-day-plan.json`
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

Make sure Node.js is version 18 or newer.

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

Commit these:

- Source files
- `package.json`
- `package-lock.json`
- `public/`
- `data/`
- Question bank files
- README and docs

Do not commit:

- `node_modules/`
- Local secrets or API keys
- Personal browser data

Recommended `.gitignore` entries:

```text
node_modules/
.env
.DS_Store
```

## License

No license file is included yet, which by default means all rights are reserved and others may not
reuse, modify, or redistribute this code. Add a `LICENSE` file (MIT is a common, permissive choice for a
portfolio tool like this) before publishing the repository publicly, if you want others to be able to use
it.
