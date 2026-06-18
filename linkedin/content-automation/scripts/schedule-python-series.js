const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const calendarPath = path.join(root, "content-calendar.json");
const postsDir = path.join(root, "posts");
const profile = "https://www.linkedin.com/in/iamarsingh/";
const hashtags = ["#Python", "#DevOps", "#MLOps", "#CloudComputing", "#SRE", "#Automation"];

const posts = [
  {
    title: "Python is not just for coding interviews. It is for solving real engineering problems.",
    topic: "Python automation for real engineering work",
    text: `Python is not just for coding interviews. It is for solving real engineering problems.

Day 1/14 of my Python Automation Series.

I used to think learning Python meant finishing tutorials, syntax notes, and small practice questions.

But the real confidence came when I started using Python to remove boring manual work.

For DevOps, Cloud, SRE, and MLOps roles, Python becomes powerful when you use it like an engineering tool.

Here are 5 practical Python project ideas you can build:

1. Log analyzer
Read application logs, find error patterns, count failures by service, and generate a short incident summary.

2. Cloud cost reporter
Analyze billing CSV or BigQuery export data and show which service, region, or team is increasing cost.

3. Kubernetes health checker
List unhealthy pods, recent restarts, missing resource limits, and services without readiness probes.

4. CI/CD validation tool
Validate Dockerfiles, Terraform plans, YAML files, and Kubernetes manifests before code is merged.

5. MLOps drift monitor
Compare training data vs production data, detect drift, and alert when model behavior starts changing.

My simple rule:
If I repeat a manual task more than twice, I try to automate it with Python.

Which Python project would you build first?
A. Log analyzer
B. Cloud cost reporter
C. Kubernetes health checker
D. CI/CD validation tool
E. MLOps drift monitor

Comment with A, B, C, D, or E.

${hashtags.join(" ")}`
  },
  {
    title: "Build a log analyzer with Python.",
    topic: "Python log analyzer",
    text: `Build a log analyzer with Python.

Day 2/14 of my Python Automation Series.

Logs are usually the first place engineers look during incidents.

But reading logs manually is slow.

A small Python script can:

1. Read a log file
2. Filter ERROR and WARNING lines
3. Count errors by service or endpoint
4. Find the most common failure message
5. Generate a short incident summary

This is a practical beginner project because it teaches file handling, loops, strings, dictionaries, and reporting.

Small action step:
Take one sample application log and write a script that prints the top 5 error messages.

What log format do you work with most?
A. Plain text
B. JSON logs
C. Nginx or Apache logs
D. Kubernetes logs

Comment A, B, C, or D.

${hashtags.join(" ")}`
  },
  {
    title: "Python can clean your folders before they become a mess.",
    topic: "Python file and folder automation",
    text: `Python can clean your folders before they become a mess.

Day 3/14 of my Python Automation Series.

One of the easiest ways to start using Python in real life is file automation.

A useful script can:

1. Find files older than 30 days
2. Move reports into monthly folders
3. Delete temporary files
4. Rename screenshots with timestamps
5. Create backup copies before cleanup

This teaches pathlib, datetime, file operations, and safe automation habits.

Important rule:
Never delete first. Print what the script will delete, review it, then enable deletion.

Which folder needs automation first on your laptop or server?

${hashtags.join(" ")}`
  },
  {
    title: "Use Python to understand cloud cost before the bill surprises you.",
    topic: "Python cloud cost reporting",
    text: `Use Python to understand cloud cost before the bill surprises you.

Day 4/14 of my Python Automation Series.

Cloud cost problems are easier to fix when you can see patterns early.

A Python cost reporter can:

1. Read billing data from CSV or BigQuery export
2. Group spend by service
3. Compare this week vs last week
4. Find the fastest-growing cost area
5. Create a simple daily report

This is a strong project for DevOps and Cloud roles because it connects automation with business impact.

Small action step:
Create a sample CSV with service, region, date, and cost. Use pandas to print the top 5 services by spend.

Which cost issue do you see most often?
A. Compute
B. Storage
C. Network
D. Idle resources

${hashtags.join(" ")}`
  },
  {
    title: "A Kubernetes health checker is a perfect Python project.",
    topic: "Python Kubernetes health checks",
    text: `A Kubernetes health checker is a perfect Python project.

Day 5/14 of my Python Automation Series.

In Kubernetes, many issues are visible if you check the right signals.

A Python script can report:

1. Pods stuck in Pending
2. Pods in CrashLoopBackOff
3. Containers with high restart counts
4. Deployments with unavailable replicas
5. Workloads missing resource requests and limits

This project teaches API clients, JSON-like objects, filtering, and operational thinking.

Small action step:
Start by listing pods across namespaces and printing name, namespace, phase, and restart count.

What Kubernetes issue wastes most of your debugging time?

${hashtags.join(" ")} #Kubernetes`
  },
  {
    title: "Python can make your CI/CD pipeline stricter.",
    topic: "Python CI/CD validation",
    text: `Python can make your CI/CD pipeline stricter.

Day 6/14 of my Python Automation Series.

Many production problems start as small config mistakes.

A Python validation script can check:

1. YAML syntax
2. Required labels in Kubernetes manifests
3. Dockerfile base image rules
4. Terraform naming conventions
5. Required environment variables

Then you can run the script inside GitHub Actions before merge.

This is a practical way to learn Python while improving release safety.

Small action step:
Write a Python script that fails when a Kubernetes deployment is missing readinessProbe.

What should every CI pipeline check before merge?

${hashtags.join(" ")} #CICD`
  },
  {
    title: "A simple API health monitor teaches real production thinking.",
    topic: "Python API health monitoring",
    text: `A simple API health monitor teaches real production thinking.

Day 7/14 of my Python Automation Series.

A Python health monitor can check:

1. Is the API reachable?
2. Is the status code 200?
3. Is latency below a threshold?
4. Does the response contain expected data?
5. Should an alert be printed or sent?

This teaches requests, timeouts, exception handling, and reliability basics.

Small action step:
Pick one API endpoint and write a script that prints status code and response time.

What is more useful in monitoring?
A. Uptime
B. Latency
C. Error rate
D. Business metrics

${hashtags.join(" ")} #Monitoring`
  },
  {
    title: "Python plus CSV files can remove hours of manual reporting.",
    topic: "Python Excel and CSV automation",
    text: `Python plus CSV files can remove hours of manual reporting.

Day 8/14 of my Python Automation Series.

A lot of engineering work still ends in spreadsheets.

Python can help you:

1. Merge multiple CSV files
2. Remove duplicate rows
3. Filter failed jobs
4. Calculate weekly totals
5. Generate a clean summary report

This is where pandas becomes useful very quickly.

Small action step:
Take two CSV files and combine them into one report with total count, failed count, and success percentage.

Which report do you still create manually?

${hashtags.join(" ")} #DataEngineering`
  },
  {
    title: "Python can help write better incident summaries.",
    topic: "Python SRE incident summaries",
    text: `Python can help write better incident summaries.

Day 9/14 of my Python Automation Series.

After an incident, engineers need a clear timeline.

A Python script can collect:

1. First error timestamp
2. Peak error count
3. Services affected
4. Deployment time
5. Recovery time

Then it can generate a simple incident summary template.

This is useful because post-incident writing becomes easier when the facts are already collected.

Small action step:
Parse a sample log file and print first error time, last error time, and total error count.

What is the hardest part of writing a post-incident report?

${hashtags.join(" ")} #SRE`
  },
  {
    title: "Data drift checks are a practical Python plus MLOps project.",
    topic: "Python MLOps data drift checks",
    text: `Data drift checks are a practical Python plus MLOps project.

Day 10/14 of my Python Automation Series.

A model can fail even when the API is healthy.

One reason is data drift.

A Python drift checker can:

1. Load training data
2. Load production data
3. Compare feature averages
4. Compare missing value rates
5. Flag large changes

This project teaches pandas, statistics, and production ML thinking.

Small action step:
Compare two CSV files and print features where the average changed by more than 20%.

Which feature drift signal would you track first?

${hashtags.join(" ")} #MachineLearning`
  },
  {
    title: "Python can catch security mistakes before deployment.",
    topic: "Python security checks",
    text: `Python can catch security mistakes before deployment.

Day 11/14 of my Python Automation Series.

Security automation does not always need a big platform.

A Python script can scan for:

1. Hardcoded secrets
2. Open security groups
3. Privileged containers
4. Missing resource limits
5. Weak default passwords in sample configs

This is a strong project for DevOps, Cloud, and platform engineers.

Small action step:
Write a script that scans files for words like password, token, secret, and api_key.

What security mistake should automation catch early?

${hashtags.join(" ")} #DevSecOps`
  },
  {
    title: "Python works very well inside GitHub Actions.",
    topic: "Python GitHub Actions helpers",
    text: `Python works very well inside GitHub Actions.

Day 12/14 of my Python Automation Series.

Not every CI task needs a marketplace action.

Sometimes a small Python script is clearer.

You can use Python in GitHub Actions to:

1. Validate config files
2. Generate release notes
3. Check changed files
4. Build deployment summaries
5. Fail builds with custom rules

This teaches automation design and makes CI easier to maintain.

Small action step:
Create a workflow that runs a Python script on every pull request.

Do you prefer Bash or Python inside CI pipelines?

${hashtags.join(" ")} #GitHubActions`
  },
  {
    title: "Infrastructure inventory is easier when Python creates the report.",
    topic: "Python infrastructure reports",
    text: `Infrastructure inventory is easier when Python creates the report.

Day 13/14 of my Python Automation Series.

Teams often lose track of what is running.

A Python inventory reporter can list:

1. Servers
2. Containers
3. Kubernetes namespaces
4. Exposed services
5. Owner labels

The output can be CSV, Markdown, or JSON.

This project teaches data collection, formatting, and operational visibility.

Small action step:
Create a Markdown table from a list of services, owners, environments, and health status.

What infrastructure inventory do you wish was always up to date?

${hashtags.join(" ")} #Infrastructure`
  },
  {
    title: "A practical Python roadmap for DevOps and MLOps learners.",
    topic: "Python roadmap for DevOps and MLOps",
    text: `A practical Python roadmap for DevOps and MLOps learners.

Day 14/14 of my Python Automation Series.

If you want to learn Python for real engineering work, follow this order:

1. File handling
2. JSON and YAML parsing
3. Requests and APIs
4. CSV and pandas
5. Error handling and logging
6. CLI scripts with argparse
7. Tests with pytest
8. GitHub Actions automation
9. Kubernetes or cloud SDKs
10. Monitoring and reporting projects

Do not wait to become perfect at Python.

Pick one boring task and automate it.

That is how Python becomes useful.

What should the next series be?
A. Python for DevOps
B. Python for MLOps
C. Python for Kubernetes

Comment A, B, or C.

${hashtags.join(" ")} #LearningInPublic`
  }
];

function addDays(date, days) {
  const next = new Date(`${date}T00:00:00.000Z`);
  next.setUTCDate(next.getUTCDate() + days);
  return next.toISOString().slice(0, 10);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function markdownFor(item, post) {
  return `---
date: ${item.date}
day: ${item.day}
series: ${item.pillar}
topic: ${item.topic}
linkedinProfile: ${profile}
image: ../${item.imagePath}
status: scheduled
---

${post.text}
`;
}

const startDate = process.argv[2] || "2026-06-20";
const calendar = JSON.parse(fs.readFileSync(calendarPath, "utf8"));

for (let index = 0; index < posts.length; index += 1) {
  const date = addDays(startDate, index);
  const day = 11 + index;
  const post = posts[index];
  const id = `day-${String(day).padStart(3, "0")}`;
  const slug = slugify(post.topic);
  const draftPath = `posts/${date}-${id}-${slug}.md`;
  const imagePath = `assets/${date}-${id}-${slug}.png`;
  const item = {
    id,
    day,
    date,
    pillar: "Python Automation Series",
    audience: "DevOps, Cloud, SRE, MLOps, and backend learners",
    topic: post.topic,
    baseTopic: post.title,
    angle: "hands-on automation",
    hashtags,
    linkedinProfile: profile,
    status: "scheduled",
    draftPath,
    imagePath,
    text: post.text
  };

  const existingIndex = calendar.items.findIndex((entry) => entry.date === date);
  if (existingIndex === -1) {
    calendar.items.push(item);
  } else {
    calendar.items[existingIndex] = item;
  }

  fs.writeFileSync(path.join(root, draftPath), markdownFor(item, post));
}

calendar.items.sort((a, b) => a.date.localeCompare(b.date));
calendar.days = calendar.items.length;
calendar.updatedAt = new Date().toISOString();

fs.writeFileSync(calendarPath, `${JSON.stringify(calendar, null, 2)}\n`);

console.log(`Scheduled ${posts.length} Python posts from ${startDate}.`);
