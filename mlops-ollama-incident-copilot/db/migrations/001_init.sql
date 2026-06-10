CREATE DATABASE mlflow;

CREATE TABLE IF NOT EXISTS prediction_audit (
    id BIGSERIAL PRIMARY KEY,
    service_name TEXT NOT NULL,
    environment TEXT NOT NULL,
    incident_probability NUMERIC(6, 4) NOT NULL,
    risk_level TEXT NOT NULL,
    model_version TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
