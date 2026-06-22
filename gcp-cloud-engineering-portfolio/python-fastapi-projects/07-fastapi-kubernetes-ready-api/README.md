# Project 07: FastAPI Kubernetes Ready API

## Skill
Containerized FastAPI, Kubernetes probes, ConfigMap/env config, services, HPA, and production manifests.

## Run Locally

```sh
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Kubernetes

```sh
kubectl apply -f k8s/
kubectl get deploy,svc,hpa
```

