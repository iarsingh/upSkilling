# Project 00: Linux Health Check

## Skill
Linux troubleshooting, disk checks, memory checks, process checks, network checks, and report generation.

## Run

```sh
sh scripts/health-check.sh
```

## Interview Q&A

**Q: Why should health check scripts return non-zero on failure?**  
A: CI/CD systems and monitoring jobs use exit codes to decide whether a task passed or failed.

**Q: Why use `df -h` and `du -sh` differently?**  
A: `df` shows filesystem capacity. `du` shows file or directory usage.

