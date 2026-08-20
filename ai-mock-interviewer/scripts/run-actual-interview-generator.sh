#!/usr/bin/env bash
set -euo pipefail

repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
log_dir="$repo_dir/logs"
mkdir -p "$log_dir"

export ANSWER_BATCH_SIZE="${ANSWER_BATCH_SIZE:-4}"
export ANSWER_CONCURRENCY="${ANSWER_CONCURRENCY:-2}"
export OLLAMA_MODEL="${OLLAMA_MODEL:-llama3.1:8b}"

cd "$repo_dir"
nohup node scripts/generate-actual-interview-answers.js \
  >> "$log_dir/actual-interview-answer-generation.log" 2>&1 &

echo "$!" > "$log_dir/actual-interview-answer-generation.pid"
echo "Started actual interview answer generation with PID $!"
echo "Log: $log_dir/actual-interview-answer-generation.log"
