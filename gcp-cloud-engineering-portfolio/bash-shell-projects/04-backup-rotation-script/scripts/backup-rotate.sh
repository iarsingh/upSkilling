#!/usr/bin/env sh
set -eu

SOURCE_DIR="${1:?usage: sh backup-rotate.sh SOURCE_DIR BACKUP_DIR RETENTION_DAYS}"
BACKUP_DIR="${2:?usage: sh backup-rotate.sh SOURCE_DIR BACKUP_DIR RETENTION_DAYS}"
RETENTION_DAYS="${3:-7}"

if [ ! -d "$SOURCE_DIR" ]; then
  printf "source directory does not exist: %s\n" "$SOURCE_DIR" >&2
  exit 1
fi

mkdir -p "$BACKUP_DIR"

timestamp="$(date +%Y%m%d-%H%M%S)"
archive="$BACKUP_DIR/backup-$timestamp.tgz"

tar -czf "$archive" -C "$SOURCE_DIR" .
printf "created=%s\n" "$archive"

find "$BACKUP_DIR" -name "backup-*.tgz" -type f -mtime +"$RETENTION_DAYS" -print -delete
printf "retention_days=%s\n" "$RETENTION_DAYS"

