#!/bin/bash

# ===== CONFIG =====
start_date="2016-01-01"
end_date=$(date +"%Y-%m-%d")

# Convert to epoch seconds (Mac BSD compatible)
start_epoch=$(date -j -f "%Y-%m-%d" "$start_date" +%s)
end_epoch=$(date -j -f "%Y-%m-%d" "$end_date" +%s)

current_epoch=$start_epoch

echo "Generating commits from $start_date to $end_date"

while [ "$current_epoch" -le "$end_epoch" ]; do

    # Convert epoch back to date
    current_date=$(date -j -f "%s" "$current_epoch" +"%Y-%m-%d")

    # Day of week (1=Mon ... 7=Sun)
    day_of_week=$(date -j -f "%Y-%m-%d" "$current_date" +%u)

    # Realistic activity pattern
    if [ "$day_of_week" -ge 6 ]; then
        commit_count=$((RANDOM % 2))        # Weekend 0-1
    else
        commit_count=$((RANDOM % 5 + 1))    # Weekday 1-5
    fi

    for ((i=0; i<commit_count; i++)); do

        hour=$((RANDOM % 14 + 9))   # 9AM–10PM
        minute=$((RANDOM % 60))
        second=$((RANDOM % 60))

        timestamp="$current_date $hour:$minute:$second"

        echo "Commit on $timestamp" >> activity.txt

        git add activity.txt

        GIT_AUTHOR_DATE="$timestamp" \
        GIT_COMMITTER_DATE="$timestamp" \
        git commit -m "Update activity on $current_date"

    done

    # Move to next day (add 86400 seconds)
    current_epoch=$((current_epoch + 86400))

done

git push origin main

echo "Done ✅ All years from 2016 should now be filled."