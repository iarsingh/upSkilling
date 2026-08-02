from pathlib import Path
import os
import runpy
import streamlit as st

PROJECTS = {
    "RAG document chatbot": "rag_chatbot",
    "AI mock interviewer": "mock_interviewer",
    "Resume analyzer & job matcher": "resume_matcher",
    "Text-to-image studio": "text_to_image",
    "AI coding assistant": "coding_assistant",
    "Multi-agent research assistant": "multi_agent_research",
}

st.set_page_config(page_title="GenAI Project Portfolio", page_icon="✨", layout="wide")
os.environ["GENAI_PORTFOLIO_LAUNCHER"] = "1"
st.sidebar.title("GenAI Portfolio")
choice = st.sidebar.radio("Choose a project", list(PROJECTS))
target = Path(__file__).parent / "projects" / PROJECTS[choice] / "app.py"
runpy.run_path(str(target), run_name="__main__")
