#!/usr/bin/env sh
set -eu

echo "== CPU and load =="
uptime
ps aux | sort -nrk 3 | head -10

echo "== Memory =="
ps aux | sort -nrk 4 | head -10

echo "== Disk =="
df -h
du -sh /var/log 2>/dev/null || true

