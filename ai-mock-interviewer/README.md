# AI Mock Interviewer

Local mock interview coach powered by Ollama.

## Run

Start Ollama:

```bash
ollama serve
```

In another terminal:

```bash
cd ai-mock-interviewer
npm start
```

Open:

```text
http://127.0.0.1:3030
```

## Model

Default model:

```text
llama3.1:8b
```

Override it:

```bash
OLLAMA_MODEL=mistral npm start
```

## Audio Input

The app uses browser microphone speech recognition when available. If your browser blocks or does not support speech recognition, type or paste the transcript into the answer box and use the same feedback flow.

## Job-Based Interview Rounds

1. Paste your full CV text into `CV / profile context`.
2. Paste the job description into `Job description`.
3. Click `Save CV and JD`.
4. Click `New question` to start `Interview 1`.
5. Use `Next interview` when you want to begin `Interview 2`, `Interview 3`, and so on for the same or a new JD.
6. Use `Previous` to return to earlier interview rounds and review their saved answers or final feedback.
7. Use the left `Interviews` sidebar to jump directly to any saved interview round.

The CV, JD, role, interview number, interview answers, drafts, and final feedback are saved in your browser local storage.

Completed interviews are also saved in `Progress History` after you click `End interview & feedback`. Each saved record keeps the date, role, selected day/mock set/JD mode, answer count, full Q&A transcript, JD snapshot, and final feedback so you can review progress later.

The default target profile is Senior GCP DevOps / SRE / Cloud Engineer for 6-8 years, with priority on GKE, Terraform, Python automation, SRE fundamentals, observability, GitOps, cloud security, platform engineering, Vertex AI/MLOps, GCP landing zones, FinOps, DR/backup, incident leadership, Linux/network fundamentals, and optional Go.

Question bank progress continues across interview rounds. For example, if `Interview 1` ends after question 5, `Interview 2` starts from question 6.

Questions are not repeated until the current question pool is exhausted. Saving a new CV/JD or importing a new JD resets the used-question tracker for the new target.

The app is a mock interview question generator. By default, `Question order` is set to `Random mock questions`, so clicking `New question` randomly selects from the active pool without repeating questions until the pool is exhausted. Switch to `Sequential questions` if you want ordered practice.

The built-in market question bank has 187 balanced senior-level questions across GKE, Terraform, GCP services, SRE, observability, security, networking, CI/CD, Python automation, platform engineering, MLOps, FinOps, Linux fundamentals, data reliability, DR, and senior behavioral ownership. The app also loads all 1120 questions from the local `1000 DevOps + MLOps + Kubernetes + GCP Interview Questions.txt` bank, including the GCP ML and Vertex AI questions.

Choose `Random full bank mock interview` from `Mock interview set` to generate random questions from the complete local question bank.

## Import Job Descriptions

Paste a public company/ATS job URL into `Import public JD URL`, then click `Import JD from URL`.

This works for pages that expose readable job text. Some boards block automated access, including many LinkedIn/Indeed-style pages; for those, paste the JD text manually into `Job description`.

When a JD is imported or pasted, the instant question pool adds JD-specific questions for matched skills such as GKE, Terraform, SRE, observability, GitOps, security, Python automation, platform engineering, networking, MLOps, FinOps, DR, landing zones, incident leadership, Linux fundamentals, and progressive delivery.

## Interview Modes

- `Live mock interview`: speak into the mic, stop the mic, and the app saves your answer and moves to the next question. Final feedback comes at the end.
- `Mock interview`: speak or type your answer, click `Save answer`, then click `New question` yourself when you are ready.
- Click `End interview & feedback` when you want the final report.

## 30-Day Plan

Use `30-day practice plan` to select `Day 1` through `Day 30`. Each day contains 6 mixed questions for a focused mock interview. Choose `All questions` to return to the full question bank.

The same Day 1-Day 30 rounds are also available inside `Mock interview set` as `Day 1 mock interview`, `Day 2 mock interview`, and so on. Use those when you want the app to run the day as an actual mock interview question flow.

The complete plan is also saved in `30-day-interview-plan.md`.

## Mock Interview Sets

Use `Mock interview set` when you want a fixed realistic round instead of the full question bank. It includes the Day 1-Day 30 mock interviews plus 12 extra sets with 8 questions each, covering GKE troubleshooting, Terraform/GCP platform design, SRE incidents, CI/CD and GitOps, security, observability, networking, platform engineering, MLOps, behavioral ownership, Google-style mixed rounds, and product-company final rounds.

Choose `Custom JD mock interview` after pasting or importing a JD to run an 8-question mock interview generated from that JD and your saved CV/profile context.

Selecting a mock set automatically clears the 30-day day selector. Selecting a day automatically clears the mock set selector.

The complete set list is saved in `mock-interview-sets.md`.

## What It Does

- Generates scenario-based interview questions, focused Day 1-Day 30 practice sets, or fixed mock interview rounds.
- Aligns questions to your CV and the JD you paste.
- Uses a built-in Senior GCP/SRE question bank for instant next questions.
- Accepts spoken answers through the browser microphone.
- Sends the final transcript to local Ollama when you end the interview.
- Saves every answer during the interview.
- Returns what you answered, stronger sample answers, market-skill coverage, final score, hire signal, strengths, weak areas, answer pattern, 7-day plan, and next mock focus at the end.

## Chrome Job Autofill Extension

The local Chrome extension lives in `chrome-extension/`. It uses `data/applicant-profile.json` plus this local server to fill job application forms, generate cover letters, and optionally use Ollama for unusual field mapping.

Install it from `chrome://extensions` with `Developer mode` -> `Load unpacked` -> select `ai-mock-interviewer/chrome-extension`.
