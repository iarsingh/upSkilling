SELECT
  event_name,
  COUNT(*) AS events
FROM `PROJECT_ID.analytics.events`
WHERE event_timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
GROUP BY event_name
ORDER BY events DESC;

