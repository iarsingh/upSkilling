import sys
from pathlib import Path
import streamlit as st

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from common import ask, page, safe_filename, show_error

page("Multi-Agent Research Assistant", "A transparent planner → researchers → critic → writer workflow.")
topic = st.text_input("Research topic", "How can small teams adopt LLM observability?")
context = st.text_area("Optional source notes", placeholder="Paste trusted facts or links/notes here. This starter does not browse the web.")
depth = st.selectbox("Research depth", ["Brief", "Standard", "Deep"])
audience = st.text_input("Target audience", "Technical leaders")
if st.button("Run research team", disabled=not topic.strip()):
    try:
        with st.status("Agents are collaborating...", expanded=True) as status:
            st.write("Planner is defining the investigation...")
            plan_text = ask("You are a research planner. Create focused research questions, assumptions, scope boundaries, and success criteria.", f"Topic: {topic}\nDepth: {depth}\nAudience: {audience}")
            st.write("Technical researcher is analyzing mechanisms...")
            technical = ask("You are a technical researcher. Analyze mechanisms, architecture, tradeoffs, and implementation details. Clearly label claims unsupported by the supplied notes.", f"Topic: {topic}\nPlan: {plan_text}\nSource notes: {context}")
            st.write("Strategy researcher is analyzing adoption...")
            strategy = ask("You are a strategy researcher. Analyze users, costs, risks, metrics, and rollout. Clearly label claims unsupported by the supplied notes.", f"Topic: {topic}\nPlan: {plan_text}\nSource notes: {context}")
            st.write("Critic is challenging the findings...")
            critique = ask("You are a skeptical research critic. Identify contradictions, weak evidence, missing perspectives, and overconfident claims.", f"Technical report:\n{technical}\n\nStrategy report:\n{strategy}")
            st.write("Writer is synthesizing the final report...")
            report = ask("You are a senior research writer. Produce a decision-ready report for the named audience with executive summary, findings, options, recommendation, 30/60/90-day action plan, risks, open questions, and an evidence-limitations section. Do not fabricate citations. Distinguish supplied facts from agent analysis.", f"Topic: {topic}\nDepth: {depth}\nAudience: {audience}\nPlan: {plan_text}\nTechnical: {technical}\nStrategy: {strategy}\nCritique: {critique}", 3200)
            st.session_state.research_report = report
            status.update(label="Research complete", state="complete")
        st.markdown(report)
        with st.expander("Agent trace"):
            st.subheader("Plan")
            st.markdown(plan_text)
            st.subheader("Technical researcher")
            st.markdown(technical)
            st.subheader("Strategy researcher")
            st.markdown(strategy)
            st.subheader("Critic")
            st.markdown(critique)
    except Exception as exc:
        show_error(exc)
if st.session_state.get("research_report"):
    st.download_button("Download research report", st.session_state.research_report, f"{safe_filename(topic, 'research-report')}.md", "text/markdown")
