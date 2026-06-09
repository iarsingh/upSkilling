#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

require_kaggle() {
  if ! command -v kaggle >/dev/null 2>&1; then
    echo "Kaggle CLI is not installed. Run: pip install kaggle" >&2
    exit 1
  fi

  if [[ -z "${KAGGLE_USERNAME:-}" || -z "${KAGGLE_KEY:-}" ]] && [[ ! -f "${HOME}/.kaggle/kaggle.json" ]]; then
    echo "Kaggle credentials not found. Add ~/.kaggle/kaggle.json or export KAGGLE_USERNAME and KAGGLE_KEY." >&2
    exit 1
  fi
}

create_or_version() {
  local dataset_path="$1"
  local message="$2"

  if kaggle datasets create -p "${dataset_path}"; then
    echo "Created dataset: ${dataset_path}"
  else
    echo "Create failed or dataset exists. Publishing a new version: ${dataset_path}"
    kaggle datasets version -p "${dataset_path}" -m "${message}"
  fi
}

require_kaggle

create_or_version "${ROOT_DIR}/model-monitoring-drift" "Improve metadata and Kaggle quality assets"
create_or_version "${ROOT_DIR}/aiops-incident-alert-correlation" "Initial Kaggle-ready AIOps incident dataset"
create_or_version "${ROOT_DIR}/gcp-cloud-cost-optimization" "Initial Kaggle-ready GCP cost optimization dataset"
create_or_version "${ROOT_DIR}/genai-rag-evaluation-observability" "Initial Kaggle-ready GenAI RAG observability dataset"
