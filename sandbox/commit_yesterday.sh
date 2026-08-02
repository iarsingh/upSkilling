#!/bin/bash
set -e

FILE="README.md"
START_DATE="2024-11-24"
END_DATE=$(date "+%Y-%m-%d")
COMMITS_PER_DAY=1

current=$(date -j -f "%Y-%m-%d" "$START_DATE" "+%s")
end=$(date -j -f "%Y-%m-%d" "$END_DATE" "+%s")

# Spread commits evenly across the day (in minutes)
MINUTES_IN_DAY=1440
INTERVAL=$((MINUTES_IN_DAY / COMMITS_PER_DAY))

while [ "$current" -le "$end" ]; do
    day_str=$(date -j -f "%s" "$current" "+%Y-%m-%d")

    for i in $(seq 0 $((COMMITS_PER_DAY - 1))); do
        total_minutes=$((i * INTERVAL))
        hour=$((total_minutes / 60))
        minute=$((total_minutes % 60))

        commit_time=$(date -j -f "%Y-%m-%d %H:%M:%S" "$day_str $(printf "%02d" $hour):$(printf "%02d" $minute):00" "+%Y-%m-%d %H:%M:%S")

        echo "Updated on $commit_time (commit $((i + 1)))" >> "$FILE"
        git add "$FILE"

        GIT_AUTHOR_DATE="$commit_time" \
        GIT_COMMITTER_DATE="$commit_time" \
        git commit -m "docs: update README ($day_str #$((i + 1)))"
    done

    current=$((current + 86400))
done

git push origin main
