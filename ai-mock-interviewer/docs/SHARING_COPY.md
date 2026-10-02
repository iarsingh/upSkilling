# Public sharing copy

Drafts for review. Nothing in this file has been posted or sent.

## Suggested post

I built AI Mock Interviewer to bring technical interview practice into one local-first workflow.

It supports topic-based mock interviews, typed and browser-assisted voice answers, job-description practice, and a question bank with more than 9,500 questions and answers. The core practice flow works without a paid AI API, with optional Ollama or hosted AI feedback when configured.

The project uses Node.js, browser JavaScript, SQLite for interview sessions, and optional PostgreSQL for accounts. I focused on practical engineering decisions: offline fallbacks, content synchronization, persistence, and ownership checks.

It's a learning and portfolio project, and I'm sharing both its implementation and its limitations. Answers and AI feedback may be incorrect or outdated, so please verify them against official documentation. I'd welcome feedback on the setup experience, question quality, and which practice workflows would be most useful.

Repository: https://github.com/iarsingh/ai-mock-interviewer
Case study: https://github.com/iarsingh/ai-mock-interviewer/blob/main/docs/PUBLIC_CASE_STUDY.md

#OpenSource #DevOps #SRE #InterviewPreparation #SoftwareEngineering

## Short portfolio description

Built a local-first technical interview practice application with a 9,500+ question bank, typed/voice workflows, job-description parsing, and optional local or hosted AI feedback. Implemented persistence and ownership checks, synchronized content validation, and offline operation. Documented the architecture, storage boundaries, and deployment limitations.

## Before using these drafts

- The case study is on `main`.
- Branch tips no longer contain `data/applicant-profile.json`. Old commit IDs can still be downloaded until GitHub purges cached history, so do not promote the repository more widely until that purge is done.
- Confirm rights to redistribute contributed interview material.
- Use a synthetic account and sample answers for a screenshot or demo video.
- Do not claim production readiness, validated accuracy, adoption, or interview outcomes without evidence.
