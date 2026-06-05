# Service Mesh and Istio Projects

Istio and service mesh projects for Kubernetes platform interviews.

## Projects

- `00-istio-mtls`: PeerAuthentication and mTLS.
- `01-traffic-splitting`: Canary traffic split.
- `02-observability`: Istio telemetry and tracing notes.

## Interview Questions and Answers

### 1. What is a service mesh?
A service mesh manages service-to-service communication with traffic policy, security, retries, mTLS, and telemetry.

### 2. What is mTLS?
mTLS means both client and server authenticate each other using certificates.

### 3. What is traffic splitting?
Traffic splitting sends a percentage of traffic to different service versions, commonly for canary releases.

### 4. What is a sidecar proxy?
A sidecar proxy runs next to the application container and handles network traffic for the service mesh.

### 5. What are common service mesh risks?
Complexity, latency overhead, misconfiguration, certificate issues, and difficult debugging.

