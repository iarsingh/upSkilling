#!/usr/bin/env sh
set -eu

LOG_FILE="${1:-/var/log/system.log}"
PATTERN="${2:-error|failed|denied|timeout}"

if [ ! -r "$LOG_FILE" ]; then
  printf "Cannot read log file: %s\n" "$LOG_FILE" >&2
  exit 1
fi

grep -Ein "$PATTERN" "$LOG_FILE" | tail -50

