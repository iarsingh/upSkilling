# Project 27: Ansible Linux Server Bootstrap

## Skill
Ansible fundamentals, inventories, roles, idempotent Linux configuration, package management, users, SSH hardening, and service handlers.

## Build
Bootstrap a fresh Linux VM into a standard operations baseline.

## Deliverables
- Static inventory for dev and prod hosts.
- `common` role for packages, users, timezone, SSH settings, and baseline tools.
- Playbook that can run against GCE VMs through SSH.
- Group variables for environment-specific configuration.

## GCP Preference
Use Compute Engine VMs created in earlier projects, connect with OS Login or IAP tunneling, and manage them with Ansible.

## Run

```sh
ansible-playbook -i inventories/dev.ini playbooks/bootstrap.yml --check
```

## Proof Of Work
- Ansible recap showing changed/ok counts.
- VM screenshot or command output showing installed packages.
- SSH hardening diff or config evidence.

