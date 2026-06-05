#!/usr/bin/env sh
set -eu

LOG_FILE="${1:-sample.log}"
PATTERN="${2:-ERROR|WARN|denied|timeout|failed}"

if [ ! -r "$LOG_FILE" ]; then
  printf "log file is not readable: %s\n" "$LOG_FILE" >&2
  exit 1
fi

printf "file=%s\n" "$LOG_FILE"
printf "pattern=%s\n" "$PATTERN"
printf "matches=%s\n" "$(grep -Eic "$PATTERN" "$LOG_FILE" || true)"

printf "\n== Recent Matches ==\n"
grep -Ein "$PATTERN" "$LOG_FILE" | tail -20 || true

