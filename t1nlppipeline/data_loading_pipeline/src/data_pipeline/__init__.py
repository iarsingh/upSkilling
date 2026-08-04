"""Generator-based gzip data-loading pipeline."""

from .batching import iter_batches
from .loader import discover_gzip_files, inspect_input_files, iter_records
from .pipeline import iter_fragment_batches, iter_text_fragments

__all__ = [
    "discover_gzip_files",
    "inspect_input_files",
    "iter_batches",
    "iter_fragment_batches",
    "iter_records",
    "iter_text_fragments",
]