# Project 33: Ansible DR and Backup Automation

## Skill
Backup automation, restore drills, GCS uploads, database dump workflows, scheduled operations, and DR evidence collection.

## Build
Use Ansible to back up application configuration and PostgreSQL data from a Linux VM to Cloud Storage.

## Deliverables
- Backup role.
- GCS upload command task.
- Restore drill playbook.
- Backup report template.
- Inventory for database hosts.

## Run

```sh
ansible-playbook -i inventories/dev.ini playbooks/backup.yml
ansible-playbook -i inventories/dev.ini playbooks/restore-drill.yml --check
```

## Proof Of Work
- Backup object in GCS.
- Backup report path.
- Restore drill evidence.

