# Helm Chart Projects

Helm projects for Kubernetes packaging and release management.

## Projects

- `00-basic-chart`: Minimal Helm chart.
- `01-gke-ready-chart`: GKE-ready API chart with probes and resources.

## Interview Questions and Answers

### 1. What is Helm?
Helm is a Kubernetes package manager. It templates manifests and manages releases.

### 2. What is a values file?
A values file provides environment-specific configuration for a chart.

### 3. How do you roll back a Helm release?
Use `helm rollback RELEASE REVISION`.

### 4. Why should charts define resource requests and limits?
They improve scheduling, autoscaling, and cluster reliability.

### 5. What is the difference between `helm template` and `helm install`?
`helm template` renders YAML locally. `helm install` creates a release in Kubernetes.

