# Project 01: Go REST API

## Skill
HTTP handlers, JSON APIs, health checks, routing, and graceful shutdown basics.

## Run

```sh
go run ./cmd
curl http://127.0.0.1:8080/healthz
```

## Interview Q&A

**Q: Why use `http.Server` instead of `http.ListenAndServe` directly?**  
A: `http.Server` lets you configure timeouts and graceful shutdown behavior explicitly.

**Q: What is graceful shutdown?**  
A: It stops accepting new requests while giving existing requests time to finish.

