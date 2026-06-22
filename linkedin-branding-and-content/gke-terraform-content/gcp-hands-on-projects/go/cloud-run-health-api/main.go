package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"
)

type response struct {
	Service string `json:"service"`
	Status  string `json:"status"`
	Time    string `json:"time"`
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/", handleRoot)
	mux.HandleFunc("/healthz", handleHealth)
	mux.HandleFunc("/metadata", handleMetadata)

	handler := loggingMiddleware(mux)

	log.Printf("starting cloud-run-health-api on port %s", port)
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatalf("server failed: %v", err)
	}
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, response{
		Service: "cloud-run-health-api",
		Status:  "running",
		Time:    time.Now().UTC().Format(time.RFC3339),
	})
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, response{
		Service: "cloud-run-health-api",
		Status:  "healthy",
		Time:    time.Now().UTC().Format(time.RFC3339),
	})
}

func handleMetadata(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{
		"service": "cloud-run-health-api",
		"env":     getEnv("APP_ENV", "local"),
		"region":  getEnv("REGION", "unknown"),
		"version": getEnv("APP_VERSION", "dev"),
	})
}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("method=%s path=%s duration_ms=%d", r.Method, r.URL.Path, time.Since(start).Milliseconds())
	})
}

func writeJSON(w http.ResponseWriter, statusCode int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	if err := json.NewEncoder(w).Encode(payload); err != nil {
		log.Printf("failed to write response: %v", err)
	}
}

func getEnv(key, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}
