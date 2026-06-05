SELECT
  service.description AS service,
  SUM(cost) AS total_cost
FROM `PROJECT_ID.billing_export.gcp_billing_export_v1_*`
WHERE invoice.month = FORMAT_DATE('%Y%m', CURRENT_DATE())
GROUP BY service
ORDER BY total_cost DESC
LIMIT 10;

