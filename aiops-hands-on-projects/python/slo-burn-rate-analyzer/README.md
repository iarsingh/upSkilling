# AIOps Project: SLO Burn Rate Analyzer

## Goal

Calculate error budget burn rate from request and bad request counts.

## Run

```bash
cd aiops-hands-on-projects
python3 python/slo-burn-rate-analyzer/analyze_burn_rate.py --input data/slo_events.csv
```

## Interview Talking Points

- SLO target defines allowed error budget.
- Burn rate shows how quickly the service consumes error budget.
- Alerting on burn rate is better than raw error count alone.

