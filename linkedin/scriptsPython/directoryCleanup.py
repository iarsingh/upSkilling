#Idempotent Directory Cleanup
#Write a script that deletes files older than N days in a given directory, but ensure it is idempotent (i.e., running multiple times produces the same result and doesn't error if files are already deleted).
#!/usr/bin/env python3

import os
import time
import argparse
import logging
from pathlib import Path


def delete_old_files(directory: Path, days: int, delete_empty_dirs: bool = False):
    """
    Delete files older than `days` in `directory`.
    Idempotent: Safe to run multiple times.
    """
    if not directory.exists():
        logging.error(f"Directory does not exist: {directory}")
        return

    if not directory.is_dir():
        logging.error(f"Not a directory: {directory}")
        return

    cutoff_time = time.time() - (days * 86400)

    for root, dirs, files in os.walk(directory):
        for file_name in files:
            file_path = Path(root) / file_name

            try:
                if not file_path.exists():
                    continue  # Already deleted → idempotent

                file_mtime = file_path.stat().st_mtime

                if file_mtime < cutoff_time:
                    file_path.unlink(missing_ok=True)  # Python 3.8+
                    logging.info(f"Deleted file: {file_path}")

            except PermissionError:
                logging.warning(f"Permission denied: {file_path}")
            except Exception as e:
                logging.error(f"Error deleting {file_path}: {e}")

        # Optional: Remove empty directories
        if delete_empty_dirs:
            for dir_name in dirs:
                dir_path = Path(root) / dir_name
                try:
                    if dir_path.exists() and not any(dir_path.iterdir()):
                        dir_path.rmdir()
                        logging.info(f"Removed empty directory: {dir_path}")
                except Exception:
                    pass  # Safe for idempotency


def main():
    parser = argparse.ArgumentParser(description="Idempotent directory cleanup script.")
    parser.add_argument("directory", type=str, help="Target directory")
    parser.add_argument("days", type=int, help="Delete files older than N days")
    parser.add_argument("--delete-empty-dirs", action="store_true",
                        help="Also remove empty directories")
    parser.add_argument("--log-level", default="INFO",
                        choices=["DEBUG", "INFO", "WARNING", "ERROR"])

    args = parser.parse_args()

    logging.basicConfig(
        level=getattr(logging, args.log_level),
        format="%(asctime)s - %(levelname)s - %(message)s"
    )

    delete_old_files(Path(args.directory), args.days, args.delete_empty_dirs)


if __name__ == "__main__":
    main()