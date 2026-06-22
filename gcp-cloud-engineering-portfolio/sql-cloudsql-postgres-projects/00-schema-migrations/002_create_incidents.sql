CREATE TABLE IF NOT EXISTS incidents (
  id UUID PRIMARY KEY,
  service_id UUID NOT NULL REFERENCES services(id),
  severity TEXT NOT NULL,
  status TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  resolved_at TIMESTAMPTZ
);

