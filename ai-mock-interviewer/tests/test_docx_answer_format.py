import ast
import re
import sys
import unittest
from pathlib import Path

from docx import Document

SCRIPTS = Path(__file__).resolve().parents[1] / "scripts"
sys.path.insert(0, str(SCRIPTS))
from docx_answer_format import append_answer_runs


class AnswerFormattingTests(unittest.TestCase):
    def test_fences_are_hidden_and_python_indentation_survives(self):
        paragraph = Document().add_paragraph()
        append_answer_runs(paragraph, "Example:\n```python\ndef f():\n    return 1\n```\nDone.")
        self.assertEqual(paragraph.text, "Example:\ndef f():\n    return 1\nDone.")
        code = next(run for run in paragraph.runs if run.text == "    return 1")
        self.assertEqual(code.font.name, "Consolas")

    def test_parser_does_not_treat_code_as_markdown_metadata(self):
        # Load only the parser, without regenerating the entire handbook.
        tree = ast.parse((SCRIPTS / "build-actual-interview-docx.py").read_text())
        parser = next(node for node in tree.body if isinstance(node, ast.FunctionDef) and node.name == "parse_source")
        namespace = {"re": re}
        exec(compile(ast.Module(body=[parser], type_ignores=[]), "parser", "exec"), namespace)
        source = "## Python\n### 1. Show code.\n**Type:** Coding\n**Answer:**\n```python\n## comment\ndef f():\n\n    return 1\n```\n---\n### 2. Next?\n**Answer:**\nYes.\n"
        questions = namespace["parse_source"](source)[0]["questions"]
        self.assertEqual(len(questions), 2)
        self.assertIn("## comment\ndef f():\n\n    return 1", questions[0]["answer"])
        self.assertEqual(questions[1]["answer"], "Yes.")


if __name__ == "__main__":
    unittest.main()
