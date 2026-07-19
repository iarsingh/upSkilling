# linkedin-branding-and-content

Personal brand and content-engine work: automation tooling for generating/publishing LinkedIn content, plus the GKE/MLOps content library used to write it.

## Contents

- [content-automation/](content-automation/README.md) — local Node.js pipeline that drafts, schedules, and (optionally) auto-publishes LinkedIn posts and short-form reels, including the [reel-generator/](content-automation/reel-generator) video narration/rendering pipeline.
- [gke-terraform-content/](gke-terraform-content/README.md) — the content library itself: GKE/MLOps post drafts, a 100-day content calendar, post hooks, interview prep notes, architecture diagrams, and a Terraform reference project used as source material for posts.
- [scriptsPython/](scriptsPython) — standalone Python utility scripts (`concurrentSsh.py`, `directoryCleanup.py`) used while producing hands-on content, plus a sample `hosts.txt`.
- [python-linkedin-post.md](python-linkedin-post.md) — positioning notes and outline for a Python-focused LinkedIn post series aimed at DevOps/Cloud/SRE/MLOps/Platform audiences.
