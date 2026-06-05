# Restore Test Runbook

1. Confirm approved maintenance window.
2. Create a temporary restore target.
3. Restore the latest backup.
4. Run smoke tests against restored data.
5. Record restore duration and data freshness.
6. Delete temporary resources after sign-off.

## Success Criteria

- Restore completes inside RTO.
- Restored data meets RPO.
- Application smoke test passes.

