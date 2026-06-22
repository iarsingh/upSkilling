# Project 00: Go CLI Health Checker

## Skill
Go CLI development, HTTP clients, timeouts, JSON output, and endpoint monitoring.

## Run

```sh
go run ./cmd --url https://www.google.com
```

## Interview Q&A

**Q: Why should HTTP clients have timeouts?**  
A: Without timeouts, a request can hang forever and consume resources. Production tools should always set timeouts.

**Q: Why use `context.Context` for HTTP requests?**  
A: It allows cancellation and deadlines to propagate cleanly across calls.

