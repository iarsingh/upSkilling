package main

import (
	"bufio"
	"encoding/json"
	"flag"
	"os"
	"strings"
)

type Summary struct {
	TotalLines int            `json:"total_lines"`
	Levels     map[string]int `json:"levels"`
}

func parse(path string) (Summary, error) {
	file, err := os.Open(path)
	if err != nil {
		return Summary{}, err
	}
	defer file.Close()

	summary := Summary{Levels: map[string]int{}}
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		summary.TotalLines++
		fields := strings.Fields(scanner.Text())
		if len(fields) > 0 {
			summary.Levels[fields[0]]++
		}
	}
	return summary, scanner.Err()
}

func main() {
	path := flag.String("file", "sample.log", "log file path")
	flag.Parse()

	summary, err := parse(*path)
	if err != nil {
		panic(err)
	}
	_ = json.NewEncoder(os.Stdout).Encode(summary)
}
