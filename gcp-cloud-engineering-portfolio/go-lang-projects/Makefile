.PHONY: validate test
GOCACHE_DIR := $(CURDIR)/.gocache

validate:
	@find . -name "*.go" -print -exec gofmt -w {} \;
	@for d in 00-go-cli-health-checker 01-go-rest-api 02-go-log-parser 03-go-gcp-metadata-client 04-go-kubernetes-rollout-checker; do \
		(cd $$d && GOCACHE=$(GOCACHE_DIR) GOENV=off go test ./...); \
	done

test: validate
