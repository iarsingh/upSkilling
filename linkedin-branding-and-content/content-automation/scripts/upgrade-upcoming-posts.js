const fs = require("fs");
const path = require("path");
const { root } = require("../src/config");
const { createImage } = require("../src/image");

const calendarPath = path.join(root, "content-calendar.json");

const upgrades = {
  "2026-07-11-python": {
    title: "Python API health monitoring",
    imageTitle: "Python API Health Monitoring",
    imageSubtitle: "Timeouts, retries, signals, and clear status reports",
    text: `🟢 Python API health monitoring is not just a "status code checker".

Day 22/60 of my Python Automation Series.

In real DevOps, SRE, and MLOps work, a useful health monitor should answer one question clearly:

"Is this service healthy enough for users, or should someone investigate now?"

Here is the pattern I would use:

✅ Check the basics
1. HTTP status code
2. Response time
3. Expected response body or schema
4. TLS/certificate validity
5. Dependency endpoint availability

⚙️ Add production behavior
1. Timeout every request.
2. Retry only safe failures.
3. Log the reason, not just "failed".
4. Track latency trend, not only up/down.
5. Send alerts only when the signal is actionable.

🧠 Example:
If an API returns 200 but latency jumps from 200 ms to 4 seconds, users may already feel the issue.
A good monitor catches that before the incident call starts.

My learning note:
Small Python scripts become powerful when they behave like engineering tools: predictable, observable, and safe to run repeatedly.

What would you include in an API health check before trusting it in production?

#Python #DevOps #SRE #CloudComputing #Automation`
  },
  "2026-07-13-k8s": {
    title: "Ingress troubleshooting for production applications",
    imageTitle: "Kubernetes Ingress Troubleshooting",
    imageSubtitle: "DNS to controller to service to pod",
    text: `🚦 Ingress issues are rarely "just an Ingress issue".

Day 24/60 of my Kubernetes Series.

When an application is unreachable through Ingress, I like to debug it as a traffic path, not as a single YAML file.

My practical workflow:

1. 🌐 DNS
Is the hostname resolving to the expected load balancer IP?

2. 🧭 Load balancer
Is the external LB healthy, listening on the right ports, and pointing to the ingress controller?

3. 🚪 Ingress controller
Are controller pods running, watching the right IngressClass, and showing useful events?

4. 🧩 Ingress resource
Do host, path, TLS secret, annotations, and backend service name match the intended route?

5. 🔁 Service and endpoints
Does the Service have endpoints? If endpoints are empty, the problem is usually labels or pod readiness.

6. 📦 Pod
Are readiness probes passing? Are application ports and container ports aligned?

The mistake I try to avoid:
Changing annotations randomly before proving where traffic stops.

Good troubleshooting is not magic.
It is a calm path from DNS to pod.

Which Ingress issue has cost you the most time: DNS, TLS, annotations, service endpoints, or controller config?

#Kubernetes #DevOps #PlatformEngineering #CloudNative`
  },
  "2026-07-14-mlops": {
    title: "Rollback strategy for bad model releases",
    imageTitle: "MLOps Rollback Strategy",
    imageSubtitle: "Bad model releases need product-safe recovery paths",
    text: `🔁 A model rollback is not the same as an application rollback.

Day 25/60 of my MLOps Series.

In normal software, rollback often means deploying the previous container image.
In MLOps, the failure can come from model weights, features, data, thresholds, prompts, or serving logic.

A practical rollback plan should include:

1. 🧾 Version everything
Model version, feature pipeline version, dataset snapshot, container image, config, and approval metadata.

2. 🚦 Define release gates
Latency, error rate, drift signal, business metric, and manual approval before full rollout.

3. 🧪 Use canary or shadow mode
Compare the new model against production traffic before exposing it fully.

4. 🧯 Keep the previous model warm
Rollback is faster when the last known-good model is already deployable.

5. 📉 Monitor business impact
A model can be technically healthy and still make worse decisions.

6. 🧠 Document the trigger
Write down exactly when to rollback: metric threshold, incident severity, or human review signal.

The real goal is not only fast rollback.
The goal is controlled recovery without losing trust in the ML platform.

What rollback trigger would you trust most for an ML model: drift, accuracy drop, latency, business KPI, or human review?

#MLOps #MachineLearning #MLPlatform #DevOps`
  },
  "2026-07-15-python": {
    title: "Python security checks for config files",
    imageTitle: "Python Config Security Checks",
    imageSubtitle: "Find risky config before it reaches CI/CD",
    text: `🔐 Python is very useful for catching risky config before it reaches production.

Day 26/60 of my Python Automation Series.

One practical script idea:
Scan YAML, JSON, ENV, and Terraform variable files for unsafe patterns before CI/CD continues.

Checks I would add:

1. 🕵️ Secret-like values
Keys such as password, token, secret, private_key, api_key.

2. 🌍 Public exposure
0.0.0.0/0, public buckets, open security groups, public load balancers.

3. ⚠️ Unsafe defaults
debug=true, verify_ssl=false, privileged=true, latest image tags.

4. 🧱 Missing required fields
owner, environment, cost_center, service_name, backup_policy.

5. 📦 Kubernetes risk signals
No resource limits, hostPath usage, privileged containers, missing probes.

6. 📊 Clear output
Print file, line, severity, reason, and suggested fix.

The important part:
Do not make the script noisy.
If every warning feels urgent, engineers will ignore all of them.

Good automation should be strict where risk is high and helpful where context matters.

What config mistake would you always block in CI?

#Python #DevOps #CloudSecurity #Automation #PlatformEngineering`
  },
  "2026-07-16-k8s": {
    title: "Helm values structure for repeatable deployments",
    imageTitle: "Helm Values Structure",
    imageSubtitle: "Repeatable deployments start with clean boundaries",
    text: `📦 Helm becomes powerful when values are designed, not dumped.

Day 27/60 of my Kubernetes Series.

A common mistake is putting every environment difference into one large values file until nobody knows what is safe to change.

A cleaner structure:

1. 🧱 base values
Defaults shared across environments: labels, ports, probes, resource shape, common annotations.

2. 🌱 environment overlays
dev, stage, prod differences: replica count, autoscaling, ingress host, resource size, feature flags.

3. 🔐 secret boundaries
Do not store secrets directly in values. Reference External Secrets, Secret Manager, Vault, or sealed secrets.

4. 🚦 operational settings
Probes, PDB, HPA, rollout strategy, tolerations, affinity, and topology spread constraints.

5. 🧪 validation
Run helm lint, helm template, kubeconform, and policy checks before merge.

6. 🧭 ownership
Make it clear which values app teams can change and which values platform teams own.

My rule of thumb:
If changing one value can break production routing, scaling, or security, it deserves review and documentation.

Helm is not just packaging.
It is a contract between application delivery and platform operations.

How do you separate app-owned and platform-owned Helm values?

#Kubernetes #Helm #DevOps #PlatformEngineering #CloudNative`
  },
  "2026-07-17-mlops": {
    title: "Inference latency troubleshooting workflow",
    imageTitle: "Inference Latency Troubleshooting",
    imageSubtitle: "Break latency into network, serving, model, and data paths",
    text: `⏱️ Inference latency troubleshooting needs a timeline, not guesswork.

Day 28/60 of my MLOps Series.

When a model endpoint becomes slow, I split latency into smaller parts:

1. 🌐 Network latency
Client to gateway, gateway to service, service to model server.

2. 🚪 Queue time
Requests waiting because concurrency, workers, CPU, GPU, or autoscaling are not sized well.

3. 🧠 Model execution
Preprocessing, tokenization, feature lookup, model inference, post-processing.

4. 📦 Dependency calls
Feature store, vector DB, object storage, database, third-party API.

5. 📈 Cold starts and scaling
New pods, model loading time, GPU warmup, cache misses.

6. 🔍 Observability
Trace every stage. Metrics alone may show slowness, but traces show where time is spent.

A useful dashboard should show:
- p50, p95, p99 latency
- error rate
- throughput
- queue depth
- pod CPU/memory/GPU
- model version
- dependency latency

The worst debugging pattern is blaming the model first.
Sometimes the model is fine and the feature lookup is the real bottleneck.

Where have you seen inference latency hide most often: model runtime, feature store, vector DB, autoscaling, or network?

#MLOps #MachineLearning #MLPlatform #Observability #DevOps`
  }
};

function markdownFor(item) {
  const imageLine = item.imagePath ? [`image: ${path.relative(path.join(root, "posts"), path.join(root, item.imagePath))}`] : [];
  return [
    "---",
    `date: ${item.date}`,
    `slot: ${item.slot}`,
    `day: ${item.day}`,
    `series: ${item.pillar}`,
    `topic: ${item.topic}`,
    `linkedinProfile: ${item.linkedinProfile}`,
    ...imageLine,
    "status: scheduled",
    "---",
    "",
    item.text
  ].join("\n");
}

const calendar = JSON.parse(fs.readFileSync(calendarPath, "utf8"));

for (const item of calendar.items) {
  const upgrade = upgrades[item.id];
  if (!upgrade) continue;

  const slug = path.basename(item.draftPath, ".md");
  const image = createImage({
    imageTitle: upgrade.imageTitle,
    imageSubtitle: upgrade.imageSubtitle
  }, slug);

  item.topic = upgrade.title;
  item.baseTopic = upgrade.title;
  item.text = upgrade.text;
  item.imagePath = path.relative(root, image.pngPath);

  const draftPath = path.join(root, item.draftPath);
  fs.writeFileSync(draftPath, markdownFor(item), "utf8");
}

fs.writeFileSync(calendarPath, `${JSON.stringify(calendar, null, 2)}\n`, "utf8");
console.log(`Upgraded ${Object.keys(upgrades).length} scheduled LinkedIn posts.`);
