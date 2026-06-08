# Ansible Interview Notes

## Core Questions

1. What is Ansible?
2. What is an inventory?
3. What is the difference between ad-hoc command and playbook?
4. What is a role?
5. What is idempotency?
6. What is `become: true`?
7. What are handlers?
8. What is the difference between `copy` and `template`?
9. How do you manage variables?
10. How do you avoid storing secrets in playbooks?

## Scenario Questions

1. A playbook works on one host but fails on another. How do you debug it?
2. A task changes on every run. Why is that a problem?
3. SSH connection fails from Ansible control node. What will you check?
4. A handler is not running. What could be the reason?
5. How would you roll out Docker installation to 100 servers?
6. How would you bootstrap new GCP VMs using Ansible?
7. How would you use Ansible with Terraform?
8. How do you organize roles for dev and prod?

## Portfolio Explanation

```text
I used Ansible to automate server configuration after infrastructure provisioning.
Terraform creates cloud infrastructure, and Ansible configures operating systems,
packages, Docker, Kubernetes tools, and monitoring agents. This separation keeps
infrastructure provisioning and configuration management clean.
```

