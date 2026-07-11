# Episode 93: Docker HackerAPI Environment Variable Hands-On Round

YouTube title: DevOps Mock Interview Practice | Episode 93: Docker HackerAPI Environment Variable Hands-On Round

Estimated duration: 10-15 min

Source round: Mock Interview 68 - Docker HackerAPI Environment Variable Hands-On Round (source set 68)

Focus: Docker hands-on scripting task for container creation, image selection, container naming, host environment variable forwarding, detached interactive mode, and avoiding pseudo-TTY allocation

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Docker HackerAPI Environment Variable Hands-On Round.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

---

## Question 1

Interviewer:
Docker: HackerAPI Deployment, Environment Variables. Complete the script.sh file stub under /home/ubuntu/... so it runs a Docker container named hackerapi using image public.ecr.aws/docker/library/nginx:latest. The container must receive an environment variable named HACKERAPI_SECURITY_TOKEN with its value taken from the existing host environment variable of the same name, run in interactive background mode, and run without pseudo-TTY allocation. The expected command is: docker run -d -i --name hackerapi -e HACKERAPI_SECURITY_TOKEN=$HACKERAPI_SECURITY_TOKEN public.ecr.aws/docker/library/nginx:latest.

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Docker/Hands-On angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Docker: HackerAPI Deployment, Environment Variables. Complete the script.sh file stub under /home/ubuntu/... so it runs a Docker container named hackerapi using image public.ecr.aws/docker/library/nginx:latest. The container must receive an environment variable named HACKERAPI_SECURITY_TOKEN with its value taken from the existing host environment variable of the same name, run in interactive background mode, and run without pseudo-TTY allocation. The expected command is: docker run -d -i --name hackerapi -e HACKERAPI_SECURITY_TOKEN=$HACKERAPI_SECURITY_TOKEN public.ecr.aws/docker/library/nginx:latest.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Docker: HackerAPI Deployment, Environment Variables. Complete the script.sh file stub under /home/ubuntu/... so it runs a Docker container named hackerapi using image public.ecr.aws/docker/library/nginx:latest. The container must receive an environment variable named HACKERAPI_SECURITY_TOKEN with its value taken from the existing host environment variable of the same name, run in interactive background mode, and run without pseudo-TTY allocation. The expected command is: docker run -d -i --name hackerapi -e HACKERAPI_SECURITY_TOKEN=$HACKERAPI_SECURITY_TOKEN public.ecr.aws/docker/library/nginx:latest.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 93: Docker HackerAPI Environment Variable Hands-On Round.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
