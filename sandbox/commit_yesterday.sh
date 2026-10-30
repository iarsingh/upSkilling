#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")"
FILE="README.md"
START_DATE="${START_DATE:-2016-11-24}"
END_DATE="${END_DATE:-$(date +%Y-%m-%d)}"
COMMITS_PER_DAY=1

# An atomic directory lock prevents two copies from editing the same file.
LOCK="$(git rev-parse --git-path readme-commits.lock)"
if ! mkdir "$LOCK" 2>/dev/null; then
    echo "Another run holds $LOCK. Stop that run before retrying." >&2
    exit 1
fi
printf '%s\n' "$$" > "$LOCK/pid"
cleanup() { rm -f "$LOCK/pid"; rmdir "$LOCK"; }
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

# Never include unrelated staged work in generated commits.
if git diff --cached --name-only | grep -v -x 'sandbox/README.md' | grep -q .; then
    echo "Unrelated changes are staged; unstage them before running this script." >&2
    exit 1
fi

# Keep days that already have this commit. A missing day is still committed
# when it is earlier than the latest README commit.
existing_dates="$(git log --format=%s --extended-regexp \
    --grep='^docs: update README \([0-9]{4}-[0-9]{2}-[0-9]{2} #1\)$' \
    | grep -Eo '[0-9]{4}-[0-9]{2}-[0-9]{2}' \
    | sort -u)"

current=$(date -j -f "%Y-%m-%d %H:%M:%S" "$START_DATE 00:00:00" +%s)
end=$(date -j -f "%Y-%m-%d %H:%M:%S" "$END_DATE 00:00:00" +%s)

while [ "$current" -le "$end" ]; do
    day_str=$(date -j -f "%s" "$current" +%Y-%m-%d)
    if grep -qxF -- "$day_str" <<< "$existing_dates"; then
        current=$((current + 86400))
        continue
    fi
    commit_time="$day_str 00:00:00"
    line="Updated on $commit_time (commit 1)"

    # Reuse the exact pending line from a failed commit, without duplicating it.
    python3 - "$FILE" "$line" <<'CHECK'
import pathlib, subprocess, sys
path = pathlib.Path(sys.argv[1])
relative = subprocess.check_output(["git", "ls-files", "--full-name", "--", str(path)], text=True).strip()
base = subprocess.check_output(["git", "show", "HEAD:" + relative])
expected = base + (sys.argv[2] + "\n").encode()
actual = path.read_bytes()
if actual == base:
    path.write_bytes(expected)
elif actual != expected:
    sys.exit("README has unexpected edits; preserve or resolve them before retrying.")
CHECK
    git add -- "$FILE"
    # Wait for brief ref contention; never delete another Git process's lock.
    GIT_AUTHOR_DATE="$commit_time" GIT_COMMITTER_DATE="$commit_time" \
        git -c core.filesRefLockTimeout=10000 commit -m "docs: update README ($day_str #1)"
    current=$((current + 86400))
done

if [ "${SKIP_PUSH:-0}" != 1 ]; then git push origin main; fi
