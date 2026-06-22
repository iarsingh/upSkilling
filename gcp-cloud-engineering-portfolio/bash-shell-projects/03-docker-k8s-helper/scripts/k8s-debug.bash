#!/usr/bin/env bash
set -euo pipefail

namespace="${1:-default}"
deployment="${2:-}"

echo "== Pods =="
kubectl get pods -n "$namespace" -o wide

echo
echo "== Recent Events =="
kubectl get events -n "$namespace" --sort-by=.lastTimestamp | tail -30

if [[ -n "$deployment" ]]; then
  echo
  echo "== Rollout =="
  kubectl rollout status "deployment/$deployment" -n "$namespace" --timeout=60s

  echo
  echo "== Deployment Description =="
  kubectl describe "deployment/$deployment" -n "$namespace"
fi

