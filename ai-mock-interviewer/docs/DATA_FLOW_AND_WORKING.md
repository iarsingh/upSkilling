# Data Flow and Working - AI Mock Interviewer

## 1. Simple Overview

AI Mock Interviewer works like a local interview cockpit.

```text
Browser UI
  -> loads static app from Node server
  -> stores interview state in localStorage
  -> asks Node APIs for questions and feedback
  -> Node uses built-in files, Ollama, Claude, or fallback templates
```

There is no production database. Most user progress lives in the browser. The server reads local files and returns JSON responses.

## 2. Startup Flow

### 2.1 Offline Mode

```text
npm run start:offline
  -> OFFLINE_ONLY=1 node server.js
  -> server listens on 127.0.0.1:3030
  -> static app is available at /
  -> question and feedback APIs use local fallback immediately
```

Offline mode is best when:

- Ollama is not running.
- Internet is unavailable.
- You want private local-only interview practice.

### 2.2 Ollama Mode

```text
npm start
  -> node server.js
  -> server listens on 127.0.0.1:3030
  -> /api/health checks Ollama at 127.0.0.1:11434
  -> question/feedback APIs try Ollama
  -> if Ollama fails, server returns fallback output
```

### 2.3 Claude Mode

```text
LLM_PROVIDER=claude ANTHROPIC_API_KEY=... npm start
  -> server uses Anthropic SDK
  -> prompts go to Claude API
  -> fallback templates are used if the call fails
```

## 3. Page Load Flow

```text
User opens http://127.0.0.1:3030
  -> browser requests GET /
  -> server maps / to public/index.html
  -> browser loads /styles.css and /app.js
  -> app.js initializes DOM references
  -> app.js loads saved localStorage state
  -> app.js loads question sources:
       /api/question-bank
       /30-day-plan.json
       /mock-interview-sets.json
  -> UI becomes ready
```

Important files:

- `server.js`
- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `public/30-day-plan.json`
- `public/mock-interview-sets.json`

## 4. Health Check Flow

```text
Browser calls /api/health
  -> server checks runtime mode
  -> offline mode returns provider=offline
  -> Claude mode checks if API key exists
  -> Ollama mode calls OLLAMA_URL/api/tags
  -> browser updates status pill
```

This tells the user whether the runtime is using offline fallback, Ollama, or Claude.

## 5. Question Source Flow

Questions can come from multiple sources.

```text
Built-in arrays in public/app.js
  + large bank from /api/question-bank
  + fixed mock sets from public/mock-interview-sets.json
  + 30-day plan from public/30-day-plan.json
  + custom JD questions
  + custom skill questions in localStorage
  + optional LLM generated question from /api/question
```

The browser chooses the pool based on UI selections:

```text
Technology practice
Mock interview set
30-day practice plan
Question order
Custom skill
Custom JD mode
```

## 6. New Question Flow

When the user clicks `New question`:

```text
Click New question
  -> browser saves current answer draft
  -> browser builds questionPool()
  -> browser filters by selected technology
  -> browser selects next/random question
  -> question appears on screen
  -> question is stored in current interview history
  -> question audio may start
  -> state is saved to localStorage
```

If the app requests server-generated question:

```text
Browser POST /api/question
  -> server reads role, level, topic, history, CV, JD
  -> if OFFLINE_ONLY, return fallbackQuestion()
  -> else build questionPrompt()
  -> call Ollama or Claude
  -> clean generated response
  -> return question
  -> on failure, return fallbackQuestion()
```

## 7. Question Audio Flow

```text
Question is displayed
  -> browser uses speechSynthesis
  -> chooses voice based on Voice tone
  -> reads question aloud
  -> if real-time simulation is enabled
       question audio completion can start microphone
```

Browser API:

- `window.speechSynthesis`

Fallback:

- User reads question manually if browser speech is unavailable.

## 8. Answer Capture Flow

### 8.1 Voice Answer

```text
User clicks mic or simulation starts mic
  -> browser starts SpeechRecognition
  -> recognized speech is appended to answer textarea
  -> silence timer detects pause
  -> app can auto-submit answer in live mode
```

Browser APIs:

- `window.SpeechRecognition`
- `window.webkitSpeechRecognition`

Fallback:

- User types answer manually.

### 8.2 Typed Answer

```text
User types answer
  -> answer textarea updates
  -> draft is saved in current question history
  -> state is saved to localStorage
```

## 9. Per-Question Feedback Flow

When the user submits an answer:

```text
Browser POST /api/feedback
  -> sends question, answer, role, level, CV, JD
  -> server validates answer is not empty
  -> if OFFLINE_ONLY, fallbackQuestionFeedback()
  -> else build feedbackPrompt()
  -> call Ollama or Claude
  -> return markdown feedback
  -> on failure, fallbackQuestionFeedback()
  -> browser converts markdown to HTML
  -> feedback appears in UI
  -> answer is saved to current interview
```

Offline feedback checks:

- Word count.
- Whether answer mentions useful production signals.
- Whether answer includes operating details like metrics, logs, traces, SLOs, rollback, runbooks, IAM, risk, or impact.

## 10. Final Interview Feedback Flow

When the user clicks `End interview & feedback`:

```text
Browser builds transcript from saved answers
  -> POST /api/final-feedback
  -> server validates transcript exists
  -> if OFFLINE_ONLY, fallbackFinalFeedback()
  -> else build finalFeedbackPrompt()
  -> call Ollama or Claude
  -> return markdown feedback
  -> browser renders feedback
  -> interview can be archived to progress history
```

Final feedback includes:

- What the candidate said.
- Score.
- Hire signal.
- Strengths.
- Gaps.
- Market skill coverage.
- Better sample answers.
- 7-day improvement plan.
- Next mock interview focus.

## 11. Local Storage Flow

The app uses browser local storage as the main persistence layer.

```text
User changes setup / answers question / adds custom skill
  -> app updates in-memory state
  -> saveState()
  -> JSON stored under aiMockInterviewerState
```

Stored data includes:

- Interview sessions.
- Current question and answer.
- Answer history.
- Final feedback.
- Progress history.
- Custom skills.
- CV/JD text.
- UI preferences.

Important consequence:

- Data stays in the browser.
- Clearing browser storage removes saved progress.
- Another browser/device will not automatically have the same history.

## 12. Custom Skill Flow

```text
User opens Custom skills
  -> enters skill name
  -> optionally enters questions
  -> clicks Add skill
  -> app creates skill id
  -> if no questions, starter questions are generated
  -> skill is saved in localStorage
  -> skill appears in Technology practice dropdown
```

When selected:

```text
Technology practice = Custom skill
  -> questionPool() returns that custom skill's questions
```

## 13. Custom JD Flow

### 13.1 Manual Paste

```text
User pastes CV/JD text
  -> clicks Save CV and JD
  -> app saves context in localStorage
  -> Custom JD mock interview uses pasted context
```

### 13.2 URL Import

```text
User enters JD URL
  -> browser POST /api/import-jd-url
  -> server fetches URL
  -> server converts HTML to text
  -> server returns extracted text
  -> browser stores JD text
```

Disabled in offline mode.

### 13.3 File Upload

```text
User uploads file
  -> browser converts file to base64
  -> POST /api/import-jd-file
  -> server decodes file
  -> server extracts text based on file type
  -> browser stores extracted JD text
```

Extraction methods:

- PDF: `pdf-parse`
- DOCX: `mammoth`
- Text/Markdown: UTF-8
- Image: `tesseract.js` OCR

## 14. Chrome Extension Flow

```text
User opens job application page
  -> extension content script scans visible fields
  -> popup asks local app for suggestions
  -> POST /api/autofill-suggestions
  -> server reads applicant profile
  -> LLM or fallback maps fields to values
  -> extension fills suggested values
```

Cover letter flow:

```text
Extension sends page text
  -> POST /api/cover-letter
  -> server uses profile + job page context
  -> returns cover letter
```

Safety rule:

- Extension assists filling fields.
- It should not submit applications automatically.

## 15. File/Data Relationship

```text
public/index.html
  -> layout and controls

public/app.js
  -> interview logic, state, question pools, audio, feedback rendering

public/styles.css
  -> UI styles

server.js
  -> HTTP server, APIs, LLM calls, fallback logic, JD extraction

data/applicant-profile.json
  -> candidate profile for autofill and prompts

public/mock-interview-sets.json
  -> fixed interview rounds

public/30-day-plan.json
  -> daily practice plan

1000 DevOps + MLOps + Kubernetes + GCP Interview Questions.txt
  -> large parsed question bank

scripts/answer-bank/*.json
  -> curated answer banks used to generate final QA dataset
```

## 16. Answer Bank Generation Flow

The generated QA dataset is created by scripts.

```text
scripts/answer-bank/*.json
  + public/app.js question arrays
  + public/mock-interview-sets.json
  + large text bank
  -> scripts/generate-full-qa-document.js
  -> scripts/answer-bank/final-qa-dataset.json
```

Export scripts also generate:

- `all-tech-and-mock-interview-questions.txt`
- `all-tech-and-mock-interview-questions-with-answers.txt`
- `AI-Mock-Interview-Question-Bank.docx`

## 17. End-to-End Example

Scenario: user practices an MLOps interview in offline mode.

```text
1. User runs npm run start:offline.
2. Browser opens http://127.0.0.1:3030.
3. App loads index.html, app.js, styles.css.
4. App calls /api/health and sees provider=offline.
5. User selects Technology practice = MLOps / Vertex AI.
6. User clicks New question.
7. Browser selects question from local MLOps/LLMOps pools.
8. Browser reads question aloud.
9. User speaks or types answer.
10. User submits answer.
11. Browser POSTs /api/feedback.
12. Server returns fallback template feedback immediately.
13. Browser renders feedback.
14. User continues until End interview.
15. Final feedback is generated from saved transcript.
16. Progress is archived in browser localStorage.
```

## 18. Mental Model

```text
Node server = local runtime and API layer
Browser UI = interview engine and user state
localStorage = saved sessions/progress
Question banks = local practice content
Ollama/Claude = optional better generation
Fallback templates = always-available safety net
Speech APIs = voice interview experience
JD import = role-specific practice context
Chrome extension = job application helper
```

