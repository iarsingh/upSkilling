import io
import sys
from pathlib import Path
import streamlit as st
from pypdf import PdfReader

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from common import ask, page, safe_filename, show_error


def resume_text(upload) -> str:
    if upload.name.lower().endswith(".pdf"):
        return "\n".join(p.extract_text() or "" for p in PdfReader(io.BytesIO(upload.getvalue())).pages)
    return upload.getvalue().decode("utf-8", errors="replace")


page("Resume Analyzer & Job Matcher", "Compare a resume with a job description and get actionable improvements.")
resume = st.file_uploader("Resume", type=["pdf", "txt", "md"])
job = st.text_area("Job description", height=220)
target_title = st.text_input("Target job title", "")
analysis_depth = st.select_slider("Analysis depth", ["Quick", "Standard", "Detailed"], "Standard")
if st.button("Analyze match", disabled=not resume or not job.strip()):
    try:
        prompt = f"TARGET TITLE: {target_title}\nDEPTH: {analysis_depth}\n\nRESUME:\n{resume_text(resume)}\n\nJOB DESCRIPTION:\n{job}"
        result = ask("Act as an evidence-based recruiter and ATS specialist. Return: executive verdict; match score /100 with transparent rationale; a Markdown table of required keywords with present/missing status; matched requirements; missing or weak evidence; risky claims; prioritized edits; and rewritten bullet examples using only facts already in the resume. Never invent candidate experience or guarantee hiring outcomes.", prompt, 2600)
        st.session_state.resume_report = result
        st.markdown(result)
    except Exception as exc:
        show_error(exc)
if st.session_state.get("resume_report"):
    st.download_button("Download analysis", st.session_state.resume_report, f"{safe_filename(target_title, 'resume')}-analysis.md", "text/markdown")
