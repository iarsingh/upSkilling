package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"os"
)

type Deployment struct {
	Metadata struct {
		Name       string `json:"name"`
		Generation int    `json:"generation"`
	} `json:"metadata"`
	Spec struct {
		Replicas int `json:"replicas"`
	} `json:"spec"`
	Status struct {
		ObservedGeneration int `json:"observedGeneration"`
		ReadyReplicas      int `json:"readyReplicas"`
		AvailableReplicas  int `json:"availableReplicas"`
	} `json:"status"`
}

func ready(d Deployment) bool {
	return d.Metadata.Generation == d.Status.ObservedGeneration &&
		d.Spec.Replicas == d.Status.ReadyReplicas &&
		d.Spec.Replicas == d.Status.AvailableReplicas
}

func main() {
	path := flag.String("file", "deployment.json", "deployment JSON path")
	flag.Parse()

	content, err := os.ReadFile(*path)
	if err != nil {
		panic(err)
	}
	var deployment Deployment
	if err := json.Unmarshal(content, &deployment); err != nil {
		panic(err)
	}
	fmt.Printf("deployment=%s ready=%t\n", deployment.Metadata.Name, ready(deployment))
	if !ready(deployment) {
		os.Exit(1)
	}
}
