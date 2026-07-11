# Episode 46: Ansible / Configuration Management Round

YouTube title: DevOps Mock Interview Practice | Episode 46: Ansible / Configuration Management Round

Estimated duration: 16-21 min

Source round: Mock Interview 46 - Ansible / Configuration Management Round (source set 46)

Focus: Ansible playbooks, roles, idempotency, Vault secrets, testing, scale, and combining Ansible with Terraform across multi-cloud environments

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Ansible / Configuration Management Round.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CI: Continuous Integration
- DR: Disaster Recovery

---

## Question 1

Interviewer:
What is Ansible, and how does its agentless, push-based model differ from Terraform or Puppet/Chef?

Pause the video and answer this question aloud.

Senior Associate answer:
Ansible connects to target hosts over SSH (or WinRM for Windows) and pushes configuration changes on demand, requiring no persistent agent installed on managed nodes, unlike Puppet/Chef's typical pull-based model where an agent on each host periodically checks in and applies configuration. This differs from Terraform's focus (provisioning and managing the lifecycle of infrastructure resources via cloud provider APIs) versus Ansible's focus (configuring the software and state inside already-provisioned systems), which is why the two are often used together rather than as competitors.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is Ansible, and how does its agentless, push-based model differ from Terraform or Puppet/Chef?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
How do you ensure Ansible playbooks are idempotent, and what happens when a task isn't naturally idempotent?

Pause the video and answer this question aloud.

Senior Associate answer:
Use Ansible's built-in modules (which are designed to be idempotent - checking current state before making a change) rather than raw shell/command tasks wherever possible, since modules like `apt`, `file`, and `template` only make changes when the actual state differs from desired state. When a task genuinely isn't naturally idempotent (a raw shell command), add explicit state-checking logic (a `creates`/`removes` guard, or a conditional based on a prior check task's output) so re-running the playbook doesn't repeat the action unnecessarily or cause harm.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How do you ensure Ansible playbooks are idempotent, and what happens when a task isn't naturally idempotent?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
How would you structure reusable Ansible roles for OS patching, configuration management, and application deployment across many teams?

Pause the video and answer this question aloud.

Senior Associate answer:
Structure roles around single, well-defined responsibilities (a patching role, a base-hardening role, an app-deployment role) with clear, documented variables for customization, published to a shared role repository or Galaxy-style internal registry so teams consume tested, versioned roles rather than duplicating playbook logic. Compose team-specific playbooks by combining these shared roles with team-specific variables, keeping the reusable logic centralized while allowing legitimate per-team customization through variables rather than forked copies.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How would you structure reusable Ansible roles for OS patching, configuration management, and application deployment across many teams?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
How would you manage secrets in Ansible using Vault, and how would you rotate a vaulted secret without redistributing it manually?

Pause the video and answer this question aloud.

Senior Associate answer:
Store secrets encrypted with Ansible Vault, referenced in playbooks as normal variables so the encryption is transparent to the playbook logic itself, with the Vault password supplied at runtime via a password file or CI secret rather than committed anywhere. For rotation without manual redistribution, drive secret updates through the same automated pipeline that runs the playbooks - update the vaulted variable in source control, and let the next scheduled or triggered playbook run propagate the new secret to all managed hosts automatically.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How would you manage secrets in Ansible using Vault, and how would you rotate a vaulted secret without redistributing it manually?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 5

Interviewer:
When would you use Ansible instead of Terraform, and how would you combine them in the same pipeline, for example Terraform provisions and Ansible configures?

Pause the video and answer this question aloud.

Senior Associate answer:
Use Terraform for provisioning cloud infrastructure resources (VMs, networks, managed services) and Ansible for configuring the software and state inside those resources once they exist (installing packages, managing config files, deploying applications) - they solve different, complementary problems. A common pipeline pattern has Terraform provision VMs and output their IPs as a dynamic inventory source, which Ansible then consumes to configure those newly-created hosts as the next pipeline stage, keeping provisioning and configuration cleanly separated but automated end to end.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: When would you use Ansible instead of Terraform, and how would you combine them in the same pipeline, for example Terraform provisions and Ansible configures?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
How would you run Ansible playbooks against thousands of hosts efficiently, and what would you do about serial execution, forks, and failure handling?

Pause the video and answer this question aloud.

Senior Associate answer:
Increase the `forks` setting (default is low, 5) to run tasks against many more hosts in parallel, limited by your control node's resources and the target infrastructure's tolerance for concurrent connections. Use `serial:` to roll changes out in controlled batches when the change itself is risky (like a restart), even while forks handles the per-batch parallelism, and configure `max_fail_percentage` so a reasonable amount of individual host failures doesn't abort the entire run across thousands of hosts.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How would you run Ansible playbooks against thousands of hosts efficiently, and what would you do about serial execution, forks, and failure handling?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
How would you test Ansible roles and playbooks before running them in production, for example with Molecule or a CI pipeline?

Pause the video and answer this question aloud.

Senior Associate answer:
Use Molecule to test roles in isolation against ephemeral containers or VMs, verifying both that the role applies successfully and that it's genuinely idempotent (running it twice produces no changes the second time), integrated into CI so every role change is tested automatically before merge. Run `ansible-lint` and a `--check --diff` dry-run against a staging inventory as an additional gate before any production run, so issues are caught in an isolated test environment rather than discovered live against real infrastructure.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How would you test Ansible roles and playbooks before running them in production, for example with Molecule or a CI pipeline?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
You used Ansible for backup automation and disaster recovery. Walk me through how a playbook-driven DR runbook would work end to end.

Pause the video and answer this question aloud.

Senior Associate answer:
A DR playbook would orchestrate the full recovery sequence declaratively - provisioning or verifying replacement infrastructure, restoring data from the most recent validated backup, reconfiguring application settings for the recovery environment, and running post-restore validation checks - all as ordered, idempotent tasks rather than a manual checklist a human executes under pressure. Running this playbook regularly against a test environment (not just documenting it) is what actually proves the DR process works, since an untested runbook is a hope, not a validated recovery capability.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: You used Ansible for backup automation and disaster recovery. Walk me through how a playbook-driven DR runbook would work end to end.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 46: Ansible / Configuration Management Round.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
