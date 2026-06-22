const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const {
  ollamaHost,
  ollamaModel,
  ollamaTimeoutMs,
  videosDir,
  youtubeDefaultTopic,
  timezone
} = require("./config");

function argValue(name, fallback = "") {
  const direct = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (direct) return direct.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index !== -1 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || "youtube-video";
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeDrawtext(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/:/g, "\\:")
    .replace(/'/g, "\\'")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]");
}

function wrapText(text, maxChars, maxLines = 5) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);
  return lines.slice(0, maxLines);
}

function formatSrtTime(seconds) {
  const whole = Math.max(0, Math.floor(seconds));
  const ms = Math.round((seconds - whole) * 1000);
  const hh = String(Math.floor(whole / 3600)).padStart(2, "0");
  const mm = String(Math.floor((whole % 3600) / 60)).padStart(2, "0");
  const ss = String(whole % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss},${String(ms).padStart(3, "0")}`;
}

function currentDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function commandExists(command) {
  try {
    execFileSync("sh", ["-lc", `command -v ${command}`], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

async function generateWithOllama(topic) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ollamaTimeoutMs);
  const prompt = [
    "Create a short YouTube educational video package for an ML Platform and DevOps audience.",
    "Return valid JSON only.",
    "Fields:",
    "title: 55 characters or less",
    "description: 2 short paragraphs plus relevant hashtags",
    "tags: array of 8 to 12 concise tags",
    "thumbnailTitle: 4 to 7 words",
    "scenes: array of exactly 6 scenes",
    "Each scene must include title, subtitle, and narration.",
    "The narration should be conversational, practical, and total about 90 to 130 seconds.",
    "Avoid emojis and avoid exaggerated claims.",
    "",
    `Topic: ${topic}`
  ].join("\n");

  try {
    const response = await fetch(`${ollamaHost}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: ollamaModel,
        prompt,
        stream: false,
        format: "json",
        options: {
          temperature: 0.7,
          num_predict: 1200
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return JSON.parse(data.response);
  } finally {
    clearTimeout(timeout);
  }
}

function fallbackPackage(topic) {
  const lower = topic.toLowerCase();
  const base = {
    description: [
      `A practical technical walkthrough of ${topic}.`,
      "Built for DevOps, MLOps, platform engineering, Kubernetes, and cloud engineers who want production-oriented learning.\n\n#DevOps #MLOps #Kubernetes #GCP #PlatformEngineering"
    ].join("\n\n"),
    tags: ["DevOps", "MLOps", "Kubernetes", "GCP", "Platform Engineering", "Cloud Engineering", "SRE", "CI/CD"]
  };

  if (lower.includes("autoscal")) {
    return {
      ...base,
      title: "GKE Autoscaling Explained",
      thumbnailTitle: "GKE Autoscaling",
      tags: [...base.tags, "HPA", "VPA", "Cluster Autoscaler"],
      scenes: [
        {
          title: "Three autoscalers",
          subtitle: "HPA, VPA, and Cluster Autoscaler solve different problems",
          narration: "GKE autoscaling is easier to reason about when you separate the responsibilities. HPA changes replica count, VPA recommends or adjusts pod resources, and Cluster Autoscaler changes node capacity."
        },
        {
          title: "HPA scales pods",
          subtitle: "Use CPU, memory, or custom metrics",
          narration: "Horizontal Pod Autoscaler watches metrics and changes the number of pod replicas. It is best for stateless services where adding replicas reduces pressure on each pod."
        },
        {
          title: "VPA sizes pods",
          subtitle: "Right-size requests before tuning replicas",
          narration: "Vertical Pod Autoscaler helps choose CPU and memory requests. Bad requests can make HPA unstable, so resource sizing and replica scaling should be designed together."
        },
        {
          title: "Nodes follow pods",
          subtitle: "Cluster Autoscaler adds capacity when pods cannot schedule",
          narration: "Cluster Autoscaler does not scale your application directly. It watches pending pods and adds nodes when the scheduler cannot place workloads because of resource limits."
        },
        {
          title: "Production signals",
          subtitle: "Watch latency, saturation, pending pods, and cost",
          narration: "Do not tune autoscaling only from CPU graphs. Track p95 latency, queue depth, pending pods, node utilization, and cloud cost during traffic spikes."
        },
        {
          title: "Safe design",
          subtitle: "Set requests, limits, budgets, and cooldowns deliberately",
          narration: "A stable setup starts with realistic requests, sensible limits, pod disruption budgets, startup probes, and scaling policies that avoid aggressive oscillation."
        }
      ]
    };
  }

  if (lower.includes("terraform")) {
    return {
      ...base,
      title: "Terraform CI/CD Pipeline",
      thumbnailTitle: "Terraform CI/CD",
      tags: [...base.tags, "Terraform", "Infrastructure as Code"],
      scenes: [
        {
          title: "Pipeline goal",
          subtitle: "Make infrastructure changes reviewable and repeatable",
          narration: "A Terraform CI/CD pipeline should make infrastructure changes predictable. The goal is not just automation, but review, validation, and controlled promotion."
        },
        {
          title: "Plan before apply",
          subtitle: "Every pull request should produce a readable plan",
          narration: "Start with formatting, validation, security checks, and terraform plan on every pull request. Reviewers need to see exactly what infrastructure will change."
        },
        {
          title: "Remote state",
          subtitle: "Use locking and separate environments",
          narration: "Remote state with locking prevents conflicting updates. Keep dev, staging, and production state separated so experiments do not touch production resources."
        },
        {
          title: "Policy checks",
          subtitle: "Catch risky changes before approval",
          narration: "Add checks for public buckets, open firewall rules, expensive machine types, and missing labels. Policy gates are useful because humans miss repetitive risk."
        },
        {
          title: "Controlled apply",
          subtitle: "Apply from protected branches with approvals",
          narration: "Production apply should run from a protected branch or release workflow. Use approvals, service accounts, and audit logs so every change has ownership."
        },
        {
          title: "Rollback reality",
          subtitle: "Infrastructure rollback needs a tested recovery plan",
          narration: "Terraform can reverse some changes, but not every cloud operation is safely reversible. Keep backups, state history, and a documented recovery plan."
        }
      ]
    };
  }

  if (lower.includes("monitor") || lower.includes("observability") || lower.includes("drift")) {
    return {
      ...base,
      title: "MLOps Monitoring Signals",
      thumbnailTitle: "MLOps Monitoring",
      tags: [...base.tags, "Model Monitoring", "Data Drift", "Observability"],
      scenes: [
        {
          title: "Monitoring layers",
          subtitle: "Track service, data, and model behavior together",
          narration: "MLOps monitoring needs more than service uptime. You need platform metrics, data quality checks, model performance, and business impact signals together."
        },
        {
          title: "Service health",
          subtitle: "Latency, errors, saturation, and throughput",
          narration: "Start with classic SRE signals: latency, traffic, errors, and saturation. If the model API is unhealthy, model quality metrics will not tell the full story."
        },
        {
          title: "Data quality",
          subtitle: "Freshness, schema, missing values, and outliers",
          narration: "Production data can fail quietly. Monitor freshness, schema changes, null rates, category shifts, and outliers before blaming the model."
        },
        {
          title: "Drift signals",
          subtitle: "Compare live traffic against training baselines",
          narration: "Data drift compares production inputs with historical baselines. It does not always mean the model is wrong, but it tells you the operating environment changed."
        },
        {
          title: "Outcome feedback",
          subtitle: "Measure accuracy when labels arrive",
          narration: "When labels arrive later, connect prediction logs to actual outcomes. This is where you can detect concept drift and decide whether retraining is needed."
        },
        {
          title: "Action plan",
          subtitle: "Alerts must map to runbooks and owners",
          narration: "A useful alert tells the team what changed, why it matters, who owns it, and what action to take. Monitoring without runbooks becomes dashboard decoration."
        }
      ]
    };
  }

  if (lower.includes("gitops") || lower.includes("argocd")) {
    return {
      ...base,
      title: "GitOps With ArgoCD",
      thumbnailTitle: "GitOps ArgoCD",
      tags: [...base.tags, "GitOps", "ArgoCD"],
      scenes: [
        {
          title: "Git as source",
          subtitle: "Desired state lives in version control",
          narration: "GitOps starts with a simple rule: Git is the source of truth for desired state. Clusters should converge toward what is reviewed and merged."
        },
        {
          title: "ArgoCD loop",
          subtitle: "Detect drift and synchronize safely",
          narration: "ArgoCD compares live cluster state with Git state. When drift appears, it can alert, show the diff, or synchronize based on your policy."
        },
        {
          title: "App structure",
          subtitle: "Separate base manifests and environment overlays",
          narration: "A maintainable GitOps repo separates reusable base manifests from environment overlays. This keeps dev, staging, and production differences explicit."
        },
        {
          title: "Promotion flow",
          subtitle: "Move versions through environments with pull requests",
          narration: "Promote versions by changing image tags or Helm values through pull requests. That gives you review, history, and rollback points."
        },
        {
          title: "Production guardrails",
          subtitle: "Use health checks, sync waves, and RBAC",
          narration: "Production GitOps needs guardrails. Use health checks, sync waves, project boundaries, RBAC, and manual approval for risky workloads."
        },
        {
          title: "Rollback path",
          subtitle: "Revert Git and let the cluster converge",
          narration: "The clean rollback path is often a Git revert. ArgoCD then applies the previous desired state and keeps the operational story simple."
        }
      ]
    };
  }

  if (lower.includes("deploy") || lower.includes("model")) {
    return {
      ...base,
      title: "Model Deployment On Kubernetes",
      thumbnailTitle: "Model Deployment",
      tags: [...base.tags, "Model Serving", "FastAPI", "ML Platform"],
      scenes: [
        {
          title: "Serving contract",
          subtitle: "Expose predict, health, and metadata endpoints",
          narration: "A production model service needs more than a predict endpoint. Add health checks, readiness checks, version metadata, and clear error responses."
        },
        {
          title: "Container image",
          subtitle: "Package model, code, and dependencies together",
          narration: "The container image should contain the serving code, runtime dependencies, and a versioned model artifact or a reliable artifact download path."
        },
        {
          title: "Kubernetes basics",
          subtitle: "Requests, limits, probes, service, and rollout strategy",
          narration: "Kubernetes deployment quality depends on requests, limits, probes, service routing, and rollout settings. These details decide how failures behave."
        },
        {
          title: "Release safety",
          subtitle: "Use canary, shadow, or blue-green rollout patterns",
          narration: "Do not send all production traffic to a new model immediately. Use canary, shadow, or blue-green deployment to compare behavior safely."
        },
        {
          title: "Observability",
          subtitle: "Log inputs responsibly and measure prediction behavior",
          narration: "Track latency, errors, model version, input shape, output distribution, and business metrics. Avoid logging sensitive raw data unless it is explicitly approved."
        },
        {
          title: "Promotion gates",
          subtitle: "Tie deployment to evaluation and rollback rules",
          narration: "A mature platform connects model evaluation, approval, deployment, monitoring, and rollback. That is what turns model serving into real MLOps."
        }
      ]
    };
  }

  return {
    ...base,
    title: "Production MLOps Explained",
    thumbnailTitle: "Production MLOps",
    scenes: [
      {
        title: "Technical goal",
        subtitle: "Turn the topic into an operational workflow",
        narration: `This video explains ${topic} from a production engineering perspective, focusing on reliability, automation, observability, and release safety.`
      },
      {
        title: "Core components",
        subtitle: "Identify services, infrastructure, and ownership",
        narration: "Start by naming the components involved, who owns them, and what happens when one component fails."
      },
      {
        title: "Automation path",
        subtitle: "Make repeatable steps part of CI/CD",
        narration: "The next step is automation. Repeatable checks, deployment steps, and validation rules should run consistently in the delivery pipeline."
      },
      {
        title: "Observability",
        subtitle: "Measure health, quality, and user impact",
        narration: "Production systems need metrics, logs, traces, and meaningful alerts that map to user impact and team action."
      },
      {
        title: "Risk controls",
        subtitle: "Use approvals, rollback, and policy gates",
        narration: "Risk controls help teams move quickly without losing safety. Use approvals, rollback paths, policy checks, and audit history."
      },
      {
        title: "Practice project",
        subtitle: "Build it locally before scaling to cloud",
        narration: "A good way to learn is to build the workflow locally, then move it to cloud infrastructure with the same operational principles."
      }
    ]
  };
}

function normalizePackage(raw, topic) {
  const fallback = fallbackPackage(topic);
  const scenes = Array.isArray(raw.scenes) ? raw.scenes : [];

  return {
    title: String(raw.title || fallback.title).trim().slice(0, 90),
    description: String(raw.description || fallback.description).trim(),
    tags: Array.isArray(raw.tags) && raw.tags.length ? raw.tags.map(String).slice(0, 15) : fallback.tags,
    thumbnailTitle: String(raw.thumbnailTitle || raw.title || fallback.thumbnailTitle).trim(),
    scenes: scenes.length
      ? scenes.slice(0, 8).map((scene, index) => ({
          title: String(scene.title || `Scene ${index + 1}`).trim(),
          subtitle: String(scene.subtitle || "").trim(),
          narration: String(scene.narration || scene.subtitle || scene.title || "").trim()
        })).filter((scene) => scene.narration)
      : fallback.scenes
  };
}

async function createVideoPackage(topic) {
  try {
    return normalizePackage(await generateWithOllama(topic), topic);
  } catch (error) {
    const video = fallbackPackage(topic);
    video.source = `fallback (${error.message})`;
    return video;
  }
}

function createSlideSvg(scene, index, total, outputDir) {
  const titleLines = wrapText(scene.title, 25, 3);
  const subtitleLines = wrapText(scene.subtitle, 45, 4);
  const titleText = titleLines.map((line, lineIndex) => {
    return `<text x="132" y="${330 + lineIndex * 78}" class="title">${escapeXml(line)}</text>`;
  }).join("\n");
  const subtitleStart = 330 + titleLines.length * 78 + 42;
  const subtitleText = subtitleLines.map((line, lineIndex) => {
    return `<text x="136" y="${subtitleStart + lineIndex * 44}" class="subtitle">${escapeXml(line)}</text>`;
  }).join("\n");
  const slidePath = path.join(outputDir, `slide-${String(index + 1).padStart(2, "0")}.svg`);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#07111f"/>
      <stop offset="46%" stop-color="#0f5132"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <style>
      .eyebrow { font: 700 34px Arial, sans-serif; fill: #bbf7d0; letter-spacing: 3px; }
      .title { font: 800 72px Arial, sans-serif; fill: #f8fafc; }
      .subtitle { font: 500 36px Arial, sans-serif; fill: #e2e8f0; }
      .footer { font: 700 28px Arial, sans-serif; fill: #fef3c7; }
      .count { font: 700 30px Arial, sans-serif; fill: #dcfce7; }
    </style>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg)"/>
  <rect x="86" y="86" width="1748" height="908" rx="42" fill="#020617" opacity="0.46"/>
  <rect x="132" y="142" width="260" height="10" rx="5" fill="#22c55e"/>
  <text x="132" y="220" class="eyebrow">MLOPS PRACTICE NOTE</text>
  ${titleText}
  ${subtitleText}
  <text x="132" y="910" class="footer">Akhilesh Ranjan Singh | ML Platform &amp; DevOps</text>
  <text x="1690" y="910" class="count">${index + 1}/${total}</text>
</svg>`;

  fs.writeFileSync(slidePath, svg, "utf8");
  return slidePath;
}

function convertSlide(svgPath) {
  const pngPath = svgPath.replace(/\.svg$/, ".png");
  execFileSync("sips", ["-s", "format", "png", svgPath, "--out", pngPath], { stdio: "ignore" });
  return pngPath;
}

function drawTextFilter(text, x, y, size, color = "white") {
  return `drawtext=text='${escapeDrawtext(text)}':x=${x}:y=${y}:fontcolor=${color}:fontsize=${size}`;
}

function createSlidePng(scene, index, total, outputDir) {
  if (!commandExists("ffmpeg")) {
    throw new Error("ffmpeg is required to render slide images. Install ffmpeg, then rerun npm run youtube:video.");
  }

  const pngPath = path.join(outputDir, `slide-${String(index + 1).padStart(2, "0")}.png`);
  const titleLines = wrapText(scene.title, 25, 3);
  const subtitleLines = wrapText(scene.subtitle, 45, 4);
  const filters = [
    "drawbox=x=0:y=0:w=1920:h=1080:color=0x07111f:t=fill",
    "drawbox=x=0:y=0:w=1920:h=1080:color=0x0f5132@0.45:t=fill",
    "drawbox=x=86:y=86:w=1748:h=908:color=0x020617@0.72:t=fill",
    "drawbox=x=132:y=142:w=260:h=10:color=0x22c55e:t=fill",
    drawTextFilter("MLOPS PRACTICE NOTE", 132, 188, 34, "0xbbf7d0"),
    ...titleLines.map((line, lineIndex) => drawTextFilter(line, 132, 312 + lineIndex * 82, 72, "0xf8fafc")),
    ...subtitleLines.map((line, lineIndex) => drawTextFilter(line, 136, 312 + titleLines.length * 82 + 48 + lineIndex * 46, 36, "0xe2e8f0")),
    drawTextFilter("Akhilesh Ranjan Singh | ML Platform & DevOps", 132, 900, 28, "0xfef3c7"),
    drawTextFilter(`${index + 1}/${total}`, 1690, 900, 30, "0xdcfce7")
  ].join(",");

  execFileSync("ffmpeg", [
    "-y",
    "-f", "lavfi",
    "-i", "color=c=0x07111f:s=1920x1080:d=1",
    "-vf", filters,
    "-frames:v", "1",
    pngPath
  ], { stdio: "ignore" });

  return pngPath;
}

function createNarration(video, outputDir) {
  const narrationPath = path.join(outputDir, "narration.txt");
  const text = video.scenes.map((scene) => scene.narration).join("\n\n");
  fs.writeFileSync(narrationPath, text, "utf8");

  if (!commandExists("say")) return { narrationPath, audioPath: "" };

  const audioPath = path.join(outputDir, "narration.aiff");
  execFileSync("say", ["-v", "Samantha", "-r", "175", "-o", audioPath, "-f", narrationPath], { stdio: "ignore" });
  return { narrationPath, audioPath };
}

function getAudioDuration(audioPath) {
  if (!audioPath || !commandExists("ffprobe")) return 0;
  try {
    const output = execFileSync("ffprobe", [
      "-v", "error",
      "-show_entries", "format=duration",
      "-of", "default=noprint_wrappers=1:nokey=1",
      audioPath
    ], { encoding: "utf8" }).trim();
    return Number(output) || 0;
  } catch {
    return 0;
  }
}

function createCaptions(video, durations, outputDir) {
  const srtPath = path.join(outputDir, "captions.srt");
  let cursor = 0;
  const blocks = video.scenes.map((scene, index) => {
    const duration = durations[index];
    const start = cursor;
    const end = cursor + duration;
    cursor = end;
    const text = wrapText(scene.narration, 58, 3).join("\n");
    return `${index + 1}\n${formatSrtTime(start)} --> ${formatSrtTime(end)}\n${text}\n`;
  });
  fs.writeFileSync(srtPath, blocks.join("\n"), "utf8");
  return srtPath;
}

function renderVideo(slides, durations, audioPath, outputDir) {
  if (!commandExists("ffmpeg")) {
    throw new Error("ffmpeg is required to render MP4 video. Install ffmpeg, then rerun npm run youtube:video.");
  }

  const concatPath = path.join(outputDir, "slides.txt");
  const lines = [];
  slides.forEach((slide, index) => {
    lines.push(`file '${slide.replace(/'/g, "'\\''")}'`);
    lines.push(`duration ${durations[index].toFixed(2)}`);
  });
  lines.push(`file '${slides[slides.length - 1].replace(/'/g, "'\\''")}'`);
  fs.writeFileSync(concatPath, `${lines.join("\n")}\n`, "utf8");

  const outputPath = path.join(outputDir, "video.mp4");
  const args = [
    "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", concatPath
  ];

  if (audioPath) args.push("-i", audioPath);

  const filters = [
    "scale=1920:1080",
    "format=yuv420p"
  ].join(",");

  args.push("-vf", filters, "-fps_mode", "vfr", "-c:v", "libx264", "-preset", "medium");
  if (audioPath) args.push("-c:a", "aac", "-b:a", "160k", "-shortest");
  args.push(outputPath);

  execFileSync("ffmpeg", args, { stdio: "inherit" });
  if (!fs.existsSync(outputPath) || fs.statSync(outputPath).size < 10000) {
    throw new Error(`Rendered MP4 is empty or too small: ${outputPath}`);
  }
  return outputPath;
}

async function main() {
  const topic = argValue("--topic", youtubeDefaultTopic);
  const now = currentDate();
  const outputDir = path.join(videosDir, `${now}-${slugify(topic)}`);
  fs.mkdirSync(outputDir, { recursive: true });

  const video = await createVideoPackage(topic);
  fs.writeFileSync(path.join(outputDir, "metadata.json"), JSON.stringify(video, null, 2), "utf8");

  video.scenes.forEach((scene, index) => createSlideSvg(scene, index, video.scenes.length, outputDir));
  const pngSlides = video.scenes.map((scene, index) => createSlidePng(scene, index, video.scenes.length, outputDir));
  fs.copyFileSync(pngSlides[0], path.join(outputDir, "thumbnail.png"));

  const { narrationPath, audioPath } = createNarration(video, outputDir);
  const audioDuration = getAudioDuration(audioPath);
  const usableAudioPath = audioDuration > 0 ? audioPath : "";
  const weights = video.scenes.map((scene) => Math.max(1, scene.narration.length));
  const totalWeight = weights.reduce((sum, value) => sum + value, 0);
  const totalDuration = audioDuration || Math.max(48, video.scenes.length * 8);
  const durations = weights.map((weight) => Math.max(5, totalDuration * weight / totalWeight));
  const captionsPath = createCaptions(video, durations, outputDir);
  const videoPath = renderVideo(pngSlides, durations, usableAudioPath, outputDir);

  console.log("");
  console.log(`Video package created: ${outputDir}`);
  console.log(`MP4: ${videoPath}`);
  console.log(`Metadata: ${path.join(outputDir, "metadata.json")}`);
  console.log(`Narration: ${narrationPath}`);
  console.log(`Captions: ${captionsPath}`);
  console.log(`Thumbnail: ${path.join(outputDir, "thumbnail.png")}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
