# Project 30: Ansible Security Hardening

## Skill
Linux hardening, CIS-style controls, auditd, firewall rules, SSH policy, login banners, and compliance evidence.

## Build
Apply baseline security controls to Debian or Ubuntu GCE VMs.

## Deliverables
- Hardening role.
- SSH and login banner controls.
- UFW firewall rules.
- Auditd package installation.
- Compliance report task.

## Run

```sh
ansible-playbook -i inventories/dev.ini playbooks/harden.yml --check
```

## Proof Of Work
- Before/after hardening report.
- SSH password login disabled.
- Firewall status output.

