# Episode 91: Terraform Secret Creation Hands-On Round

YouTube title: DevOps Mock Interview Practice | Episode 91: Terraform Secret Creation Hands-On Round

Estimated duration: 10-15 min

Source round: Mock Interview 66 - Terraform Secret Creation Hands-On Round (source set 66)

Focus: Terraform hands-on coding task for local provider initialization, input variables, environment-backed secrets, local_file resource creation, file permissions, and clean grading through sudo solve

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Terraform Secret Creation Hands-On Round.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

---

## Question 1

Interviewer:
Terraform: Secret Creation. You want to deploy a web application using Terraform. Complete /home/ubuntu/1063862-terraform-secret-creation/main.tf using HCL so that it initializes the hashicorp/local provider at version 2.1.0, declares a variable named secret whose value is passed through an environment variable during terraform apply, and creates a local_file resource at /run/secret with permissions 0600 and content from var.secret. The solution must live inside /home/ubuntu/1063862-terraform-secret-creation and be correct when evaluated by running sudo solve from that directory in a clean environment.

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Terraform/Hands-On angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Terraform: Secret Creation. You want to deploy a web application using Terraform. Complete /home/ubuntu/1063862-terraform-secret-creation/main.tf using HCL so that it initializes the hashicorp/local provider at version 2.1.0, declares a variable named secret whose value is passed through an environment variable during terraform apply, and creates a local_file resource at /run/secret with permissions 0600 and content from var.secret. The solution must live inside /home/ubuntu/1063862-terraform-secret-creation and be correct when evaluated by running sudo solve from that directory in a clean environment.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Terraform: Secret Creation. You want to deploy a web application using Terraform. Complete /home/ubuntu/1063862-terraform-secret-creation/main.tf using HCL so that it initializes the hashicorp/local provider at version 2.1.0, declares a variable named secret whose value is passed through an environment variable during terraform apply, and creates a local_file resource at /run/secret with permissions 0600 and content from var.secret. The solution must live inside /home/ubuntu/1063862-terraform-secret-creation and be correct when evaluated by running sudo solve from that directory in a clean environment.

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Closing

That completes Episode 91: Terraform Secret Creation Hands-On Round.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
