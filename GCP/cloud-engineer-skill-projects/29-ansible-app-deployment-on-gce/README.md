# Project 29: Ansible App Deployment on GCE

## Skill
Application deployment, templates, systemd, handlers, rollback basics, environment variables, and health checks.

## Build
Deploy a small Flask application to a Compute Engine VM using an Ansible role.

## Deliverables
- `webapp` role.
- Systemd service template.
- Nginx reverse proxy template.
- Health check task.
- Inventory for app servers.

## Run

```sh
ansible-playbook -i inventories/dev.ini playbooks/deploy.yml
```

## Proof Of Work
- App health endpoint returns `200`.
- Systemd service status.
- Ansible recap showing idempotent second run.

