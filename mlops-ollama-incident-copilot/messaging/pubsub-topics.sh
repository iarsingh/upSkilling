#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-local-mlops}"
gcloud pubsub topics create incident-telemetry --project "${PROJECT_ID}"
gcloud pubsub topics create incident-predictions --project "${PROJECT_ID}"
