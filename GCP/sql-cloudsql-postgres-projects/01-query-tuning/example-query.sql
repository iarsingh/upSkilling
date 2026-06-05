EXPLAIN ANALYZE
SELECT s.name, i.severity, i.started_at
FROM incidents i
JOIN services s ON s.id = i.service_id
WHERE i.status = 'open'
ORDER BY i.started_at DESC
LIMIT 20;

