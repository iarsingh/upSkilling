import json
import re
import os
from datetime import date

from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml.ns import qn

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(ROOT, "scripts", "answer-bank", "final-qa-dataset.json")
OUT_PATH = os.path.join(ROOT, "AI-Mock-Interview-Question-Bank.docx")

with open(DATA_PATH, "r") as f:
    entries = json.load(f)

TOPIC_ORDER = [
    "GCP / DevOps / SRE Question Bank",
    "Kubernetes Fundamentals (101–200)",
    "Docker & Containers (201–260)",
    "Docker",
    "Terraform & IaC (361–450)",
    "CI/CD & GitOps (261–360)",
    "Observability & Monitoring (451–540)",
    "GCP & Cloud Engineering (541–650)",
    "Linux, Networking & Security (651–760)",
    "System Design & Architecture (761–860)",
    "SRE, Behavioural & Scenario Questions (861–1000)",
    "Advanced Kubernetes, GCP, Terraform, Python and Scenario-Based Questions (1001-1080)",
    "GCP Machine Learning and Vertex AI Mock Interview Questions (1081-1120)",
    "JD-Specific Senior Cloud Engineering Mock Interview Questions (1121-1180)",
    "Scripting & Automation",
    "Coding Exercises",
    "Debug This Script",
    "Python",
    "Go",
    "FastAPI",
    "Ansible",
    "LLMOps / GenAI Production",
    "MLOps Fundamentals (1–100)",
    "Technology Risk - Technical",
    "Technology Risk - Behavioral",
    "HR / Behavioral Basics",
    "Basic / One-Liner Concepts",
]

mock_sections = {}
topic_sections = {}
other_sections = {}

for e in entries:
    sec = e["section"]
    m = re.match(r"^Mock Interview (\d+)", sec)
    if m:
        mock_sections.setdefault((int(m.group(1)), sec), []).append(e)
    elif sec in TOPIC_ORDER:
        topic_sections.setdefault(sec, []).append(e)
    else:
        other_sections.setdefault(sec, []).append(e)

doc = Document()

# ---- base style ----
style = doc.styles["Normal"]
style.font.name = "Calibri"
style.font.size = Pt(11)
rpr = style.element.get_or_add_rPr()
rFonts = rpr.find(qn("w:rFonts"))
if rFonts is None:
    rFonts = rpr.makeelement(qn("w:rFonts"), {})
    rpr.append(rFonts)
rFonts.set(qn("w:eastAsia"), "Calibri")

# ---- title page ----
title = doc.add_paragraph()
title.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = title.add_run("AI Mock Interview Question Bank")
run.bold = True
run.font.size = Pt(28)
run.font.color.rgb = RGBColor(0x1A, 0x3C, 0x6E)

subtitle = doc.add_paragraph()
subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = subtitle.add_run("Senior GCP DevOps / SRE / Platform Engineer / MLOps & LLMOps Engineer")
run.font.size = Pt(15)
run.font.color.rgb = RGBColor(0x44, 0x44, 0x44)

meta = doc.add_paragraph()
meta.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = meta.add_run(f"{len(entries)} unique questions with answers  •  Generated {date.today().isoformat()}")
run.font.size = Pt(11)
run.italic = True
run.font.color.rgb = RGBColor(0x66, 0x66, 0x66)

doc.add_paragraph()
desc = doc.add_paragraph()
desc.add_run(
    "This document combines every question and answer from the ai-mock-interviewer question bank: "
    "the 77 fixed practice mock interview rounds, the full topic-organized technical question bank "
    "(GCP, Kubernetes/GKE, Terraform, Docker, CI/CD, Observability, Security, Networking, Linux, System Design, "
    "SRE/behavioral, Python, Go, FastAPI, Ansible, Scripting, Coding Exercises, MLOps, and LLMOps/GenAI), "
    "and the Technology Risk Lead track."
)

doc.add_page_break()

def add_heading(text, level=1):
    h = doc.add_heading(text, level=level)
    for run in h.runs:
        run.font.color.rgb = RGBColor(0x1A, 0x3C, 0x6E)
    return h

def add_qa(number, entry):
    q_para = doc.add_paragraph()
    q_para.paragraph_format.space_before = Pt(10)
    q_para.paragraph_format.space_after = Pt(2)
    question_text = entry["question"]
    if "\n" in question_text:
        lines = question_text.split("\n")
        q_run = q_para.add_run(f"Q{number}. {lines[0]}")
        q_run.bold = True
        q_run.font.size = Pt(11.5)
        for line in lines[1:]:
            code_run = q_para.add_run()
            code_run.add_break()
            code_run.text = line if line.strip() else " "
            code_run.font.name = "Consolas"
            code_run.font.size = Pt(9.5)
            code_run.font.color.rgb = RGBColor(0x33, 0x33, 0x33)
    else:
        q_run = q_para.add_run(f"Q{number}. {question_text}")
        q_run.bold = True
        q_run.font.size = Pt(11.5)
    if entry.get("category"):
        cat_para = doc.add_paragraph()
        cat_para.paragraph_format.space_before = Pt(0)
        cat_para.paragraph_format.space_after = Pt(2)
        cat_run = cat_para.add_run(entry["category"])
        cat_run.italic = True
        cat_run.font.size = Pt(9)
        cat_run.font.color.rgb = RGBColor(0x88, 0x88, 0x88)
    a_para = doc.add_paragraph()
    a_para.paragraph_format.space_after = Pt(8)
    a_para.paragraph_format.left_indent = Inches(0.15)
    a_run = a_para.add_run("A: " + entry["answer"])
    a_run.font.size = Pt(10.5)

# ---- Part 1: Fixed Mock Interview Sets, in order 1..77 ----
add_heading("Part 1 — Fixed Mock Interview Rounds (1–77)", level=1)
doc.add_paragraph(
    "Each round is a fixed, realistic mock interview set. Use one round per practice session."
)

for (num, sec), items in sorted(mock_sections.items(), key=lambda kv: kv[0][0]):
    add_heading(sec, level=2)
    for i, entry in enumerate(items, 1):
        add_qa(i, entry)

doc.add_page_break()

# ---- Part 2: Topic-organized question banks ----
add_heading("Part 2 — Topic Question Banks", level=1)
doc.add_paragraph(
    "The complete technical question bank organized by subject. Use this section to drill a specific "
    "technology or focus area in depth."
)

counter = 1
for sec in TOPIC_ORDER:
    if sec not in topic_sections:
        continue
    add_heading(sec, level=2)
    for entry in topic_sections[sec]:
        add_qa(counter, entry)
        counter += 1

# ---- Part 3: any remaining/miscellaneous sections ----
if other_sections:
    doc.add_page_break()
    add_heading("Part 3 — Additional Technology Risk Topics", level=1)
    for sec in sorted(other_sections.keys()):
        add_heading(sec, level=2)
        for entry in other_sections[sec]:
            add_qa(counter, entry)
            counter += 1

doc.save(OUT_PATH)
print(f"Wrote {OUT_PATH}")
print(f"Total questions in document: {len(entries)}")
