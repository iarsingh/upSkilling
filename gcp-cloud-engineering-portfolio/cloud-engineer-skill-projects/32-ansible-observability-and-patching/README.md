# Project 32: Ansible Observability and Patching

## Skill
Operational automation, patch management, node exporter setup, service checks, package updates, and maintenance reporting.

## Build
Install Prometheus node exporter and run controlled package patching on Linux VMs.

## Deliverables
- `node_exporter` role.
- `patching` role.
- Playbook for exporter installation.
- Playbook for patching and reboot detection.
- Maintenance report output.

## Run

```sh
ansible-playbook -i inventories/dev.ini playbooks/install-node-exporter.yml
ansible-playbook -i inventories/dev.ini playbooks/patch-linux.yml
```

## Proof Of Work
- Node exporter listening on port `9100`.
- Package update recap.
- Reboot-required evidence.

