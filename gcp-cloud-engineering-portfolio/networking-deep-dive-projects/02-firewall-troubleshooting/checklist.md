# Firewall Troubleshooting Checklist

1. Confirm source IP and destination IP.
2. Confirm protocol and port.
3. Check GCP firewall priority and target tags/service accounts.
4. Check Kubernetes NetworkPolicy if traffic is inside GKE.
5. Check OS firewall such as ufw or iptables.
6. Confirm the application is listening on the expected port.

