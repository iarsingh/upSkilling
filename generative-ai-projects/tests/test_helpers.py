import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT / "projects" / "rag_chatbot"))

from rag_utils import chunks
from common import safe_filename


def test_chunks_overlap_and_preserve_content():
    text = " ".join(str(i) for i in range(500))
    result = chunks(text, size=100, overlap=20)
    assert len(result) > 1
    assert all(len(item) <= 100 for item in result)
    assert result[0][-20:] == result[1][:20]


def test_chunks_rejects_invalid_overlap():
    try:
        chunks("hello", size=10, overlap=10)
    except ValueError:
        pass
    else:
        raise AssertionError("Expected invalid overlap to raise ValueError")


def test_safe_filename():
    assert safe_filename("  MLOps / Platform Report!  ") == "mlops-platform-report"
    assert safe_filename("", "download") == "download"
