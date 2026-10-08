---
date: 2027-02-09
slot: 08:00
series: Platform AI Transformation Playbook
issue: 05
topic: "GitOps, evals and human gates."
format: carousel
document: ../output/2027-02-09-ai-05-gitops-evals-human-gates.pdf
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
status: scheduled
---

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

Or just reply 1, 2 or 3: which is hardest to get your team to do?
1️⃣ Agents open PRs, GitOps applies
2️⃣ Evals gate merges like tests do
3️⃣ Humans approve the irreversible

🔖 Save this for your next AI architecture review. ♻️ Repost if it would help someone on your team.

Next in Platform AI Transformation Playbook, Tue 9 Mar: What I would not put in production. Follow so it lands in your feed.

Platform AI Transformation Playbook · #05 of 6

#AgenticAI #PlatformEngineering #DevSecOps #AIArchitecture #MLOps
