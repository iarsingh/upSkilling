package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

type TelemetryEvent struct {
	ServiceName       string  `json:"service_name"`
	Environment       string  `json:"environment"`
	CPUUtilization    float64 `json:"cpu_utilization"`
	MemoryUtilization float64 `json:"memory_utilization"`
	RequestRate       float64 `json:"request_rate"`
	ErrorRate         float64 `json:"error_rate"`
	LatencyMS         float64 `json:"latency_ms"`
	PodRestarts       int     `json:"pod_restarts"`
	DeployAgeMinutes  float64 `json:"deploy_age_minutes"`
	QueueDepth        int     `json:"queue_depth"`
}

func main() {
	apiURL := getenv("INCIDENT_API_URL", "http://localhost:8080/predict")
	event := TelemetryEvent{
		ServiceName:       "checkout-api",
		Environment:       "local",
		CPUUtilization:    83.4,
		MemoryUtilization: 79.2,
		RequestRate:       980,
		ErrorRate:         0.07,
		LatencyMS:         640,
		PodRestarts:       2,
		DeployAgeMinutes:  22,
		QueueDepth:        88,
	}
	body, err := json.Marshal(event)
	if err != nil {
		panic(err)
	}
	client := http.Client{Timeout: 30 * time.Second}
	resp, err := client.Post(apiURL, "application/json", bytes.NewReader(body))
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	payload, _ := io.ReadAll(resp.Body)
	fmt.Printf("status=%d response=%s\n", resp.StatusCode, string(payload))
}

func getenv(key string, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}
