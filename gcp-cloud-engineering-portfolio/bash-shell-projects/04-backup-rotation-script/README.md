# Project 04: Backup Rotation Script

## Skill
Backup automation, tar archives, retention, safe cleanup, timestamps, and operational reporting.

## Run

```sh
sh scripts/backup-rotate.sh ./source ./backups 7
```

## Interview Q&A

**Q: Why should backup scripts verify source directories?**  
A: To avoid creating empty or misleading backups when the source path is wrong.

**Q: What is retention policy?**  
A: A rule that decides how long backups are kept before deletion, balancing recovery needs and storage cost.

