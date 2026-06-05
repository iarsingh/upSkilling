# Linux Advanced Troubleshooting Projects

Linux projects for production support and SRE interviews.

## Projects

- `00-systemd-service`: Build and troubleshoot a systemd service.
- `01-performance-debugging`: CPU, memory, disk, and process debugging commands.
- `02-network-debugging`: Linux network debugging workflow.

## Interview Questions and Answers

### 1. What is systemd?
systemd is the service manager used by many Linux distributions to start, stop, supervise, and log services.

### 2. How do you inspect service logs?
Use `journalctl -u service-name`.

### 3. How do you debug high CPU?
Use `top`, `htop`, `ps`, `pidstat`, profiling tools, and application metrics.

### 4. How do you check open ports?
Use `ss -tulpen` or `lsof -i`.

### 5. What is load average?
Load average shows runnable or waiting tasks over 1, 5, and 15 minutes. It must be interpreted relative to CPU count.

