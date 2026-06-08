# AIOps Project: Auto-Remediation Simulator

## Goal

Simulate safe remediation decisions based on incident signals.

## Run

```bash
cd aiops-hands-on-projects
python3 python/auto-remediation-simulator/remediate.py --input data/remediation_signals.csv
```

## Interview Talking Points

- Not every incident should trigger automatic action.
- Low-risk actions can be automated; high-risk actions need approval.
- Remediation should be logged and reversible.

