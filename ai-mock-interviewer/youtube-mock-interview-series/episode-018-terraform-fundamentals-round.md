# Episode 18: Terraform Fundamentals Round

YouTube title: DevOps Mock Interview Practice | Episode 18: Terraform Fundamentals Round

Estimated duration: 20-25 min

Source round: Mock Interview 18 - Terraform Fundamentals Round (source set 18)

Focus: state, remote backends, locking, loops, modules, environments, imports, lifecycle, secrets, and cost

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Terraform Fundamentals Round.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- CLI: Command Line Interface
- GKE: Google Kubernetes Engine
- IaC: Infrastructure as Code

---

## Question 1

Interviewer:
Terraform state basics: Explain Terraform state and why it is important.

Pause the video and answer this question aloud.

Senior Associate answer:
Terraform state is a file (local or remote) that maps the resources declared in your configuration to the real infrastructure objects Terraform created, tracking metadata and current attribute values. It's important because Terraform uses it to determine what needs to change on the next apply (diffing desired config against last-known state), and without accurate state, Terraform cannot reliably know what already exists or safely plan updates without risking duplicate or conflicting resources.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Terraform state basics: Explain Terraform state and why it is important.

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 2

Interviewer:
Terraform remote state: What is remote state, and why do teams use it?

Pause the video and answer this question aloud.

Senior Associate answer:
Remote state stores the state file in a shared backend (GCS bucket, Terraform Cloud) instead of a local file on one developer's machine, so the whole team works against the same source of truth. Teams use it to enable collaboration (everyone's plans/applies see the same current state), state locking to prevent concurrent conflicting applies, and to keep sensitive state data out of version control while still being securely accessible to CI/CD.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Terraform remote state: What is remote state, and why do teams use it?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 3

Interviewer:
Terraform state locking: How do you handle state locking?

Pause the video and answer this question aloud.

Senior Associate answer:
Use a backend that supports native locking (GCS with a lock mechanism, or Terraform Cloud/Enterprise) so that when one operation (plan or apply) is running against a workspace, a second concurrent operation is blocked rather than racing and potentially corrupting state. If a lock gets stuck (e.g. a crashed CI job left it held), `terraform force-unlock` can release it manually, but only after confirming no other operation is genuinely still in progress.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Terraform state locking: How do you handle state locking?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 4

Interviewer:
Terraform count vs for_each: What is the difference between count and for_each?

Pause the video and answer this question aloud.

Senior Associate answer:
`count` creates N nearly-identical resource instances indexed numerically (0, 1, 2...), which can cause unwanted resource recreation if the list order changes since instances are tracked by index. `for_each` iterates over a map or set of strings, tracking instances by a stable key rather than index, so adding/removing an item in the middle doesn't cause unrelated resources to be destroyed and recreated - `for_each` is generally preferred for anything beyond simple, order-independent repetition.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Terraform count vs for_each: What is the difference between count and for_each?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 5

Interviewer:
Terraform modules: What are modules, and how do you use them for reusable infrastructure?

Pause the video and answer this question aloud.

Senior Associate answer:
A module is a reusable, self-contained set of Terraform configuration with defined input variables and outputs, letting you package a common infrastructure pattern (like a standardized GKE cluster setup) once and reuse it across environments/teams by simply calling the module with different inputs. This reduces duplication, encodes best practices centrally, and lets you version the module so consumers upgrade deliberately rather than everyone maintaining their own copy-pasted configuration.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Terraform modules: What are modules, and how do you use them for reusable infrastructure?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 6

Interviewer:
Terraform environments: How do you manage multiple environments such as dev, staging, and production?

Pause the video and answer this question aloud.

Senior Associate answer:
Use separate state files/workspaces per environment (either Terraform workspaces, or better for isolation, entirely separate directories/backends per environment) so a mistake in dev can never touch production state. Share common logic through modules with environment-specific variable files (dev.tfvars, prod.tfvars) supplying the differences, keeping the underlying infrastructure pattern consistent across environments while allowing appropriately different sizing/settings.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Terraform environments: How do you manage multiple environments such as dev, staging, and production?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 7

Interviewer:
Terraform import: How do you import existing resources into Terraform safely?

Pause the video and answer this question aloud.

Senior Associate answer:
Write the Terraform resource configuration to match the existing resource's actual current settings, then use `terraform import` (or import blocks) to associate it with state, and immediately run `terraform plan` to confirm zero diff - any difference shown means your written config doesn't yet match reality and needs correcting before you apply anything. Import incrementally and require a reviewed plan before the first real apply against newly imported resources.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Terraform import: How do you import existing resources into Terraform safely?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 8

Interviewer:
Terraform lifecycle block: What is the Terraform lifecycle block, and when would you use it?

Pause the video and answer this question aloud.

Senior Associate answer:
The lifecycle block customizes how Terraform manages a resource's create/update/destroy behavior - `create_before_destroy` ensures a replacement resource is created before the old one is destroyed (useful for zero-downtime replacement of things like load balancer backends), `prevent_destroy` blocks accidental deletion of critical resources, and `ignore_changes` tells Terraform to ignore drift on specific attributes that are legitimately managed outside Terraform.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Terraform lifecycle block: What is the Terraform lifecycle block, and when would you use it?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 9

Interviewer:
Terraform secrets: How do you handle secrets in Terraform?

Pause the video and answer this question aloud.

Senior Associate answer:
Avoid embedding raw secret values in Terraform variables where possible - reference secrets already stored in Secret Manager and grant resources access to fetch them at runtime instead. Mark any genuinely necessary sensitive variables/outputs with `sensitive = true` to redact them from CLI output, store state in an encrypted remote backend with tightly restricted access (state still contains plaintext values), and never commit .tfvars files containing secrets to version control.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Terraform secrets: How do you handle secrets in Terraform?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 10

Interviewer:
Terraform cost optimization: How do you reduce infrastructure cost using Terraform?

Pause the video and answer this question aloud.

Senior Associate answer:
Encode cost-conscious defaults directly into modules (appropriately sized machine types, autoscaling limits, lifecycle policies for storage) so every consumer benefits without needing to know the details, and use Terraform's plan output in CI combined with a cost estimation tool (Infracost or similar) to surface the cost impact of a change before it's applied. Regularly audit and remove unused resources that Terraform still tracks in state but nothing actually uses anymore.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Terraform cost optimization: How do you reduce infrastructure cost using Terraform?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Closing

That completes Episode 18: Terraform Fundamentals Round.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
