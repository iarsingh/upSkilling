import sys
from pathlib import Path
import streamlit as st

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from common import ask, page, safe_filename, show_error

page("AI Coding Assistant", "Explain, review, debug, test, or refactor a code snippet.")
task = st.selectbox("Task", ["Review", "Explain", "Debug", "Write tests", "Refactor"])
language = st.text_input("Language", "Python")
uploaded = st.file_uploader("Upload a source file (optional)")
uploaded_code = uploaded.getvalue().decode("utf-8", errors="replace") if uploaded else ""
code = st.text_area("Code", value=uploaded_code, height=300, placeholder="Paste code here...")
requirements = st.text_area("Context or expected behavior (optional)")
strictness = st.select_slider("Review strictness", ["Learning", "Production", "Security-critical"], "Production")
if st.button("Analyze code", disabled=not code.strip()):
    try:
        result = ask("You are a precise senior software engineer. Start with a verdict. For each issue give severity, location, impact, and fix. Flag uncertainty, preserve behavior unless asked otherwise, and put runnable code in fenced blocks. Prioritize correctness, security, reliability, and tests before style. Never claim you executed code.", f"Task: {task}\nLanguage: {language}\nStrictness: {strictness}\nContext: {requirements}\n\nCode:\n{code}", 2600)
        st.session_state.code_report = result
        st.markdown(result)
    except Exception as exc:
        show_error(exc)
if st.session_state.get("code_report"):
    name = uploaded.name if uploaded else f"{language}-review"
    st.download_button("Download review", st.session_state.code_report, f"{safe_filename(name)}.md", "text/markdown")
