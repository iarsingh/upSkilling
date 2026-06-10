#!/usr/bin/env bash
set -euo pipefail

kafka-topics.sh --bootstrap-server localhost:9092 --create --if-not-exists --topic incident.telemetry --partitions 3 --replication-factor 1
kafka-topics.sh --bootstrap-server localhost:9092 --create --if-not-exists --topic incident.predictions --partitions 3 --replication-factor 1
