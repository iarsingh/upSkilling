# Contributing

Thanks for helping improve AI Mock Interviewer.

## Development setup

1. Fork and clone the repository.
2. Install Node.js 20 or newer and run `npm ci`.
3. Copy `.env.example` to `.env` only when local configuration is needed.
4. Run `npm run start:offline` and open `http://127.0.0.1:3030`.

## Before opening a pull request

- Keep secrets, résumés, personal profiles, generated logs, and local databases out of commits.
- Add or update tests for behavior changes.
- Run `npm test`, `npm run audit:answer-quality`, and `npm run check:production` with suitable test environment variables.
- Keep question answers factual, self-contained, and free of invented personal experience.
- Explain the purpose, user impact, verification, and any migration concerns in the pull request.

Use focused commits and avoid unrelated generated-file changes. By contributing, you agree that your contribution is licensed under the repository's MIT License.
