# Project 02: GCP VM Ops Toolkit

## Skill
GCP CLI automation, Compute Engine operations, labels, SSH commands, and safe dry-run patterns.

## Run

```sh
sh scripts/gce-list.sh PROJECT_ID
sh scripts/gce-ssh-iap.sh PROJECT_ID INSTANCE ZONE
```

## Interview Q&A

**Q: Why use IAP for SSH to GCE?**  
A: IAP lets you connect without exposing SSH to the public internet.

**Q: Why should cloud scripts support dry-run mode?**  
A: Dry-run mode helps operators review actions before making changes.

