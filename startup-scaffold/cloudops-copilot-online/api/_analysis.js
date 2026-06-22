"use strict";

const COMMANDS = {
  Kubernetes: [
    "kubectl get pods -n <namespace> -o wide",
    "kubectl describe pod <pod> -n <namespace>",
    "kubectl logs <pod> -n <namespace> --previous",
    "kubectl get events -n <namespace> --sort-by=.lastTimestamp",
    "kubectl rollout history deployment/<deployment> -n <namespace>",
    "kubectl top pods -n <namespace>"
  ],
  GCP: [
    "gcloud logging read '<filter>' --limit=50",
    "gcloud monitoring policies list",
    "gcloud compute backend-services get-health <service>",
    "gcloud container clusters describe <cluster> --region <region>",
    "gcloud projects get-iam-policy <project-id>",
    "gcloud artifacts docker images list <region>-docker.pkg.dev/<project>/<repo>"
  ],
  Terraform: [
    "terraform init",
    "terraform validate",
    "terraform plan",
    "terraform state list"
  ],
  "CI/CD": [
    "Open the failed stage log and identify the first real error",
    "Compare changed environment variables, secrets, and permissions",
    "Validate image digest, manifest, and deployment target",
    "Re-run the failed job only after the root cause is fixed"
  ],
  "MLOps Inference": [
    "Check model server readiness and health endpoints",
    "Compare latency and error rate by model version",
    "Inspect request payload schema drift",
    "Review feature freshness and prediction error rate",
    "Compare current traffic against training and validation distributions"
  ]
};

const SIGNALS = [
  {
    terms: ["crashloopbackoff", "oomkilled", "back-off restarting"],
    finding: "Pod restart pattern detected.",
    cause: "Container crash, memory pressure, failed startup dependency, or bad image rollout.",
    nextStep: "Check pod events, previous logs, resource limits, and the most recent deployment."
  },
  {
    terms: ["imagepullbackoff", "errimagepull", "unauthorized", "manifest unknown"],
    finding: "Image pull or registry authorization issue detected.",
    cause: "Invalid image tag, missing Artifact Registry permission, expired credential, or private registry misconfiguration.",
    nextStep: "Validate image tag, service account permissions, and registry access from the cluster."
  },
  {
    terms: ["timeout", "deadline exceeded", "latency", "slow request"],
    finding: "Latency or timeout symptom detected.",
    cause: "Dependency slowness, saturation, autoscaling lag, network path issue, or overloaded workload.",
    nextStep: "Compare traffic, p95 latency, CPU, memory, connection pools, and dependency latency."
  },
  {
    terms: ["terraform", "plan", "apply", "state lock", "provider"],
    finding: "Infrastructure change signal detected.",
    cause: "Terraform state drift, provider mismatch, missing IAM permission, or unsafe infrastructure change.",
    nextStep: "Review state, provider versions, plan output, and recent infrastructure changes."
  },
  {
    terms: ["5xx", "error rate", "http 500", "unavailable", "internal server error"],
    finding: "Service reliability signal detected.",
    cause: "Recent deployment, dependency failure, bad config, capacity pressure, or upstream outage.",
    nextStep: "Check deployment timeline, error logs, backend health, and dependency dashboards."
  },
  {
    terms: ["permission denied", "forbidden", "403", "rbac", "iam"],
    finding: "Permission failure detected.",
    cause: "Missing IAM role, Kubernetes RBAC binding, workload identity mapping, or secret access.",
    nextStep: "Validate service account bindings, workload identity, namespace RBAC, and secret permissions."
  },
  {
    terms: ["quota", "resource exhausted", "limit exceeded", "insufficient cpu", "insufficient memory"],
    finding: "Capacity or quota pressure detected.",
    cause: "Cluster resource exhaustion, GCP quota limit, HPA lag, or workload requests that cannot be scheduled.",
    nextStep: "Check node capacity, pending pods, quota dashboards, and autoscaler events."
  },
  {
    terms: ["certificate", "tls", "ssl", "x509", "handshake"],
    finding: "TLS or certificate failure detected.",
    cause: "Expired certificate, wrong hostname, missing CA bundle, or service mesh certificate rotation issue.",
    nextStep: "Check certificate expiry, ingress secrets, backend TLS settings, and trust bundle changes."
  },
  {
    terms: ["dns", "nxdomain", "name resolution", "no such host"],
    finding: "DNS resolution failure detected.",
    cause: "Broken service discovery, private DNS misconfiguration, CoreDNS issue, or changed service name.",
    nextStep: "Test DNS from inside the workload namespace and compare service, endpoint, and DNS records."
  },
  {
    terms: ["model drift", "prediction drift", "feature drift", "schema mismatch", "missing feature"],
    finding: "MLOps drift or schema issue detected.",
    cause: "Training-serving skew, stale features, schema change, or model version mismatch.",
    nextStep: "Compare payload schema, feature freshness, model version, and recent data distribution changes."
  }
];

const TYPE_GUIDANCE = {
  Kubernetes: {
    owner: "Platform or service owner",
    dashboard: "GKE workload, pod restarts, events, HPA, and service latency dashboards",
    rollback: "kubectl rollout undo deployment/<deployment> -n <namespace>"
  },
  GCP: {
    owner: "Cloud platform owner",
    dashboard: "Cloud Logging, Cloud Monitoring, load balancer, IAM audit, and GKE dashboards",
    rollback: "Revert the last infrastructure or configuration change after confirming blast radius"
  },
  Terraform: {
    owner: "Infrastructure owner",
    dashboard: "Terraform plan output, state backend, provider version, and IAM audit logs",
    rollback: "Revert the last Terraform change and apply from a reviewed plan"
  },
  "CI/CD": {
    owner: "Release owner",
    dashboard: "Pipeline logs, artifact registry, deployment history, and environment diff",
    rollback: "Promote the last known good artifact or revert the deployment commit"
  },
  "MLOps Inference": {
    owner: "ML platform or model owner",
    dashboard: "Inference latency, error rate, model version, feature freshness, and drift dashboards",
    rollback: "Route traffic back to the previous healthy model version"
  }
};

function analyzeIncident(type = "Kubernetes", rawText = "") {
  const safeType = COMMANDS[type] ? type : "Kubernetes";
  const text = normalizeInput(rawText);
  const lower = text.toLowerCase();
  const matches = SIGNALS.filter((signal) => signal.terms.some((term) => lower.includes(term)));
  const primary = matches[0];

  const causes = matches.length
    ? matches.map((match) => `${match.finding} Likely cause: ${match.cause}`)
    : [
        "Recent deployment or configuration change",
        "Resource saturation or autoscaling lag",
        "Missing permission, secret, network route, or dependency access"
      ];

  const investigation = matches.length
    ? matches.map((match) => match.nextStep)
    : [
        "Separate recent change, resource pressure, dependency failure, and configuration drift.",
        "Find the first timestamp where healthy behavior changed.",
        "Compare failing and healthy workloads or environments."
      ];

  return {
    source: "api",
    type: safeType,
    confidence: confidence(matches.length),
    severity: severity(matches.length, lower),
    summary: buildSummary(safeType, primary),
    owner: TYPE_GUIDANCE[safeType].owner,
    dashboardFocus: TYPE_GUIDANCE[safeType].dashboard,
    causes,
    commands: COMMANDS[safeType],
    investigation,
    evidenceToCollect: evidenceToCollect(safeType),
    customerUpdate: customerUpdate(safeType, primary),
    runbook: runbook(safeType),
    remediation: [
      "Confirm blast radius and affected users before changing the system.",
      "Apply the smallest reversible mitigation first.",
      "Capture before-and-after evidence for the incident record.",
      "Escalate to the owning team when mitigation requires code, data, or permission changes.",
      TYPE_GUIDANCE[safeType].rollback,
      "Convert the final fix into a reusable runbook entry."
    ],
    prevention: [
      "Add alert context for owner, service, environment, deploy version, and dashboard links.",
      "Add release gates for probes, resource limits, rollback readiness, and dependency checks.",
      "Review runbooks after every serious incident and remove stale commands.",
      "Track repeated alert patterns and automate the top recurring investigation steps."
    ],
    postmortemDraft: {
      impact: "Customer or internal impact is pending confirmation.",
      trigger: primary ? primary.finding : "Alert or operator report triggered the investigation.",
      timeline: [
        "T0: Alert received",
        "T1: Initial triage started",
        "T2: Mitigation applied",
        "T3: Follow-up actions created"
      ],
      followUps: [
        "Add missing observability context",
        "Document validated remediation steps",
        "Create or update the runbook",
        "Add a regression check to the release or platform pipeline"
      ]
    }
  };
}

function buildSummary(type, primary) {
  if (!primary) {
    return `${type} incident requires structured triage across recent change, saturation, dependencies, and configuration drift.`;
  }

  return `${type} incident: ${primary.finding} ${primary.nextStep}`;
}

function confidence(matchCount) {
  if (matchCount >= 3) return "high";
  if (matchCount >= 1) return "medium";
  return "low";
}

function severity(matchCount, lowerText) {
  if (lowerText.includes("outage") || lowerText.includes("sev1") || lowerText.includes("major incident")) {
    return "sev1";
  }
  if (matchCount >= 3 || lowerText.includes("customer impact") || lowerText.includes("5xx")) {
    return "sev2";
  }
  if (matchCount >= 1) return "sev3";
  return "needs triage";
}

function evidenceToCollect(type) {
  return [
    `${type} alert payload with timestamp, service, namespace, environment, and owner`,
    "Recent deployment, configuration, infrastructure, and secret changes",
    "Dashboard screenshots or metric values before, during, and after mitigation",
    "Commands executed and exact mitigation result",
    "Customer impact notes and final recovery timestamp"
  ];
}

function customerUpdate(type, primary) {
  const issue = primary ? primary.finding.replace(".", "").toLowerCase() : `${type.toLowerCase()} reliability issue`;
  return `We are investigating a ${issue}. The team is checking recent changes, service health, and dependency signals. We will share the next update after confirming impact and mitigation path.`;
}

function runbook(type) {
  return [
    `Assign incident owner: ${TYPE_GUIDANCE[type].owner}`,
    `Open dashboards: ${TYPE_GUIDANCE[type].dashboard}`,
    "Confirm scope: affected service, users, regions, environments, and start time",
    "Run investigation commands and save the outputs",
    `Mitigate: ${TYPE_GUIDANCE[type].rollback}`,
    "Verify recovery with metrics, logs, and user-facing checks",
    "Create follow-up actions for prevention and automation"
  ];
}

function normalizeInput(value) {
  return String(value || "No incident context provided.").trim().slice(0, 12000);
}

module.exports = { analyzeIncident };
