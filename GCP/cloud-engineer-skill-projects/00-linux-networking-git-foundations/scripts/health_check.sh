#!/usr/bin/env sh
set -eu

TARGET_URL="${1:-https://www.google.com}"

printf "== System ==\n"
hostname
date
uptime

printf "\n== Disk ==\n"
df -h /

printf "\n== Memory ==\n"
vm_stat 2>/dev/null || free -m

printf "\n== Network ==\n"
if command -v curl >/dev/null 2>&1; then
  curl -I --max-time 5 "$TARGET_URL"
else
  printf "curl not found\n"
fi

