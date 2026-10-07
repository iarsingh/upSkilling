# Platform AI Transformation Playbook

Akhilesh Ranjan Singh — Cloud, Platform, DevSecOps.

This series is written the way I operate platforms: identity, GitOps, blast radius, evals, and human gates. It is **not** a copy of anyone else’s carousel. The idea (GenAI answers vs agents that act) is now common; the operating model is the point.

Do not claim live customer agent deployments. Public GitHub labs stay labelled as labs. No production `apply` from a laptop.

## Series

| # | Title | LinkedIn post |
| --- | --- | --- |
| 01 | An agent is a production system | [posts/01-agent-is-a-production-system.md](posts/01-agent-is-a-production-system.md) |
| 02 | GenAI vs Agentic: the control-plane gap | [posts/02-genai-vs-agentic-control-plane.md](posts/02-genai-vs-agentic-control-plane.md) |
| 03 | Identity is the first tool | [posts/03-identity-is-the-first-tool.md](posts/03-identity-is-the-first-tool.md) |
| 04 | Appropriate autonomy | [posts/04-appropriate-autonomy.md](posts/04-appropriate-autonomy.md) |
| 05 | GitOps, evals, and human gates | [posts/05-gitops-evals-human-gates.md](posts/05-gitops-evals-human-gates.md) |
| 06 | What I would not put in production | [posts/06-what-i-would-not-put-in-production.md](posts/06-what-i-would-not-put-in-production.md) |

Start publishing with **#02** if you want the same hook as the post you shared. Use **#01** as the series intro.

## Architecture in one line

**GenAI:** Prompt → LLM → Response

**Agentic:** Goal → Reason → Plan → Tools → Action → Validate → (Human gate if the blast radius is real)

The extra boxes are software, not magic: IAM, APIs, memory, retries, traces, audit, policy.

## 7-page carousels

This series is part of the shared carousel calendar in [`../carousels/`](../carousels/README.md). Slide content lives in `../carousels/content/ai.js`; the post text above is used as-is. PDFs are rendered to `../carousels/output/`.

## How to post on LinkedIn

The daily workflow publishes each issue on its scheduled date with the PDF attached as a LinkedIn document. To post by hand:

1. Paste the post body (first ~1,300 characters is the hook; rest can sit behind “see more”).
2. Attach the matching PDF from `../carousels/output/` (Add a document), titled e.g. “Platform AI Transformation Playbook #02”.
3. Comment with the GitHub lab you want to show: `terraform-gcp-platform`, `customer-deployment-platform`, or the FDE case studies — labelled as labs.
4. Do not tag Bupa work as an agent product.
