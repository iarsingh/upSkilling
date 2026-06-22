#!/usr/bin/env sh
set -eu

PROJECT_ID="${1:?usage: sh gce-list.sh PROJECT_ID}"

gcloud compute instances list \
  --project "$PROJECT_ID" \
  --format "table(name,zone.basename(),status,machineType.basename(),networkInterfaces[0].networkIP)"

