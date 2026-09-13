# Preparing a GitHub release

## Validate the candidate

Use a clean checkout on Node.js 22:

```bash
npm ci
npm run check:release
npm audit --omit=dev --audit-level=high
```

For changed Word/export tooling, set up `.venv` from `requirements-docs.txt`, run
`npm run test:documents` and `npm run sync:actual-interviews`, and inspect the resulting
content and document layout. Start the app in offline mode, verify `/health/ready`
and exercise the affected flows with synthetic accounts.

Run the container build with a working Docker daemon and wait for GitHub CI to pass.
The CI production configuration is synthetic and is not a production deployment test.

## Review publication scope

- Review current files and all branches/tags for credentials, private profiles and
  confidential content; ignore rules do not remove old commits.
- Resolve sensitive-history findings in an isolated mirror and verify removal before
  coordinating any force-push. Preserve current uncommitted work. Do not merge old
  history back afterward. Copies in forks, clones or GitHub caches may require separate
  cleanup; follow GitHub's documentation linked below.
- Confirm contribution provenance and preserve third-party notices. The MIT license
  does not grant rights to material contributors do not own.
- Confirm repository description/topics and enable appropriate branch protection,
  secret scanning/push protection and private vulnerability reporting where available.
- Review CHANGELOG.md, commit the verified candidate and publish/tag only after the
  maintainer approves the release. The npm package remains `private: true` to avoid
  accidental npm publication; this does not prevent open-source GitHub distribution.

GitHub guidance: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
