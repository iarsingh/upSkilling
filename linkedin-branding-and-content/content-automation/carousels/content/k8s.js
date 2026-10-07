module.exports = [
  {
    slug: "requests-limits-and-qos",
    title: "Requests, limits and QoS.",
    sub: "Requests are for the scheduler. Limits are for protection.",
    hook: "Most Kubernetes cost and stability problems I see start with copy-pasted resource values. Here is what requests and limits actually do, and how I size a new service.",
    slides: [
      {
        type: "list", title: "What each setting does",
        items: [
          { h: "Request", p: "The scheduler reserves this much on a node." },
          { h: "CPU limit", p: "The container is throttled above it." },
          { h: "Memory limit", p: "The container is OOMKilled above it." },
          { h: "Nothing set", p: "BestEffort: first to be evicted under pressure." },
        ],
      },
      {
        type: "table", title: "QoS classes", headers: ["Class", "When", "Eviction"],
        rows: [
          ["Guaranteed", "requests = limits, every container", "Last"],
          ["Burstable", "Some requests or limits set", "Middle"],
          ["BestEffort", "Nothing set", "First"],
        ],
      },
      {
        type: "dodont", title: "Sizing habits",
        do: ["Set requests from observed p95", "Memory limit = request for steady apps", "Use VPA recommendations as input", "Revisit after big releases"],
        dont: ["1 CPU / 1Gi everywhere", "Tight CPU limits on latency-critical paths", "Memory limit below startup peak", "No requests at all"],
      },
      {
        type: "code", title: "Check before you guess", lang: "bash",
        code: `kubectl top pods -n payments --containers

kubectl get pod api-7d9 -n payments \\
  -o jsonpath='{.status.qosClass}'

kubectl describe pod api-7d9 -n payments \\
  | grep -A4 "Last State"   # OOMKilled?`,
        note: "Throttling shows in container_cpu_cfs_throttled_periods_total, not in kubectl top.",
      },
      { type: "flow", title: "How I size a new service", steps: ["Load test", "Observe p95 usage", "Set requests", "Set memory limit", "Watch throttling + OOMs", "Revisit monthly"], note: "Sizing is a loop, not a one-time YAML edit." },
    ],
    takeaway: "Size from data, then keep watching.",
    points: ["Requests drive scheduling and HPA math", "Memory limits kill, CPU limits throttle", "Know your QoS class"],
    question: "Do you set CPU limits on latency-sensitive services, or only requests?",
  },
  {
    slug: "autoscaling-hpa-vpa-cluster-autoscaler",
    title: "HPA, VPA and Cluster Autoscaler.",
    sub: "Autoscaling is three controllers. Tune them together.",
    hook: "Teams turn on HPA and assume they are autoscaled. Then a spike arrives, pods go Pending, and nobody sized the node pool. Here is how the three controllers fit together.",
    slides: [
      { type: "flow", title: "What happens in a spike", steps: ["Traffic rises", "HPA adds replicas", "Pods go Pending", "Cluster Autoscaler adds a node", "Pods schedule"], note: "HPA utilization is measured against requests. No requests, no meaningful HPA." },
      {
        type: "table", title: "Who does what", headers: ["Controller", "Scales", "Based on"],
        rows: [
          ["HPA", "Replica count", "CPU, memory, custom metrics"],
          ["VPA", "Requests per pod", "Observed usage"],
          ["Cluster Autoscaler", "Nodes", "Unschedulable pods"],
        ],
      },
      {
        type: "list", title: "Where they fight",
        items: [
          { h: "HPA + VPA on CPU", p: "Both react to the same signal. Use VPA in recommend mode." },
          { h: "Node lag", p: "New nodes take minutes. Keep headroom and min replicas." },
          { h: "Scale-down disruption", p: "Protect with PodDisruptionBudgets." },
          { h: "Flapping", p: "Use stabilization windows." },
        ],
      },
      {
        type: "code", title: "HPA with sane behaviour", lang: "yaml",
        code: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
spec:
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target: { type: Utilization, averageUtilization: 70 }
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300`,
        note: "Scale up fast, scale down slowly.",
      },
      {
        type: "checklist", title: "Before you trust autoscaling",
        items: ["Requests on every container", "Min replicas survive a node loss", "PDB on every Deployment", "Scale-up time load-tested", "Alert when maxReplicas is hit", "Node pool max sized for peak"],
      },
    ],
    takeaway: "Pods, requests and nodes scale as one system.",
    points: ["HPA needs requests", "Do not let HPA and VPA fight over CPU", "Load-test the scale-up time"],
    question: "What broke the first time your cluster autoscaled under real load?",
  },
  {
    slug: "probes-pdbs-and-safe-rollouts",
    title: "Probes, PDBs and safe rollouts.",
    sub: "Readiness protects users. Liveness protects the process.",
    hook: "A liveness probe that checks the database can restart your whole fleet during a five-second DB blip. Probes are simple to write and easy to get dangerously wrong.",
    slides: [
      {
        type: "table", title: "Three probes, three questions", headers: ["Probe", "Asks", "On failure"],
        rows: [
          ["Startup", "Finished booting?", "Holds other probes"],
          ["Readiness", "Should it get traffic?", "Removed from endpoints"],
          ["Liveness", "Is it stuck?", "Container restarted"],
        ],
      },
      {
        type: "dodont", title: "Probe design",
        do: ["Readiness checks what serving needs", "Liveness checks only the process", "startupProbe for slow boots", "Timeouts longer than GC pauses"],
        dont: ["Liveness that calls the database", "Same endpoint for both", "1s timeouts on busy JVMs", "Probes that do real work"],
      },
      {
        type: "code", title: "A safe default", lang: "yaml",
        code: `startupProbe:
  httpGet: { path: /healthz, port: 8080 }
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet: { path: /readyz, port: 8080 }
  periodSeconds: 5
livenessProbe:
  httpGet: { path: /healthz, port: 8080 }
  periodSeconds: 10
  failureThreshold: 3`,
      },
      { type: "flow", title: "Pod termination", steps: ["Marked Terminating", "Removed from endpoints", "preStop hook", "SIGTERM", "Grace period", "SIGKILL"], note: "Endpoint removal and SIGTERM race each other. A short preStop sleep avoids dropped requests." },
      {
        type: "list", title: "Rollout settings that matter",
        items: [
          { h: "maxUnavailable: 0", p: "Never drop below desired capacity." },
          { h: "minReadySeconds", p: "Catch pods that crash right after Ready." },
          { h: "PodDisruptionBudget", p: "Limits voluntary disruption during drains." },
          { h: "Grace period", p: "Long enough to finish in-flight work." },
        ],
      },
    ],
    takeaway: "Never let a dependency outage restart your fleet.",
    points: ["Readiness for traffic, liveness for deadlock", "preStop sleep + grace period", "PDB on every service"],
    question: "Have you ever seen a liveness probe cause the outage it was meant to prevent?",
  },
  {
    slug: "debugging-crashloopbackoff-and-imagepullbackoff",
    title: "Debugging CrashLoopBackOff and ImagePullBackOff.",
    sub: "Read the exit code and the events before you read the code.",
    hook: "CrashLoopBackOff is not an error. It is Kubernetes telling you it has given up restarting for a while. The real error is one command away \u2014 if you know which one.",
    slides: [
      { type: "flow", title: "Triage order", steps: ["get pods", "describe pod", "logs --previous", "get events", "debug container"], note: "Most issues are solved by step three." },
      {
        type: "code", title: "The commands", lang: "bash",
        code: `kubectl get pods -n app
kubectl describe pod api-7d9 -n app
kubectl logs api-7d9 -n app --previous
kubectl get events -n app \\
  --sort-by=.lastTimestamp
kubectl debug -it api-7d9 -n app \\
  --image=busybox --target=api`,
        note: "--previous shows the logs of the crashed container, not the new one.",
      },
      {
        type: "table", title: "CrashLoopBackOff causes", headers: ["Signal", "Likely cause"],
        rows: [
          ["Exit 1", "App error \u2014 read previous logs"],
          ["Exit 137 / OOMKilled", "Memory limit too low or leak"],
          ["Exit 127", "Command or binary not found"],
          ["Liveness failures in events", "Probe too strict"],
          ["Crash on boot", "Missing env, config or secret"],
        ],
      },
      {
        type: "list", title: "ImagePullBackOff causes",
        items: [
          { h: "Tag does not exist", p: "Typo, or the build never pushed." },
          { h: "No registry auth", p: "Missing imagePullSecret or workload identity." },
          { h: "No route to registry", p: "Private nodes without NAT or private endpoint." },
          { h: "Platform mismatch", p: "arm64-only image on amd64 nodes." },
        ],
      },
      {
        type: "checklist", title: "After you fix it",
        items: ["Add the case to the runbook", "Alert on restart count", "Pin images by digest", "Validate config in CI", "Test the image on the node arch"],
      },
    ],
    takeaway: "Exit code, previous logs, events. In that order.",
    points: ["CrashLoopBackOff is a symptom", "137 means memory", "Pull errors are usually auth or network"],
    question: "What is the strangest root cause you found behind a CrashLoopBackOff?",
  },
  {
    slug: "namespaces-rbac-multi-team",
    title: "Namespaces and RBAC for multi-team clusters.",
    sub: "A namespace is a boundary only if RBAC, quotas and policy agree.",
    hook: "Giving every team a namespace feels like tenancy. Without RBAC, quotas and network policy it is just a label. These are the controls I check first on a shared cluster.",
    slides: [
      {
        type: "list", title: "Namespace design",
        items: [
          { h: "One per team and environment", p: "payments-dev, payments-prod \u2014 clear ownership." },
          { h: "ResourceQuota", p: "One team cannot starve the cluster." },
          { h: "LimitRange", p: "Sensible defaults when a pod sets nothing." },
          { h: "Owner labels", p: "owner and cost-center on every namespace." },
        ],
      },
      {
        type: "dodont", title: "RBAC mistakes",
        do: ["Role over ClusterRole", "Bind groups from your IdP", "One deploy identity per namespace", "automountServiceAccountToken: false"],
        dont: ["cluster-admin for CI", "Wildcard verbs and resources", "Broad get/list on secrets", "Default SA tokens everywhere"],
      },
      {
        type: "table", title: "Who gets what", headers: ["Who", "Access"],
        rows: [
          ["Developers", "View + logs in own namespace"],
          ["CI deployer", "Apply in own namespace only"],
          ["Platform team", "Admin via audited break-glass"],
          ["Bots and agents", "Read-only unless reviewed"],
        ],
      },
      {
        type: "code", title: "Audit in two commands", lang: "bash",
        code: `kubectl auth can-i --list -n payments \\
  --as=system:serviceaccount:payments:ci

kubectl get clusterrolebindings -o wide \\
  | grep cluster-admin`,
        note: "Run this quarterly. Bindings only ever grow.",
      },
      {
        type: "checklist", title: "Shared cluster baseline",
        items: ["Quota and LimitRange per namespace", "Default-deny NetworkPolicy", "No cluster-admin bindings for CI", "Secrets readable only by workloads", "Pod Security Admission: restricted", "Audit logs shipped off-cluster"],
      },
    ],
    takeaway: "Tenancy is quotas, RBAC and network policy together.",
    points: ["Namespace per team and env", "Least-privilege, group-based RBAC", "Audit bindings regularly"],
    question: "Who has cluster-admin in your cluster right now \u2014 and do you know why?",
  },
  {
    slug: "services-ingress-networkpolicy",
    title: "Services, Ingress and NetworkPolicy.",
    sub: "Most ingress bugs are a label or a port mismatch.",
    hook: "When a request does not reach a pod, it has failed at one of six hops. Walking them in order is faster than guessing \u2014 and usually ends at a selector or targetPort typo.",
    slides: [
      {
        type: "list", title: "Service discovery basics",
        items: [
          { h: "ClusterIP + DNS", p: "api.payments.svc.cluster.local resolves to a stable IP." },
          { h: "EndpointSlices", p: "The ready pods behind the Service." },
          { h: "Headless Service", p: "DNS returns pod IPs directly, used by StatefulSets." },
          { h: "Selector", p: "Labels must match the pod template exactly." },
        ],
      },
      { type: "flow", title: "The request path", steps: ["DNS", "Load balancer", "Ingress controller", "Service", "EndpointSlice", "Pod"], note: "Debug in this order. Each hop has one command that proves it works." },
      {
        type: "checklist", title: "Ingress troubleshooting",
        items: ["DNS resolves to the LB address", "TLS secret exists and is valid", "ingressClassName matches controller", "Host and path rules match", "Service selector matches pod labels", "targetPort matches containerPort", "Pods are Ready", "Controller logs are clean"],
      },
      {
        type: "code", title: "Default deny, then allow", lang: "yaml",
        code: `kind: NetworkPolicy
apiVersion: networking.k8s.io/v1
metadata: { name: default-deny, namespace: payments }
spec:
  podSelector: {}
  policyTypes: [Ingress]
---
kind: NetworkPolicy
apiVersion: networking.k8s.io/v1
metadata: { name: allow-ingress-controller, namespace: payments }
spec:
  podSelector: { matchLabels: { app: api } }
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: ingress-nginx`,
      },
      {
        type: "dodont", title: "NetworkPolicy gotchas",
        do: ["Start with default-deny per namespace", "Allow DNS egress explicitly", "Test with a throwaway pod"],
        dont: ["Assume your CNI enforces policy", "Deny egress and forget kube-dns", "Allow all from every namespace"],
      },
    ],
    takeaway: "Walk the hops in order. Check labels and ports first.",
    points: ["Six hops from DNS to pod", "Selectors and targetPorts break most often", "Default-deny, then allow"],
    question: "Which hop has cost you the most debugging time?",
  },
  {
    slug: "secrets-management-patterns",
    title: "Secrets management patterns.",
    sub: "The vault is the source of truth. The cluster only borrows.",
    hook: "A Kubernetes Secret is base64, not encryption. Here are the patterns I compare when a platform needs real secret management \u2014 and the mistakes that leak credentials anyway.",
    slides: [
      { type: "quote", label: "Start here", text: "Base64 is encoding, not encryption.", sub: "Anyone who can read the Secret object can read the secret." },
      {
        type: "table", title: "Options compared", headers: ["Pattern", "How it works"],
        rows: [
          ["Native Secret + etcd encryption", "Simple; still lives in the cluster"],
          ["External Secrets Operator", "Syncs from Key Vault / Secret Manager"],
          ["Secrets Store CSI driver", "Mounts from the vault as files"],
          ["Sealed Secrets / SOPS", "Encrypted values safe to keep in Git"],
        ],
      },
      { type: "flow", title: "A pattern I like", steps: ["Cloud vault", "Workload identity", "External Secrets", "K8s Secret", "Pod volume"], note: "No static cloud credentials in the cluster. Rotation happens in the vault." },
      {
        type: "dodont", title: "Leaks that still happen",
        do: ["Workload identity, not key files", "Mount as volumes so rotation lands", "Restrict get/list on secrets", "Scan repos and images for secrets"],
        dont: ["Secrets in Helm values in Git", "Printing env vars in logs", "Long-lived service account keys", "One secret shared by every app"],
      },
      {
        type: "checklist", title: "Rotation readiness",
        items: ["Every secret has an owner", "Rotation is automated or calendared", "Apps reload without redeploy", "Old versions disabled after rotation", "Access to secrets is audited"],
      },
    ],
    takeaway: "Keep secrets in the vault, identities in the cluster.",
    points: ["Base64 is not protection", "Workload identity over static keys", "Plan rotation before you need it"],
    question: "How long would it take you to rotate every production secret today?",
  },
  {
    slug: "helm-upgrades-production-checklist",
    title: "Helm, cluster upgrades and the production checklist.",
    sub: "Boring upgrades are designed, not lucky.",
    hook: "Cluster upgrades are where weak Helm charts, missing PDBs and deprecated APIs all show up at once. This is the structure and checklist I use to keep them boring.",
    slides: [
      {
        type: "list", title: "Helm values that scale",
        items: [
          { h: "Sane defaults", p: "values.yaml works for most environments." },
          { h: "Small overrides", p: "values-prod.yaml holds only differences." },
          { h: "values.schema.json", p: "Fail fast on typos and wrong types." },
          { h: "No secrets", p: "Reference them; never inline them." },
        ],
      },
      {
        type: "code", title: "Deploy and roll back", lang: "bash",
        code: `helm upgrade --install api ./chart \\
  -f values.yaml -f values-prod.yaml \\
  --atomic --wait --timeout 10m

helm history api
helm rollback api 12`,
        note: "--atomic rolls back automatically if the release fails.",
      },
      { type: "flow", title: "Node pool upgrade", steps: ["Check deprecated APIs", "Upgrade control plane", "Surge or blue/green node pool", "PDBs respected", "Verify workloads", "Remove old pool"], note: "Control planes move one minor version at a time. Plan the path." },
      {
        type: "dodont", title: "Upgrade habits",
        do: ["Upgrade lower environments first", "Scan for removed APIs", "Use maintenance windows", "Keep a rollback node pool"],
        dont: ["Skip minor versions", "PDB minAvailable = replicas", "Upgrade during a release", "Ignore deprecation warnings"],
      },
      {
        type: "checklist", title: "Production checklist",
        items: ["Requests and limits set", "Probes configured", "PDB defined", "2+ replicas across zones", "NetworkPolicy applied", "Runs as non-root", "Image pinned by digest", "Metrics, logs and alerts", "Rollback tested"],
      },
    ],
    takeaway: "Structure the chart, rehearse the upgrade, check the list.",
    points: ["Small env overrides, schema-validated values", "--atomic releases with history", "Upgrade one minor version at a time"],
    question: "What is on your production checklist that is not on mine?",
  },
];
