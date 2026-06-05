#!/usr/bin/env sh
set -eu

HOST="${1:-google.com}"

printf "DNS lookup for %s\n" "$HOST"
nslookup "$HOST" || true

printf "\nRoute check\n"
traceroute "$HOST" 2>/dev/null || tracepath "$HOST" 2>/dev/null || true

printf "\nTLS check\n"
openssl s_client -connect "$HOST:443" -servername "$HOST" </dev/null 2>/dev/null | openssl x509 -noout -subject -issuer -dates

