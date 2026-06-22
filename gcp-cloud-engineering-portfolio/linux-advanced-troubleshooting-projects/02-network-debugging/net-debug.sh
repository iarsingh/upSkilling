#!/usr/bin/env sh
set -eu

HOST="${1:-google.com}"

echo "== DNS =="
nslookup "$HOST" || true

echo "== Routes =="
netstat -rn | head

echo "== Listening ports =="
ss -tulpen 2>/dev/null || netstat -an | head

echo "== HTTPS =="
curl -I --max-time 5 "https://$HOST" || true

