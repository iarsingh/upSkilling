#!/usr/bin/env bash
set -euo pipefail

kserve_version="${KSERVE_VERSION:-v0.14.1}"
cert_manager_version="${CERT_MANAGER_VERSION:-v1.16.2}"
knative_version="${KNATIVE_VERSION:-knative-v1.16.0}"

kubectl apply -f "https://github.com/cert-manager/cert-manager/releases/download/${cert_manager_version}/cert-manager.yaml"
kubectl wait --for=condition=Available deployment --all -n cert-manager --timeout=5m

kubectl apply -f "https://github.com/knative/serving/releases/download/${knative_version}/serving-crds.yaml"
kubectl apply -f "https://github.com/knative/serving/releases/download/${knative_version}/serving-core.yaml"
kubectl apply -f "https://github.com/knative/net-kourier/releases/latest/download/kourier.yaml"
kubectl patch configmap/config-network -n knative-serving \
  --type merge \
  --patch '{"data":{"ingress-class":"kourier.ingress.networking.knative.dev"}}'

kubectl apply -f "https://github.com/kserve/kserve/releases/download/${kserve_version}/kserve.yaml"
kubectl wait --for=condition=Available deployment --all -n kserve --timeout=10m
