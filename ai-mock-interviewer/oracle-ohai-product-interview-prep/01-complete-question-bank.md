# Complete Role-Aligned Question Bank

## Resume and project deep dive

1. Give me a two-minute introduction tailored to this AI Platform Engineer role.
2. Which platform that you built had the largest scale, and what did you personally own?
3. Draw the GCP landing-zone architecture you designed and explain the project hierarchy, Shared VPC, IAM, and policy controls.
4. You state that reusable Terraform modules reduced provisioning effort by 70%. What baseline and measurement produced that number?
5. How did teams consume your Terraform modules, and how did you version and support them?
6. Describe the most difficult production GKE incident you personally diagnosed.
7. What exact work produced the stated 20% GCP cost reduction?
8. Explain how you maintained 99.9% availability and how the SLI was calculated.
9. Describe your OpenTelemetry implementation from application instrumentation to dashboards and alerts.
10. Explain your MLflow and FastAPI platform work, including architecture, deployment, security, and operations.
11. What did you automate in the GitHub-to-Bitbucket migration, and how was the 30% productivity improvement measured?
12. Describe a backup or disaster-recovery event involving Veeam or Kasten K10.
13. Compare your responsibilities at TCS, Tech Mahindra, and Capgemini.
14. Which project best demonstrates production-quality Python rather than operational scripting?
15. Tell me about a technical claim on your CV that an interviewer is likely to challenge.

## Python and software engineering

16. How do you structure a production Python automation repository?
17. Explain iterators, generators, decorators, context managers, and dataclasses with platform examples.
18. Compare threads, processes, and asyncio. When is each appropriate?
19. How does Python's GIL affect CPU-bound and I/O-bound programs?
20. How would you design a reliable client for a rate-limited REST API?
21. Explain idempotency and show how you would implement it in an automation service.
22. How do you handle configuration, secrets, structured logging, metrics, and tracing?
23. How would you test cloud automation without changing real infrastructure?
24. Compare unit, integration, contract, end-to-end, and chaos tests.
25. How do type hints, linting, dependency locking, and security scanning improve a Python service?
26. How would you profile a slow Python data-processing pipeline?
27. Design a Python CLI supporting dry-run, retries, concurrency, and resumability.
28. Explain exception design: when should code retry, fail fast, skip, or compensate?
29. How would you safely process a file larger than available memory?
30. What code-review findings would block a Python automation change from production?

## Linux and Shell scripting

31. Explain process, thread, file descriptor, signal, and exit-code fundamentals.
32. A Linux host has high load but low CPU utilization. What could cause it?
33. How do you diagnose memory pressure, swapping, and OOM kills?
34. Explain `set -euo pipefail` and its limitations.
35. How do quoting, word splitting, globbing, and command substitution create Shell bugs?
36. How would you make a Shell script idempotent and safe to rerun?
37. When should a Shell script be rewritten in Python or Go?
38. How do you handle temporary files, locks, traps, and cleanup safely?
39. A scheduled script works manually but fails in cron. How do you debug it?
40. How would you test Shell scripts in CI?

## Kubernetes, GKE, and OpenShift

41. Explain the Kubernetes request path from `kubectl apply` to a running container.
42. How do the API server, etcd, scheduler, controllers, kubelet, and container runtime interact?
43. Compare Deployment, StatefulSet, DaemonSet, Job, and CronJob.
44. Explain requests, limits, QoS classes, throttling, eviction, and OOMKilled.
45. A Pod is Pending even though the cluster has free aggregate capacity. Diagnose it.
46. A Pod is in CrashLoopBackOff. Give your exact command-by-command workflow.
47. Explain readiness, liveness, startup probes, and graceful termination.
48. Why do rolling deployments sometimes produce 502 or 503 responses?
49. Compare HPA, VPA, Cluster Autoscaler, and event-driven scaling.
50. Explain ClusterIP, headless Service, NodePort, LoadBalancer, Ingress, and Gateway API.
51. How do CoreDNS, kube-proxy or eBPF, CNI, routes, and NetworkPolicy deliver traffic?
52. Pod traffic fails only across nodes. How do you isolate the fault?
53. Design default-deny network policies for a multi-tenant platform.
54. Design least-privilege RBAC and explain common privilege-escalation paths.
55. How do projected service-account tokens and workload identity improve security?
56. Compare ConfigMaps, Kubernetes Secrets, Vault, and cloud secret managers.
57. Explain PV, PVC, StorageClass, CSI, topology, snapshots, and restore.
58. How would you safely upgrade a production cluster and its node pools?
59. A PDB blocks node maintenance. What do you do?
60. How would you recover a stateful quorum application after a zone failure?
61. When do you choose one shared cluster, multiple clusters, or virtual clusters?
62. How would you control noisy neighbors in a shared cluster?
63. How do admission controllers, Gatekeeper, Kyverno, and image policies work?
64. An admission webhook outage blocks deployments. Restore and redesign it.
65. Compare Kubernetes and OpenShift, including Routes, SCCs, Operators, and platform opinionation.
66. What would you need to learn before operating OpenShift in production?
67. How would you use ephemeral containers for production debugging?
68. Design cluster backup, rebuild, and GitOps disaster recovery.

## Terraform and infrastructure automation

69. Design a reusable Terraform module interface for a Kubernetes platform.
70. How do you manage state, locking, encryption, access, backup, and recovery?
71. A Terraform apply fails halfway. How do you recover safely?
72. Explain `count`, `for_each`, dynamic blocks, locals, and comprehensions.
73. How do you manage dev, test, staging, and production without copy-paste?
74. How do you prevent secrets from entering state and pipeline logs?
75. How do you test Terraform modules and validate plans?
76. Design policy-as-code controls without blocking legitimate delivery.
77. How do you detect and reconcile console drift?
78. How do you import existing resources into Terraform safely?
79. How do you upgrade Terraform and provider versions across many workspaces?
80. Compare Terraform Enterprise workspaces, a monorepo, and multi-repo ownership.

## Cloud and distributed systems

81. Compare AWS, Azure, GCP, and OCI concepts for identity, networking, compute, storage, and monitoring.
82. Given your GCP background, how would you become productive in OCI quickly?
83. Explain availability, durability, consistency, latency, throughput, and scalability.
84. Explain CAP theorem without claiming that a system simply chooses two forever.
85. Compare synchronous APIs, asynchronous messaging, queues, streams, and batch processing.
86. How do timeouts, retries, jitter, circuit breakers, bulkheads, and backpressure interact?
87. How do you design idempotent consumers and handle duplicate events?
88. Compare at-most-once, at-least-once, and exactly-once claims.
89. How do you choose partition keys and prevent hot partitions?
90. Explain leader election, quorum, replication, and split-brain risk.
91. How do you safely evolve an API or event schema?
92. Design multi-region failover and explain RTO, RPO, and data consistency.
93. How do you prevent retry storms and cascading failures?
94. What makes a service stateless, and where does its state actually go?
95. How would you capacity-plan a nation-scale healthcare workload?

## Kafka and event-driven systems

96. Explain brokers, topics, partitions, replicas, leaders, producers, and consumer groups.
97. How does Kafka preserve ordering, and where is ordering not guaranteed?
98. How do offsets, commits, rebalancing, and consumer lag work?
99. A consumer group is falling behind. Diagnose and remediate it.
100. How do you choose partition count and replication factor?
101. How would you implement retry topics, dead-letter topics, and poison-message handling?
102. Explain producer acknowledgements, idempotent producers, and transactions.
103. How do you secure Kafka using TLS, authentication, authorization, and secret rotation?
104. What metrics and alerts are essential for Kafka?
105. Compare Kafka with Pub/Sub and explain transferable experience honestly.

## CI/CD, GitOps, and supply-chain security

106. Design a pipeline from pull request through production and rollback.
107. How do you promote an immutable artifact rather than rebuilding per environment?
108. Compare Jenkins, GitHub Actions, GitLab CI, Cloud Build, and Harness.
109. How do you secure CI/CD identities using short-lived credentials?
110. Explain branch protection, code owners, approvals, and separation of duties.
111. Design canary delivery with automated rollback based on technical and business metrics.
112. What happens when a manual `kubectl` change conflicts with Argo CD?
113. How do you manage Helm values without configuration drift?
114. Explain SBOMs, signing, provenance, vulnerability scanning, and admission enforcement.
115. A registry becomes unavailable halfway through deployment. Stabilize the system.

## Observability, SRE, and production support

116. Define SLI, SLO, SLA, error budget, and burn rate.
117. Design SLIs for a healthcare data-ingestion service.
118. Explain RED, USE, and the four golden signals.
119. How do metrics, logs, traces, profiles, and events complement each other?
120. Design OpenTelemetry context propagation across asynchronous services.
121. How would you prevent high-cardinality metric failure?
122. How do you choose trace-sampling strategies?
123. An API's p95 latency rises from 200 ms to 2 seconds. Investigate it.
124. A Kubernetes service has intermittent 5xx only during traffic spikes. Investigate it.
125. Kafka lag rises while CPU is low. What do you inspect?
126. How do you design actionable alerts with owners and runbooks?
127. Describe incident-command roles and communication during a major outage.
128. What makes a blameless RCA technically useful rather than ceremonial?
129. How do you reduce operational toil systematically?
130. Design a game day for regional failure.

## Security and healthcare considerations

131. Apply least privilege across cloud IAM, Kubernetes RBAC, pipelines, and applications.
132. How do you protect secrets in code, images, CI, state, logs, and runtime memory?
133. Explain encryption in transit, at rest, and application-level encryption.
134. How would you isolate tenants and sensitive healthcare data?
135. What audit evidence should a healthcare platform retain?
136. How do you minimize sensitive data in logs, traces, prompts, and test environments?
137. Design safe break-glass access with approval and audit trails.
138. How do threat modeling and secure design reviews fit into delivery?
139. How do you prioritize vulnerabilities using exploitability and business context?
140. How would you respond to suspected credential compromise?

## AI, LLM, RAG, agents, and MCP

141. Explain tokens, context windows, embeddings, temperature, and hallucinations.
142. Design an enterprise RAG pipeline from ingestion through grounded response.
143. How do chunk size, overlap, metadata, and hybrid retrieval affect quality?
144. How do you evaluate retrieval separately from generation?
145. Compare RAG, fine-tuning, prompt engineering, and tool use.
146. Design an AI agent that automates platform operations without unsafe autonomy.
147. What are prompt injection, indirect injection, data leakage, and excessive agency?
148. How do allowlists, human approval, sandboxing, and least privilege constrain tools?
149. Explain MCP servers, clients, tools, resources, authentication, and trust boundaries.
150. How would you observably operate an LLM service: quality, latency, errors, tokens, and cost?
151. Design fallback behavior for model-provider failure or quota exhaustion.
152. How do you version and test prompts, retrieval configuration, and evaluation datasets?
153. When would you self-host a model on Kubernetes instead of using a managed API?
154. How would you prevent patient or customer data from leaking through an LLM workflow?
155. Where could AI-assisted automation improve platform operations without replacing deterministic controls?
