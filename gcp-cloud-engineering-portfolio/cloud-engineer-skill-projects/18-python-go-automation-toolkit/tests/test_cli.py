import unittest
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from gcp_ops_toolkit.cli import detect_public_firewalls


class FirewallScannerTest(unittest.TestCase):
    def test_detect_public_ssh(self):
        findings = detect_public_firewalls(
            [
                {
                    "name": "bad-ssh",
                    "network": "global/networks/default",
                    "sourceRanges": ["0.0.0.0/0"],
                    "allowed": [{"IPProtocol": "tcp", "ports": ["22"]}],
                }
            ]
        )

        self.assertEqual(len(findings), 1)
        self.assertEqual(findings[0].severity, "high")


if __name__ == "__main__":
    unittest.main()
