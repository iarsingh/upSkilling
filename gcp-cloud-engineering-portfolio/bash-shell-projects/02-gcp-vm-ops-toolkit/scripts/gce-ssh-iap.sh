#!/usr/bin/env sh
set -eu

PROJECT_ID="${1:?usage: sh gce-ssh-iap.sh PROJECT_ID INSTANCE ZONE}"
INSTANCE="${2:?usage: sh gce-ssh-iap.sh PROJECT_ID INSTANCE ZONE}"
ZONE="${3:?usage: sh gce-ssh-iap.sh PROJECT_ID INSTANCE ZONE}"

gcloud compute ssh "$INSTANCE" \
  --project "$PROJECT_ID" \
  --zone "$ZONE" \
  --tunnel-through-iap

