# Ansible Hands-On Projects

This folder contains Ansible projects for DevOps, GCP, Linux automation, Kubernetes tooling, and monitoring interview preparation.

## Projects

- `playbooks/01-linux-baseline.yml` - Linux baseline setup and hardening
- `playbooks/02-docker-app-host.yml` - Docker host setup for containerized apps
- `playbooks/03-gcp-vm-bootstrap.yml` - GCP VM bootstrap for cloud operations
- `playbooks/04-k8s-admin-tools.yml` - Kubernetes admin tooling setup
- `playbooks/05-monitoring-agent.yml` - Prometheus node exporter setup

## Skills Practiced

- Ansible inventory and variables
- Idempotent playbook design
- Roles and task reuse
- Linux server hardening
- Docker installation
- GCP operations tooling
- Kubernetes CLI setup
- Monitoring agent setup

## Local Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
ansible --version
```

## Inventory

Copy the example inventory:

```bash
cp inventories/dev.ini.example inventories/dev.ini
```

Edit `inventories/dev.ini` with your server IPs or DNS names.

## Run Examples

Ping hosts:

```bash
ansible all -i inventories/dev.ini -m ping
```

Run Linux baseline:

```bash
ansible-playbook -i inventories/dev.ini playbooks/01-linux-baseline.yml
```

Run Docker host setup:

```bash
ansible-playbook -i inventories/dev.ini playbooks/02-docker-app-host.yml
```

Run GCP VM bootstrap:

```bash
ansible-playbook -i inventories/dev.ini playbooks/03-gcp-vm-bootstrap.yml
```

## Interview Story

```text
I created reusable Ansible roles to bootstrap Linux servers, install Docker,
prepare GCP VM tooling, configure Kubernetes admin utilities, and set up
monitoring agents. The playbooks are idempotent and organized by roles,
which makes them easier to review, test, and reuse across environments.
```

## Suggested Build Order

1. Linux baseline
2. Docker app host
3. GCP VM bootstrap
4. Kubernetes admin tools
5. Monitoring agent

