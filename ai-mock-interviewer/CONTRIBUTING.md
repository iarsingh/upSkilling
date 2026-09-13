# Contributing

## Development setup

1. Fork and clone the repository.
2. Use Node.js 22 (`nvm install && nvm use` when using nvm).
3. Run `npm ci`, optionally copy `.env.example` to `.env`, and run `npm run start:offline`.
4. Open http://127.0.0.1:3030 and create a local test account.

Run `npm run check:release` before opening a pull request. It requires no API key or
production database. For Word generator changes, create `.venv`, install
`requirements-docs.txt`, and run `npm run test:documents`.

## Question-bank changes

Edit the appropriate curated source in `scripts/answer-bank/` and preserve useful
question context. Avoid editing only generated exports. Run `npm run sync:actual-interviews`
after setting up the optional Python environment described in the README, inspect the
result, and include synchronized assets in the same PR. Cite authoritative documentation
for technical corrections. Personal answers must be marked as templates rather than
inventing experience. Read [the content policy](docs/CONTENT_POLICY.md).

## Pull requests

Keep changes focused, explain the resulting behavior, and include relevant verification.
Add tests for behavior changes. Never commit credentials, résumés, private profiles,
logs, databases or confidential interview material. Use synthetic test data.

By contributing, you confirm that you have the necessary rights and agree that your
contribution is licensed under this repository's MIT License. Existing third-party
notices and licenses must be preserved. Report vulnerabilities privately as described
in [SECURITY.md](SECURITY.md), not in public issues.
