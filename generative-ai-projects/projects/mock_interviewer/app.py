import sys
from pathlib import Path
import streamlit as st

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from common import ask, page, safe_filename, show_error

page("AI Mock Interviewer", "Practice realistic interviews and receive structured coaching.")
role = st.text_input("Target role", "MLOps Engineer")
level = st.selectbox("Experience level", ["Junior", "Mid-level", "Senior", "Lead"])
topics = st.text_input("Focus topics", "Python, Kubernetes, ML systems")
interview_type = st.selectbox("Interview type", ["Technical", "Behavioral", "System design", "Mixed"])

if "interview_question" not in st.session_state:
    st.session_state.interview_question = ""
if "interview_rounds" not in st.session_state:
    st.session_state.interview_rounds = []
if st.button("Generate interview question"):
    try:
        previous = "\n".join(item["question"] for item in st.session_state.interview_rounds)
        st.session_state.interview_question = ask("You are a demanding but fair interviewer. Return one question only. Do not repeat earlier questions. Match the requested level and interview type.", f"Role: {role}\nLevel: {level}\nType: {interview_type}\nTopics: {topics}\nEarlier questions:\n{previous}")
    except Exception as exc:
        show_error(exc)

if st.session_state.interview_question:
    st.info(st.session_state.interview_question)
    answer = st.text_area("Your answer", height=180)
    if st.button("Evaluate answer", disabled=not answer.strip()):
        try:
            result = ask("Evaluate interview answers. Give scores out of 10 for correctness, depth, clarity, and examples; then strengths, gaps, and an improved sample answer.", f"Role: {role}\nQuestion: {st.session_state.interview_question}\nCandidate answer: {answer}")
            st.session_state.interview_rounds.append({"question": st.session_state.interview_question, "answer": answer, "feedback": result})
            st.markdown(result)
            st.session_state.interview_question = ""
        except Exception as exc:
            show_error(exc)

if st.session_state.interview_rounds:
    st.subheader(f"Interview history · {len(st.session_state.interview_rounds)} round(s)")
    report_parts = [f"# Mock Interview Report — {role}"]
    for index, item in enumerate(st.session_state.interview_rounds, 1):
        with st.expander(f"Round {index}: {item['question'][:80]}"):
            st.markdown(f"**Answer**\n\n{item['answer']}\n\n**Feedback**\n\n{item['feedback']}")
        report_parts.append(f"## Round {index}\n### Question\n{item['question']}\n### Answer\n{item['answer']}\n### Feedback\n{item['feedback']}")
    st.download_button("Download interview report", "\n\n".join(report_parts), f"{safe_filename(role)}-interview.md", "text/markdown")
