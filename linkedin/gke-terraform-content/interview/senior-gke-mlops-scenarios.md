# Senior GKE MLOps Scenario-Based Interview Questions

These are designed for a 10-year experienced engineer moving toward GKE MLOps, platform engineering, and production ML systems.

## Platform Design

1. Design a production GKE platform for five ML teams. How do you structure projects, clusters, namespaces, IAM, networking, and environments?
2. When would you choose one shared cluster versus one cluster per team or environment?
3. How do you design dev, staging, and production promotion for both infrastructure and model workloads?
4. What GKE resources should be standardized by the platform team and what should application teams own?
5. How would you build a golden path for model serving on GKE?

## Terraform and Infrastructure as Code

6. How do you structure Terraform for a GKE platform across multiple environments?
7. A Terraform plan wants to recreate the GKE cluster. What do you inspect before approving anything?
8. How do you handle Terraform state, locking, drift detection, and emergency changes?
9. How would you migrate a manually created GKE cluster into Terraform management?
10. How do you design reusable Terraform modules without hiding important production settings?

## Networking

11. Explain VPC-native GKE and why secondary IP ranges matter.
12. A pod cannot reach the internet from a private cluster. Walk through your debug flow.
13. How do you expose an internal-only model inference API?
14. How do you secure control-plane access for engineers and CI/CD?
15. A service works inside the cluster but fails from another VPC. What do you check?

## Security and IAM

16. Explain Workload Identity and how it improves GKE security.
17. A pod using Workload Identity gets a 403 from GCS. How do you debug it?
18. How do you prevent teams from deploying privileged containers?
19. How would you enforce image signing and vulnerability policy before workloads run?
20. How do you design least-privilege IAM for model training, serving, and CI/CD?

## Reliability and Operations

21. A model inference service has high latency after a rollout. How do you triage?
22. Pods are pending even though cluster autoscaler is enabled. What do you check?
23. A node upgrade causes downtime for inference workloads. What was missed?
24. How do you design readiness probes for model servers that load large artifacts?
25. What SLOs would you define for online inference, batch inference, and training pipelines?

## MLOps

26. How do you store, version, promote, and roll back model artifacts?
27. How do you deploy multiple model versions safely on GKE?
28. What is your approach to canarying a model when success depends on business metrics?
29. How do you detect data drift and decide whether retraining should happen automatically?
30. Which parts of an ML platform would you run on GKE versus Vertex AI?

## Cost and Capacity

31. GKE costs doubled in one week. What is your investigation path?
32. How do you size node pools for CPU, memory, GPU, and batch workloads?
33. How do you use spot nodes safely for ML workloads?
34. How do you prevent one team from consuming all GPU capacity?
35. Which metrics and labels are required for cost ownership?

## Incident Leadership

36. A production model endpoint starts returning 5xx errors. Lead the incident.
37. A bad model was promoted to production. How do you roll back and prevent recurrence?
38. A Terraform apply partially succeeds and leaves the platform inconsistent. What now?
39. A critical CVE appears in a base image used by all model services. What is your response?
40. After a region issue, how do you rebuild the GKE platform and restore service?

## Strong Answer Pattern

For senior interviews, answer with this structure:

1. Clarify requirements and constraints.
2. Describe the architecture or debug path.
3. Name tradeoffs.
4. Explain operational controls.
5. Close with how you would measure success.

