#!/usr/bin/env bash
# Regenerates jenkins/kubeconfig.minikube-internal: a flattened kubeconfig
# (cert data inlined, no external file references) pointing at minikube's
# address on the `minikube` docker network instead of the host-mapped
# 127.0.0.1 port that only the host machine -- not sibling containers --
# can reach. Re-run this after `minikube delete && minikube start`, since
# the API server's cert/port can change.
set -euo pipefail

MINIKUBE_IP=$(docker inspect minikube --format '{{ (index .NetworkSettings.Networks "minikube").IPAddress }}')
OUT="$(dirname "$0")/../jenkins/kubeconfig.minikube-internal"

kubectl config view --flatten --minify \
  | sed "s#https://127.0.0.1:[0-9]*#https://${MINIKUBE_IP}:8443#" \
  > "$OUT"

echo "Wrote $OUT (server: https://${MINIKUBE_IP}:8443)"
