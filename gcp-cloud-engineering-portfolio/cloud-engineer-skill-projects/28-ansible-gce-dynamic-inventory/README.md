# Project 28: Ansible GCE Dynamic Inventory

## Skill
Dynamic inventory, GCP authentication, instance labels, host grouping, and cloud-aware automation.

## Build
Use the `google.cloud.gcp_compute` inventory plugin to discover Compute Engine instances by labels.

## Deliverables
- GCE dynamic inventory config.
- Playbook that groups hosts by labels.
- Variables for project, zone, and service account authentication.
- Command examples for IAP SSH.

## Run

```sh
ansible-inventory -i inventories/gcp_compute.yml --graph
ansible-playbook -i inventories/gcp_compute.yml playbooks/ping.yml
```

## Proof Of Work
- Inventory graph showing grouped GCE VMs.
- Successful ping output.
- Labeling strategy notes.

