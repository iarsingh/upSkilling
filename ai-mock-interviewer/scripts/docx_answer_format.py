"""Render fenced answer examples without losing code indentation."""

from docx.shared import Pt


def append_answer_runs(paragraph, text, prose_size=11):
    in_code = False
    first = True
    for line in text.splitlines():
        if line.lstrip().startswith("```"):
            in_code = not in_code
            continue
        if not first:
            paragraph.add_run().add_break()
        run = paragraph.add_run(line)
        run.font.size = Pt(9 if in_code else prose_size)
        if in_code:
            run.font.name = "Consolas"
        first = False
