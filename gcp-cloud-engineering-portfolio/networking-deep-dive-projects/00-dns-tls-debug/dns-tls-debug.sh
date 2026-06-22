#!/usr/bin/env sh
set -eu

HOST="${1:-google.com}"

dig "$HOST" A +short || nslookup "$HOST"
openssl s_client -connect "$HOST:443" -servername "$HOST" </dev/null 2>/dev/null | openssl x509 -noout -subject -issuer -dates

