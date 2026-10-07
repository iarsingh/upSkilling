module.exports = [
  {
    slug: "safe-automation-scripts",
    title: "Python automation scripts that are safe to run.",
    sub: "If a script can delete, it should first tell you what it would delete.",
    hook: "The scariest scripts in any ops repo are the ones that change things on the first run. A few habits make automation safe enough to hand to someone else.",
    slides: [
      {
        type: "list", title: "Five habits",
        items: [
          { h: "Dry-run by default", p: "Changes only happen with --apply." },
          { h: "Idempotent", p: "Running twice gives the same result as once." },
          { h: "Timeouts and retries", p: "Every network call has both, with backoff." },
          { h: "Limited blast radius", p: "--namespace, --limit, explicit targets." },
        ],
      },
      {
        type: "code", title: "The skeleton I start with", lang: "python",
        code: `import argparse, logging, sys

p = argparse.ArgumentParser()
p.add_argument("--apply", action="store_true")
p.add_argument("--limit", type=int, default=10)
args = p.parse_args()
logging.basicConfig(level=logging.INFO)

targets = find_stale_resources()[: args.limit]
for t in targets:
    if args.apply:
        delete(t)
    verb = "deleted" if args.apply else "would delete"
    logging.info("%s %s", verb, t)

sys.exit(0)`,
      },
      { type: "flow", title: "From laptop to schedule", steps: ["Write", "Dry-run in a lab", "Review the output", "--apply with --limit", "Full run", "Schedule in a pipeline"], note: "The scheduled version runs with a service identity, not your credentials." },
      {
        type: "dodont", title: "Script habits",
        do: ["Structured logs", "Non-zero exit on failure", "Confirm the target environment", "Unit-test the selection logic"],
        dont: ["Hard-coded credentials", "Bare except: pass", "Infinite retries", "Acting on \u201call\u201d by default"],
      },
      {
        type: "checklist", title: "Before you share it",
        items: ["--help explains every flag", "Dry-run is the default", "Idempotent on rerun", "Timeouts on every call", "Exit codes documented", "Runs under a least-privilege identity"],
      },
    ],
    takeaway: "Default to dry-run, limit the blast radius, log everything.",
    points: ["--apply to change anything", "Idempotent and time-boxed", "Pipeline identity, not yours"],
    question: "What is the most dangerous script in your team's repo?",
  },
  {
    slug: "health-checks-for-apis-and-kubernetes",
    title: "Health checks for APIs and Kubernetes in Python.",
    sub: "A check without a timeout is just another thing that hangs.",
    hook: "Small Python health checkers are everywhere \u2014 cron jobs, CI gates, smoke tests after deploys. Most of them have no timeout and only check that a port is open.",
    slides: [
      {
        type: "list", title: "What a useful check covers",
        items: [
          { h: "Status and latency", p: "200 OK within a budget, not just a response." },
          { h: "Dependencies", p: "The endpoints the service needs to work." },
          { h: "TLS expiry", p: "Days left on the certificate." },
          { h: "Deployment state", p: "Available replicas vs desired." },
        ],
      },
      {
        type: "code", title: "HTTP with timeouts and retries", lang: "python",
        code: `import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

retry = Retry(total=3, backoff_factor=0.5,
              status_forcelist=[502, 503, 504])
s = requests.Session()
s.mount("https://", HTTPAdapter(max_retries=retry))

r = s.get("https://api.example.com/healthz",
          timeout=(3, 10))
ok = r.ok and r.elapsed.total_seconds() < 1.0`,
      },
      {
        type: "code", title: "Deployment health", lang: "python",
        code: `from kubernetes import client, config

config.load_incluster_config()
apps = client.AppsV1Api()

for d in apps.list_namespaced_deployment("payments").items:
    want = d.spec.replicas or 0
    have = d.status.available_replicas or 0
    if have < want:
        print(f"DEGRADED {d.metadata.name} {have}/{want}")`,
        note: "Run it with a read-only service account scoped to the namespace.",
      },
      {
        type: "table", title: "Exit codes for automation", headers: ["Code", "Meaning"],
        rows: [
          ["0", "Healthy"],
          ["1", "Degraded \u2014 alert"],
          ["2", "Check itself failed"],
        ],
      },
      {
        type: "dodont", title: "Checker habits",
        do: ["Connect and read timeouts", "Separate degraded from broken checker", "Read-only RBAC"],
        dont: ["Checks that only test a port", "No timeout", "Cluster-admin for a health check"],
      },
    ],
    takeaway: "Time-box every call and make the exit code mean something.",
    points: ["Check latency, dependencies, TLS, replicas", "Retries with backoff, bounded", "Read-only identity"],
    question: "What does your post-deploy smoke test actually check?",
  },
  {
    slug: "python-validation-in-ci",
    title: "Python validation scripts in CI.",
    sub: "Catch the mistake in the PR, not in the cluster.",
    hook: "Some checks are too specific for an off-the-shelf linter: your label rules, your image policy, your config conventions. A 30-line Python script in CI can enforce them with file-level feedback.",
    slides: [
      {
        type: "checklist", title: "Good candidates",
        items: ["YAML and JSON parse cleanly", "Required keys and labels present", "No :latest image tags", "Resource requests set", "No plaintext secrets in config"],
      },
      {
        type: "code", title: "Validate manifests", lang: "python",
        code: `import pathlib, sys, yaml

errors = []
for f in pathlib.Path("k8s").rglob("*.yaml"):
    for doc in yaml.safe_load_all(f.read_text()):
        if not doc or doc.get("kind") != "Deployment":
            continue
        spec = doc["spec"]["template"]["spec"]
        for c in spec["containers"]:
            if c["image"].endswith(":latest"):
                errors.append(f"{f}: {c['name']} uses :latest")
            if "resources" not in c:
                errors.append(f"{f}: {c['name']} has no resources")

print("\\n".join(errors))
sys.exit(1 if errors else 0)`,
      },
      {
        type: "code", title: "Annotate the PR", lang: "python",
        code: `# GitHub Actions turns this into an inline comment
print(f"::error file={path},line={line}::{message}")

# Azure DevOps equivalent
print(f"##vso[task.logissue type=error;"
      f"sourcepath={path};linenumber={line}]{message}")`,
        note: "File and line in the output means the developer fixes it without asking you.",
      },
      { type: "flow", title: "Feedback loop", steps: ["Push", "Script runs", "Inline annotations", "Fix", "Green check"], note: "Seconds, not a code-review round trip." },
      {
        type: "dodont", title: "Script habits",
        do: ["yaml.safe_load, never yaml.load", "Report every error, not just the first", "Unit-test with fixture files"],
        dont: ["Regex-parsing YAML", "Silent passes on parse errors", "Checks that only run on main"],
      },
    ],
    takeaway: "Turn team conventions into checks with file-level feedback.",
    points: ["Small scripts for team-specific rules", "safe_load and full error lists", "Annotations instead of review comments"],
    question: "Which convention does your team keep repeating in code review?",
  },
  {
    slug: "reports-cost-inventory-incidents",
    title: "Python reports for cost, inventory and incidents.",
    sub: "Automate the facts. Keep humans on the judgment.",
    hook: "Weekly cost reviews, cluster inventories and incident timelines all follow the same pattern. Automate the collection and formatting, and spend human time on the decisions.",
    slides: [
      { type: "flow", title: "One pattern for every report", steps: ["Collect from APIs", "Normalize", "Enrich with owner tags", "Summarize", "Publish"], note: "Publish where people already look: chat, email or a markdown file in the repo." },
      {
        type: "code", title: "Weekly cost movers", lang: "python",
        code: `import pandas as pd

df = pd.read_csv("billing_export.csv")
df["owner"] = df["labels.owner"].fillna("UNTAGGED")

weekly = (df.groupby(["owner", "week"])["cost"]
            .sum().unstack())
last, prev = weekly.columns[-1], weekly.columns[-2]
weekly["delta_pct"] = (weekly[last] / weekly[prev] - 1) * 100

print(weekly.sort_values("delta_pct", ascending=False)
            .head(5))`,
      },
      {
        type: "table", title: "Reports worth automating", headers: ["Report", "Key content"],
        rows: [
          ["Cloud cost", "By owner, untagged spend, top movers"],
          ["Inventory", "Clusters, versions, end-of-life dates"],
          ["Exposure", "Public IPs, open buckets"],
          ["Incident timeline", "Alerts, deploys, changes in order"],
        ],
      },
      {
        type: "list", title: "Incident summaries",
        items: [
          { h: "Script assembles facts", p: "Alerts, deploys, config changes, in time order." },
          { h: "Human writes the why", p: "Root cause and decisions need judgment." },
          { h: "Links, not copies", p: "Point to dashboards and logs." },
        ],
      },
      {
        type: "dodont", title: "Report habits",
        do: ["Flag untagged resources loudly", "Show week-over-week change", "Keep raw data for audit"],
        dont: ["Reports nobody acts on", "Manual copy-paste steps", "Generated root causes"],
      },
    ],
    takeaway: "Let scripts gather the facts so people can make the calls.",
    points: ["Collect, normalize, enrich, summarize, publish", "Owner tags make cost actionable", "Humans write the why"],
    question: "Which weekly report would you automate first?",
  },
];
