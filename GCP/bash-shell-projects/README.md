# Bash and Shell Projects for Cloud and DevOps

This folder contains separate Bash/Shell projects for Linux operations, cloud automation, Kubernetes support, log analysis, and backup automation.

## Projects

- `00-linux-health-check`: CPU, memory, disk, process, and network health report.
- `01-log-audit-tool`: Scan logs for error patterns and summarize findings.
- `02-gcp-vm-ops-toolkit`: GCP Compute Engine helper commands.
- `03-docker-k8s-helper`: Docker and Kubernetes troubleshooting helper.
- `04-backup-rotation-script`: Backup archive and retention automation.

## Common Commands

```sh
sh scripts/script-name.sh
bash scripts/script-name.sh
```

Validate all shell scripts:

```sh
make validate
```

## Bash and Shell Interview Questions and Answers

### 1. What is the difference between `sh` and `bash`?
`sh` is a POSIX shell interface. `bash` is a richer shell with arrays, `[[ ]]`, brace expansion, process substitution, and many extra features. Scripts using only POSIX syntax are more portable.

### 2. What does `set -euo pipefail` do?
`set -e` exits on command failure, `set -u` fails on undefined variables, and `pipefail` makes a pipeline fail if any command in the pipeline fails. `pipefail` is Bash-specific.

### 3. Why should variables be quoted?
Quoting variables prevents word splitting and glob expansion. Use `"$var"` unless you intentionally want splitting.

### 4. What is the difference between `$@` and `$*`?
Quoted `"$@"` preserves each argument separately. Quoted `"$*"` combines all arguments into one string.

### 5. How do you check the exit code of a command?
Use `$?` immediately after the command, or use `if command; then ... fi` for cleaner control flow.

### 6. What is idempotency in shell scripts?
An idempotent script can run multiple times without causing unintended duplicate changes. For example, create a directory with `mkdir -p` instead of failing when it already exists.

### 7. How do you debug a shell script?
Use `bash -x script.sh`, add `set -x`, print variables carefully, and isolate failing commands.

### 8. What is a here-document?
A here-document passes multiple lines of text to a command. It is commonly used to generate config files or feed SQL/scripts into tools.

### 9. Why should production scripts avoid hardcoded secrets?
Hardcoded secrets leak through Git, logs, process lists, and backups. Use Secret Manager, environment variables from secure sources, or workload identity.

### 10. How do Bash scripts fit into DevOps?
Bash is useful for glue automation, local tooling, CI/CD steps, operational checks, bootstrap tasks, and incident response commands.

