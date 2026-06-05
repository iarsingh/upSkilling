#!/usr/bin/env sh
set -eu

THRESHOLD="${DISK_THRESHOLD_PERCENT:-85}"

printf "== Host ==\n"
hostname
date

printf "\n== Uptime ==\n"
uptime

printf "\n== Disk ==\n"
df -h /

usage="$(df / | awk 'NR==2 {gsub("%","",$5); print $5}')"
if [ "$usage" -ge "$THRESHOLD" ]; then
  printf "disk_usage_percent=%s threshold=%s status=critical\n" "$usage" "$THRESHOLD"
  exit 2
fi

printf "\n== Memory ==\n"
if command -v free >/dev/null 2>&1; then
  free -m
else
  vm_stat 2>/dev/null || true
fi

printf "\nstatus=healthy\n"

