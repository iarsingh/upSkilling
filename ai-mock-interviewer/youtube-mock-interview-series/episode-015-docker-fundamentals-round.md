# Episode 15: Docker Fundamentals Round

YouTube title: DevOps Mock Interview Practice | Episode 15: Docker Fundamentals Round

Estimated duration: 12-17 min

Source round: Mock Interview 15 - Docker Fundamentals Round (source set 15)

Focus: Docker basics, Dockerfiles, image size, build behavior, and image security

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Docker Fundamentals Round.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CI: Continuous Integration
- VM: Virtual Machine

---

## Question 1

Interviewer:
Docker fundamentals: What is Docker, and what problem does it solve?

Pause the video and answer this question aloud.

Senior Associate answer:
Docker packages an application with all its dependencies into a lightweight, portable container image, solving the classic 'it works on my machine' problem by ensuring the same environment runs identically from a developer's laptop through CI to production, without needing a full VM per application.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: Docker fundamentals: What is Docker, and what problem does it solve?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 2

Interviewer:
Dockerfile fundamentals: What is a Dockerfile, and how is it used to build an image?

Pause the video and answer this question aloud.

Senior Associate answer:
A Dockerfile is a text file of instructions (FROM, COPY, RUN, CMD, etc.) describing how to assemble a container image layer by layer - `docker build` reads it top to bottom, executing each instruction to produce a final image that can be tagged, pushed to a registry, and run consistently anywhere Docker is installed.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: Dockerfile fundamentals: What is a Dockerfile, and how is it used to build an image?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 3

Interviewer:
Docker CMD vs ENTRYPOINT: What is the difference between CMD and ENTRYPOINT?

Pause the video and answer this question aloud.

Senior Associate answer:
ENTRYPOINT defines the fixed executable that always runs when the container starts, while CMD provides default arguments to that entrypoint (or the default command if no ENTRYPOINT is set) that can be overridden at `docker run` time - combining both lets you build an image with a fixed main command but configurable default arguments.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: Docker CMD vs ENTRYPOINT: What is the difference between CMD and ENTRYPOINT?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 4

Interviewer:
Docker image optimization: How do you optimize Docker image size?

Pause the video and answer this question aloud.

Senior Associate answer:
Use a minimal base image (Alpine or distroless), multi-stage builds so build tools never reach the final image, combine RUN instructions and clean up package manager caches within the same layer, and copy only the files actually needed rather than the whole build context.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: Docker image optimization: How do you optimize Docker image size?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 5

Interviewer:
Docker multi-stage builds: What are multi-stage builds, and when would you use them?

Pause the video and answer this question aloud.

Senior Associate answer:
Multi-stage builds use multiple FROM statements in one Dockerfile, where an early stage compiles or builds the application with full toolchains, and a later, minimal stage copies only the compiled artifact - use them any time your build process needs tools (compilers, dependency managers) that shouldn't bloat or expose attack surface in the final runtime image.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: Docker multi-stage builds: What are multi-stage builds, and when would you use them?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 6

Interviewer:
Docker image security: How do you secure Docker images before deploying them?

Pause the video and answer this question aloud.

Senior Associate answer:
Scan images for known vulnerabilities in CI before push, run as a non-root user, use a minimal base image to reduce attack surface, never bake secrets into layers, sign images and enforce verification (Binary Authorization) at deploy time, and keep base images patched and rebuilt regularly rather than treating an image as build-once-run-forever.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: Docker image security: How do you secure Docker images before deploying them?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Closing

That completes Episode 15: Docker Fundamentals Round.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
