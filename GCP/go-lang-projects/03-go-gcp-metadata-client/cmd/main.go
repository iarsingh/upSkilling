package main

import (
	"context"
	"encoding/json"
	"net/http"
	"os"
	"time"
)

type Metadata struct {
	ProjectID string `json:"project_id"`
	Zone      string `json:"zone"`
	Source    string `json:"source"`
}

func metadataValue(ctx context.Context, path string) (string, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, "http://metadata.google.internal/computeMetadata/v1/"+path, nil)
	if err != nil {
		return "", err
	}
	req.Header.Set("Metadata-Flavor", "Google")
	client := http.Client{Timeout: 2 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	body := make([]byte, 4096)
	n, _ := resp.Body.Read(body)
	return string(body[:n]), nil
}

func main() {
	ctx := context.Background()
	projectID, err := metadataValue(ctx, "project/project-id")
	if err != nil {
		projectID = "local-dev"
	}
	zone, err := metadataValue(ctx, "instance/zone")
	if err != nil {
		zone = "local"
	}
	source := "gcp-metadata"
	if projectID == "local-dev" {
		source = "fallback"
	}
	_ = json.NewEncoder(os.Stdout).Encode(Metadata{ProjectID: projectID, Zone: zone, Source: source})
}
