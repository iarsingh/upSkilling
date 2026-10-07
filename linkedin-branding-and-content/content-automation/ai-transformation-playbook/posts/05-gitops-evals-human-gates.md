---
date: 2026-10-14
series: Platform AI Transformation Playbook
issue: 05
status: draft
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
---

PLATFORM AI TRANSFORMATION PLAYBOOK | #05

GitOps, evals, and human gates.

I do not want an agent that “just runs kubectl.” I want an agent that opens a change the same way a human would:

1. Plan in the open (PR or ticket)
2. Policy check (OPA, SAST, DAST, SCA where it applies)
3. Eval gate (did the tool output match the goal, or just look fluent?)
4. Human approve when the action is irreversible
5. GitOps or CD applies
6. Trace the run: goal, tools, tokens, result, who signed

Evals are not a research hobby. They are the unit test for “did we do the thing we meant.”

Human-in-the-loop is not a lack of confidence in the model. It is how we already ship Terraform and Helm.

If the path to production is only a chat message, we skipped the control plane.

What is your eval for an agent run today — none, a rubric, or a human staring at the output?

#GitOps #CI_CD #DevSecOps #AgenticAI #LLMOps
