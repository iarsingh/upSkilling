#!/usr/bin/env sh
set -eu

IMAGE="${1:-secure-app:local}"
OUT="${2:-sbom.spdx.json}"

if ! command -v syft >/dev/null 2>&1; then
  printf "Install syft first: https://github.com/anchore/syft\n" >&2
  exit 1
fi

syft "$IMAGE" -o spdx-json > "$OUT"
printf "Wrote %s\n" "$OUT"

