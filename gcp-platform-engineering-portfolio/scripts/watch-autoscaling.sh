#!/usr/bin/env bash
set -euo pipefail

namespace="${NAMESPACE:-platform-demo}"

printf 'Watching HPA and pods in namespace %s. Press Ctrl-C to stop.\n' "${namespace}"
kubectl get hpa,pods -n "${namespace}" --watch
