#!/usr/bin/env sh
set -eu

PROJECT_ID="${1:?usage: sh cloudsql-backup.sh PROJECT_ID INSTANCE_ID}"
INSTANCE_ID="${2:?usage: sh cloudsql-backup.sh PROJECT_ID INSTANCE_ID}"

gcloud sql backups create --project "$PROJECT_ID" --instance "$INSTANCE_ID"

