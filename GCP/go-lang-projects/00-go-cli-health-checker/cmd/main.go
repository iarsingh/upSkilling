package main

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"net/http"
	"os"
	"time"
)

type Result struct {
	URL       string `json:"url"`
	Status    int    `json:"status"`
	Healthy   bool   `json:"healthy"`
	LatencyMS int64  `json:"latency_ms"`
	Error     string `json:"error,omitempty"`
}

func check(ctx context.Context, url string) Result {
	start := time.Now()
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return Result{URL: url, Healthy: false, Error: err.Error()}
	}

	resp, err := http.DefaultClient.Do(req)
	latency := time.Since(start).Milliseconds()
	if err != nil {
		return Result{URL: url, Healthy: false, LatencyMS: latency, Error: err.Error()}
	}
	defer resp.Body.Close()

	return Result{URL: url, Status: resp.StatusCode, Healthy: resp.StatusCode < 500, LatencyMS: latency}
}

func main() {
	url := flag.String("url", "http://127.0.0.1:8080/healthz", "URL to check")
	timeout := flag.Duration("timeout", 5*time.Second, "request timeout")
	flag.Parse()

	ctx, cancel := context.WithTimeout(context.Background(), *timeout)
	defer cancel()

	result := check(ctx, *url)
	if err := json.NewEncoder(os.Stdout).Encode(result); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	if !result.Healthy {
		os.Exit(2)
	}
}
