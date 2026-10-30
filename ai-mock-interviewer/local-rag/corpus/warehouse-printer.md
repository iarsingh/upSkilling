# Warehouse label printer

Warehouse three prints shipping labels from a printer in the packing closet. Restart it only after the local queue is empty.

## Restart

The label printer in warehouse three is lp-wh3-02, on VLAN 40, fed by switch sw-wh3-access. To restart it, pause new jobs, wait until the queue depth is zero, then power-cycle lp-wh3-02. Starting it while jobs are queued reprints labels and double-ships. If the port is dark after the cycle, bounce interface Gi1/0/14 on sw-wh3-access and confirm VLAN 40. Do not restart the printer by the application button while the queue still holds jobs. That button skips the drain step.
