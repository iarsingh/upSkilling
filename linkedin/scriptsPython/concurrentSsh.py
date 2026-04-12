#Concurrent SSH Command Executor
#Use asyncio and asyncssh to run a command on hundreds of servers concurrently, collect output, and handle timeouts/errors gracefully. Provide a progress bar.
#!/usr/bin/env python3

import asyncio
import asyncssh
import argparse
from dataclasses import dataclass
from typing import List
from tqdm import tqdm


# -----------------------------
# Result Data Structure
# -----------------------------
@dataclass
class SSHResult:
    host: str
    success: bool
    stdout: str = ""
    stderr: str = ""
    exit_status: int = -1
    error: str = ""


# -----------------------------
# SSH Execution Logic
# -----------------------------
async def run_command(
    host: str,
    username: str,
    command: str,
    semaphore: asyncio.Semaphore,
    timeout: int,
    port: int = 22,
    password: str = None,
    key_file: str = None,
) -> SSHResult:

    async with semaphore:
        try:
            conn = await asyncio.wait_for(
                asyncssh.connect(
                    host,
                    port=port,
                    username=username,
                    password=password,
                    client_keys=[key_file] if key_file else None,
                    known_hosts=None,  # Disable known_hosts for automation
                ),
                timeout=timeout,
            )

            async with conn:
                result = await asyncio.wait_for(
                    conn.run(command, check=False),
                    timeout=timeout,
                )

                return SSHResult(
                    host=host,
                    success=result.exit_status == 0,
                    stdout=result.stdout.strip(),
                    stderr=result.stderr.strip(),
                    exit_status=result.exit_status,
                )

        except asyncio.TimeoutError:
            return SSHResult(host=host, success=False, error="Timeout")
        except asyncssh.PermissionDenied:
            return SSHResult(host=host, success=False, error="Authentication failed")
        except asyncssh.Error as e:
            return SSHResult(host=host, success=False, error=str(e))
        except Exception as e:
            return SSHResult(host=host, success=False, error=f"Unexpected error: {e}")


# -----------------------------
# Main Executor
# -----------------------------
async def execute_on_hosts(
    hosts: List[str],
    username: str,
    command: str,
    concurrency: int,
    timeout: int,
    port: int,
    password: str,
    key_file: str,
):

    semaphore = asyncio.Semaphore(concurrency)

    tasks = [
        run_command(
            host,
            username,
            command,
            semaphore,
            timeout,
            port,
            password,
            key_file,
        )
        for host in hosts
    ]

    results = []

    with tqdm(total=len(tasks), desc="Executing", unit="host") as pbar:
        for coro in asyncio.as_completed(tasks):
            result = await coro
            results.append(result)
            pbar.update(1)

    return results


# -----------------------------
# CLI Interface
# -----------------------------
def parse_args():
    parser = argparse.ArgumentParser(description="Concurrent SSH Command Executor")

    parser.add_argument("--hosts-file", required=True, help="File with host list")
    parser.add_argument("--username", required=True, help="SSH username")
    parser.add_argument("--command", required=True, help="Command to execute")
    parser.add_argument("--concurrency", type=int, default=20, help="Max concurrent connections")
    parser.add_argument("--timeout", type=int, default=10, help="Timeout per host (seconds)")
    parser.add_argument("--port", type=int, default=22, help="SSH port")
    parser.add_argument("--password", help="SSH password")
    parser.add_argument("--key-file", help="Path to private key")

    return parser.parse_args()


# -----------------------------
# Entry Point
# -----------------------------
def main():
    args = parse_args()

    with open(args.hosts_file) as f:
        hosts = [line.strip() for line in f if line.strip()]

    results = asyncio.run(
        execute_on_hosts(
            hosts=hosts,
            username=args.username,
            command=args.command,
            concurrency=args.concurrency,
            timeout=args.timeout,
            port=args.port,
            password=args.password,
            key_file=args.key_file,
        )
    )

    # -----------------------------
    # Print Summary
    # -----------------------------
    success_count = sum(r.success for r in results)
    failed_count = len(results) - success_count

    print("\n========== SUMMARY ==========")
    print(f"Total Hosts : {len(results)}")
    print(f"Success     : {success_count}")
    print(f"Failed      : {failed_count}")

    print("\n========== DETAILS ==========")
    for r in results:
        print(f"\n--- {r.host} ---")
        if r.success:
            print(f"Exit Code: {r.exit_status}")
            print("STDOUT:")
            print(r.stdout)
            if r.stderr:
                print("STDERR:")
                print(r.stderr)
        else:
            print(f"ERROR: {r.error}")


if __name__ == "__main__":
    main()

    