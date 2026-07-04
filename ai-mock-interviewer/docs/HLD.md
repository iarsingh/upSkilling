# High-Level Design - AI Mock Interviewer

## 1. Purpose

AI Mock Interviewer is a local-first interview preparation app for DevOps, SRE, Cloud, Platform Engineering, Technology Risk, MLOps, and LLMOps roles. It runs as a local Node.js server with a browser UI, asks realistic interview questions, supports voice-led practice, records or accepts typed answers, and produces feedback using either local fallback templates or an optional LLM provider.

## 2. Goals

- Run locally with minimal setup.
- Work in offline mode using built-in question banks and feedback templates.
- Support optional AI-generated questions and feedback through Ollama or Claude.
- Provide topic-focused practice across GKE, Terraform, GCP, SRE, MLOps, LLMOps, security, networking, Linux, behavioral, and custom skills.
- Preserve user progress in browser local storage.
- Support JD-based interview preparation through pasted text, URL import, or uploaded files.
- Provide a Chrome extension helper for job application autofill and cover-letter generation.

## 3. Non-Goals

- Multi-user SaaS authentication.
- Cloud-hosted persistence.
- Real-time collaboration.
- Enterprise-grade analytics.
- Payment, subscriptions, or tenant management.
- A fully autonomous job application submitter.

## 4. Architecture Style

The app uses a simple local monolith design:

```text
Browser UI
  -> Static files from Node server
  -> LocalStorage for interview state
  -> Browser speech APIs for audio/speech
  -> HTTP APIs on localhost
  -> Optional Ollama/Claude for AI generation
```

The server is intentionally lightweight:

- Serves static assets from `public/`.
- Exposes JSON APIs under `/api/*`.
- Reads local profile/question-bank files.
- Extracts text from uploaded JD files.
- Calls optional LLM providers.
- Falls back to local templates when offline or when LLM calls fail.

## 5. Technology Stack

- Runtime: Node.js HTTP server.
- Frontend: HTML, CSS, browser JavaScript.
- State: Browser `localStorage`.
- Voice output: Browser Speech Synthesis API.
- Voice input: Browser Speech Recognition API where supported.
- PDF parsing: `pdf-parse`.
- DOCX parsing: `mammoth`.
- OCR: `tesseract.js`.
- Local LLM: Ollama API.
- Optional hosted LLM: Anthropic Claude SDK.
- Chrome extension: Manifest v3 extension files under `chrome-extension/`.

## 6. System Context

```text
Candidate Browser
  |
  | GET /
  v
Node HTTP Server
  |
  | static assets
  v
public/index.html + public/app.js + public/styles.css
  |
  | /api/question, /api/feedback, /api/final-feedback
  v
Node API Layer
  |
  | optional
  +--> Ollama localhost API
  |
  | optional
  +--> Claude API
  |
  | fallback
  +--> Built-in question bank and feedback templates

Local files:
  - data/applicant-profile.json
  - 1000 DevOps + MLOps + Kubernetes + GCP Interview Questions.txt
  - public/mock-interview-sets.json
  - public/30-day-plan.json
```

## 7. Major Components

### 7.1 Browser Interview UI

Files:

- `public/index.html`
- `public/app.js`
- `public/styles.css`

Responsibilities:

- Render interview setup controls.
- Maintain interview sessions and progress history.
- Select question pools by topic, day plan, mock set, custom JD, or custom skill.
- Read questions aloud using browser speech synthesis.
- Capture spoken answers when Speech Recognition is available.
- Allow typed answers as fallback.
- Submit answers for feedback.
- Save progress in `localStorage`.

### 7.2 Local Node Server

File:

- `server.js`

Responsibilities:

- Serve static assets.
- Provide health checks.
- Provide large question bank data.
- Generate questions with LLM or fallback bank.
- Generate answer feedback with LLM or fallback templates.
- Generate final interview feedback.
- Import JD text from URL when online mode is enabled.
- Extract JD text from PDF, DOCX, TXT, Markdown, and image uploads.
- Provide applicant profile data for autofill.
- Generate autofill suggestions and cover letters.

### 7.3 Question Sources

Sources:

- Built-in arrays in `public/app.js`.
- Large text bank: `1000 DevOps + MLOps + Kubernetes + GCP Interview Questions.txt`.
- Fixed sets: `public/mock-interview-sets.json`.
- Daily plan: `public/30-day-plan.json`.
- Custom skill questions stored in browser local storage.
- Custom JD-generated question pool built in the browser.
- Optional LLM-generated question from `/api/question`.

### 7.4 Feedback Engine

Feedback can come from:

- Ollama local model.
- Claude API.
- Local fallback templates.

Feedback types:

- Per-question feedback.
- Final interview feedback.
- Offline template feedback when LLM is unavailable or offline mode is active.

### 7.5 JD Import and Extraction

Supported JD input:

- Manual paste.
- Public URL import in online mode.
- Local file upload.

Supported upload types:

- PDF
- DOCX
- TXT
- Markdown
- PNG/JPG/WEBP/TIFF/BMP images through OCR

### 7.6 Chrome Extension

Files:

- `chrome-extension/manifest.json`
- `chrome-extension/content.js`
- `chrome-extension/popup.html`
- `chrome-extension/popup.js`
- `chrome-extension/popup.css`

Responsibilities:

- Read job application forms in the browser.
- Request autofill suggestions from the local app server.
- Generate cover-letter text from the applicant profile and page context.
- Never submit forms automatically.

## 8. Runtime Modes

### 8.1 Offline Mode

Command:

```bash
npm run start:offline
```

Behavior:

- Uses built-in question bank.
- Uses feedback templates.
- Does not call Claude.
- Does not import public JD URLs.
- Allows pasted JD text.
- Allows local JD file upload/extraction.
- Runs without internet or Ollama.

### 8.2 Ollama Mode

Command:

```bash
npm start
```

Behavior:

- Calls local Ollama at `OLLAMA_URL`.
- Default model is `llama3.1:8b`.
- Falls back to local templates if Ollama call fails.

### 8.3 Claude Mode

Environment:

```bash
LLM_PROVIDER=claude
ANTHROPIC_API_KEY=...
```

Behavior:

- Uses Anthropic SDK.
- Requires API key.
- Disabled by offline mode.

## 9. API Surface

### Static Routes

- `GET /` - main app.
- `GET /app.js` - browser logic.
- `GET /styles.css` - styles.
- `GET /admin.html` - admin/report page.
- `GET /admin.js` - admin/report logic.
- `HEAD` static routes are supported for browser/proxy checks.

### JSON APIs

- `GET /api/health`
- `GET /api/autofill-profile`
- `GET /api/question-bank`
- `POST /api/question`
- `POST /api/feedback`
- `POST /api/final-feedback`
- `POST /api/import-jd-url`
- `POST /api/import-jd-file`
- `POST /api/import-jd-pdf`
- `POST /api/autofill-suggestions`
- `POST /api/cover-letter`

## 10. Data Storage

The app does not use a server-side database.

Server-side storage:

- Local files in the repository.
- Static JSON/text question banks.
- Applicant profile JSON.

Browser-side storage:

- Interview sessions.
- Current answer drafts.
- Interview history.
- Custom skills.
- Saved CV/JD context.
- UI preferences.

Storage mechanism:

- `localStorage` using key `aiMockInterviewerState`.

## 11. Security and Privacy

- Runs locally by default.
- Uploaded JD files are processed by the local Node server.
- Browser interview state remains in local storage.
- Public JD URL import is disabled in offline mode.
- Chrome extension asks the local server for suggestions but does not submit forms.
- Sensitive data should not be pasted into prompts unless the chosen LLM provider is trusted.
- Offline mode is safest for private preparation.

## 12. Deployment View

Primary target is local development/runtime:

```text
Candidate Machine
  - Node.js server on 127.0.0.1:3030
  - Browser UI
  - Optional Ollama on 127.0.0.1:11434
  - Local files and localStorage
```

This project is not designed as a hosted multi-user app without additional auth, persistence, and tenant isolation.

## 13. Reliability and Fallback Design

Fallback behavior is central to the app:

- If offline mode is enabled, question and feedback APIs use local fallback immediately.
- If Ollama/Claude calls fail, the server returns fallback question/feedback.
- If Speech Recognition is unavailable, user can type answers manually.
- If URL import fails, user can paste or upload the JD.
- If a custom skill has no manual questions, the browser creates starter questions.

## 14. Future Enhancements

- Add a lightweight local SQLite database for structured history.
- Add export/import of interview sessions.
- Add richer offline answer grading by matching against `final-qa-dataset.json`.
- Add a dedicated UI for MLOps situation practice.
- Add rate limits and origin checks if exposed beyond localhost.
- Add Playwright smoke tests for core browser flows.
- Add a diagram image generated from Mermaid or PlantUML.
