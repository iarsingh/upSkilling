# Project 31: Ansible GKE Operations

## Skill
Ansible for Kubernetes, GKE authentication, namespace setup, deployment rollout, config management, and operational checks.

## Build
Use Ansible to apply Kubernetes resources to a GKE cluster and verify rollout health.

## Deliverables
- Kubernetes collection requirements.
- Playbook that gets GKE credentials.
- Namespace, deployment, service, and HPA applied through Ansible.
- Rollout verification task.

## Run

```sh
ansible-galaxy collection install -r requirements.yml
ansible-playbook playbooks/deploy-to-gke.yml
```

## Proof Of Work
- Successful deployment output.
- `kubectl get deploy,svc,hpa -n ansible-demo`.
- Ansible task recap.

