CREATE INDEX IF NOT EXISTS idx_incidents_service_started
ON incidents(service_id, started_at DESC);

CREATE INDEX IF NOT EXISTS idx_incidents_status
ON incidents(status);

