#!/usr/bin/env bash
set -euo pipefail

dry_run="${DRY_RUN:-true}"

echo "dry_run=$dry_run"
docker system df

if [[ "$dry_run" == "true" ]]; then
  echo "Set DRY_RUN=false to prune unused Docker resources."
  exit 0
fi

docker system prune -f

