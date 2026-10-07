---
date: 2026-10-10
series: Platform AI Transformation Playbook
issue: 03
status: draft
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
---

PLATFORM AI TRANSFORMATION PLAYBOOK | #03

Identity is the first tool.

If an agent uses a shared human login, you do not have an agent. You have an unaccountable coworker.

Before model choice, I want:

- A unique identity per agent (workload identity, not a copied PAT)
- Least-privilege scopes on every tool
- A ticket or change record that names the human owner
- An audit line: who acted, on what, with which tool, and whether a human approved

This is the same discipline as Kubernetes service accounts and Terraform runners. The LLM does not get a pass.

In labs I keep data local and refuse production apply from a laptop. An agent that can apply infra is a CD system. Treat it like one.

If you cannot revoke the agent’s credentials in five minutes, it is not ready.

Do you give agents their own identity, or do they borrow yours?

#DevSecOps #IAM #Kubernetes #AgenticAI #PlatformEngineering
