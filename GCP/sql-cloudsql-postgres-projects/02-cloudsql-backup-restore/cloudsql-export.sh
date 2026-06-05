#!/usr/bin/env sh
set -eu

PROJECT_ID="${1:?usage: sh cloudsql-export.sh PROJECT_ID INSTANCE_ID GCS_URI}"
INSTANCE_ID="${2:?usage: sh cloudsql-export.sh PROJECT_ID INSTANCE_ID GCS_URI}"
GCS_URI="${3:?usage: sh cloudsql-export.sh PROJECT_ID INSTANCE_ID GCS_URI}"

gcloud sql export sql "$INSTANCE_ID" "$GCS_URI" --project "$PROJECT_ID"

