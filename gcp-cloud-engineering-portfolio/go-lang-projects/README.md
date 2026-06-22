# Go Lang Projects for Cloud, DevOps, and SRE

This folder contains separate Go projects for cloud engineer, DevOps engineer, and SRE-style automation practice.

## Projects

- `00-go-cli-health-checker`: CLI that checks HTTP endpoints and reports latency.
- `01-go-rest-api`: Minimal REST API using Go standard library.
- `02-go-log-parser`: Log parser that summarizes error patterns.
- `03-go-gcp-metadata-client`: GCP metadata client for Compute Engine workloads.
- `04-go-kubernetes-rollout-checker`: CLI that evaluates Kubernetes deployment rollout JSON.

## Common Commands

```sh
go test ./...
go run ./cmd
```

Run validation across all projects:

```sh
make validate
```

## Go Interview Questions and Answers

### 1. What is a goroutine?
A goroutine is a lightweight concurrent function managed by the Go runtime. You start one with the `go` keyword. It is cheaper than an OS thread and is commonly used for network calls, background work, and concurrent processing.

### 2. What is the difference between concurrency and parallelism?
Concurrency is structuring work so multiple tasks can make progress. Parallelism is running multiple tasks at the same time on multiple CPU cores. Go makes concurrency easy with goroutines and channels, but parallelism depends on available cores and scheduler behavior.

### 3. What are channels used for?
Channels let goroutines communicate safely by sending and receiving typed values. They are useful for worker pools, fan-out/fan-in processing, cancellation patterns, and pipeline designs.

### 4. What is a context in Go?
`context.Context` carries deadlines, cancellation signals, and request-scoped values across API boundaries. In cloud services, it is important for timing out HTTP calls, database queries, and Kubernetes/GCP API calls.

### 5. Why is Go popular in DevOps and cloud engineering?
Go builds static binaries, has strong standard library networking support, handles concurrency well, and is used by Kubernetes, Terraform, Docker, Prometheus, and many cloud-native tools.

### 6. How do you handle errors in Go?
Go returns errors as explicit values. The usual pattern is `if err != nil { return err }`. This makes failure paths visible and predictable.

### 7. What is an interface in Go?
An interface defines behavior through method signatures. A type satisfies an interface implicitly by implementing its methods. This is useful for testability and clean boundaries.

### 8. What is the difference between `go run`, `go build`, and `go test`?
`go run` compiles and runs code immediately. `go build` creates a binary. `go test` runs tests and can also check examples, benchmarks, and race conditions.

### 9. What is a zero value?
Every Go type has a default zero value, such as `0` for integers, `false` for booleans, `""` for strings, and `nil` for pointers, slices, maps, channels, and interfaces.

### 10. How would you make a Go service production-ready?
Add timeouts, structured logs, health checks, metrics, graceful shutdown, request IDs, tests, Dockerfile, CI/CD, security scanning, and Kubernetes or Cloud Run deployment config.

