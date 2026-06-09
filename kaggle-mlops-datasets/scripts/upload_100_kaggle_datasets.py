import json
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1] / "kaggle-100-portfolio-datasets"
STATUS_PATH = ROOT / "upload_status.json"
KAGGLE_BIN = os.getenv("KAGGLE_BIN", "kaggle")
TIMEOUT_SECONDS = int(os.getenv("KAGGLE_UPLOAD_TIMEOUT_SECONDS", "180"))


def load_status() -> dict:
    if STATUS_PATH.exists():
        return json.loads(STATUS_PATH.read_text(encoding="utf-8"))
    return {"uploaded": {}, "failed": {}}


def save_status(status: dict) -> None:
    status["updated_at"] = datetime.now(timezone.utc).isoformat()
    STATUS_PATH.write_text(json.dumps(status, indent=2) + "\n", encoding="utf-8")


def run_command(args: list[str]) -> subprocess.CompletedProcess:
    return subprocess.run(
        args,
        cwd=Path(__file__).resolve().parents[2],
        text=True,
        capture_output=True,
        timeout=TIMEOUT_SECONDS,
        check=False,
    )


def upload_folder(folder: Path) -> tuple[bool, str]:
    create = run_command([KAGGLE_BIN, "datasets", "create", "-q", "-p", str(folder)])
    if create.returncode == 0:
        return True, create.stdout.strip() or "created"

    version = run_command(
        [
            KAGGLE_BIN,
            "datasets",
            "version",
            "-q",
            "-p",
            str(folder),
            "-m",
            f"Upload {folder.name}",
        ]
    )
    if version.returncode == 0:
        return True, version.stdout.strip() or "versioned"

    details = "\n".join(
        line
        for line in [
            "create stdout:",
            create.stdout.strip(),
            "create stderr:",
            create.stderr.strip(),
            "version stdout:",
            version.stdout.strip(),
            "version stderr:",
            version.stderr.strip(),
        ]
        if line
    )
    return False, details[-4000:]


def main() -> int:
    start = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    end = int(sys.argv[2]) if len(sys.argv) > 2 else 100
    status = load_status()
    folders = sorted(path for path in ROOT.iterdir() if path.is_dir())
    selected = [folder for folder in folders if start <= int(folder.name[:3]) <= end]

    for folder in selected:
        dataset_number = folder.name[:3]
        if dataset_number in status["uploaded"]:
            print(f"SKIP {folder.name}")
            continue
        print(f"UPLOAD {folder.name}", flush=True)
        try:
            ok, message = upload_folder(folder)
        except subprocess.TimeoutExpired:
            ok, message = False, f"Timed out after {TIMEOUT_SECONDS} seconds"

        if ok:
            status["uploaded"][dataset_number] = {"folder": folder.name, "message": message}
            status["failed"].pop(dataset_number, None)
            print(f"OK {folder.name}", flush=True)
        else:
            status["failed"][dataset_number] = {"folder": folder.name, "message": message}
            print(f"FAIL {folder.name}: {message[:300]}", flush=True)
        save_status(status)

    print(
        f"uploaded={len(status['uploaded'])} failed={len(status['failed'])} status={STATUS_PATH}",
        flush=True,
    )
    return 0 if not status["failed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
