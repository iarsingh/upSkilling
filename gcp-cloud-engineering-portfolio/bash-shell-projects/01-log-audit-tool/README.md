# Project 01: Log Audit Tool

## Skill
Log parsing, grep, awk, pattern matching, incident triage, and report generation.

## Run

```sh
sh scripts/log-audit.sh sample.log
```

## Interview Q&A

**Q: Why should log scanners support custom patterns?**  
A: Different incidents have different signals, such as timeout, denied, OOM, crash, or failed authentication.

**Q: Why use `tail` during incidents?**  
A: Recent logs are usually most relevant during an active incident.

