package main

import "testing"

func TestHealthStatus(t *testing.T) {
	if got := HealthStatus(true); got != "healthy" {
		t.Fatalf("expected healthy, got %s", got)
	}
}

