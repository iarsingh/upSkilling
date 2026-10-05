# upSkilling — interview questions and answers

[README](README.md) · [Project architecture](PROJECT_ARCHITECTURE.md)

## 1. What is the architecture of upSkilling?

It is a portfolio index containing independent learning projects and applications. The [README portfolio map](README.md) directs readers to code and to separate repositories. There is no shared backend for the entire portfolio; each application has its own dependency and runtime contracts.

## 2. How would you choose a project to demonstrate in an FDE interview?

Start with the customer workflow and select an engagement whose discovery, constraints, and evaluation match it. The README includes FDE engagements alongside cloud/SRE/MLOps foundations. Open the engagement’s code and readout, then demonstrate one acceptance case and one refusal or failure case.

## 3. Which components remain in this checkout?

The [architecture component table](PROJECT_ARCHITECTURE.md) identifies the portfolio landing page, reference notes, synthetic data projects, incident operations application, interview application, and content workflows. Their source folders represent separate responsibilities rather than services that necessarily call one another.

## 4. How do you distinguish local folders from independent repositories?

Check the [.gitignore](.gitignore) migration sections and the README’s repository links. A folder can exist locally while being excluded from this Git repository and published separately. I would inspect its own remote and tracked files before choosing where to commit a change.

## 5. Why is there no single install command?

The projects use different manifests and runtimes. Installing one nested Python requirements file cannot set up Node applications, infrastructure modules, or every other Python project. Choose a project first and follow its README and manifests.

## 6. How would you explain the incident operations project?

Begin with [pyMlSystem/README.md](pyMlSystem/README.md), then follow its linked API, model, data, test, and deployment instructions. Treat its architecture and tests as evidence about that application, not about every project in this portfolio.

## 7. What role do the dataset projects play?

[kaggle-mlops-datasets/README.md](kaggle-mlops-datasets/README.md) describes synthetic data for MLOps, AIOps, FinOps, and related exercises. Synthetic fixtures support repeatable experimentation; they should not be presented as live customer records or business measurements.

## 8. How is the GitHub Pages view related to the source projects?

[github-pages/index.html](github-pages/index.html) is the portfolio landing page. The [.github/workflows/web-resume-pages.yml](.github/workflows/web-resume-pages.yml) workflow describes how selected site assets are assembled and deployed. The page is a showcase/navigation surface rather than proof that every linked project is running.

## 9. What does a green CI run establish?

Only the checks run by that workflow on that commit. Read the workflow’s path filters, working directories, and job commands. Several project-specific workflows can coexist; a passing one does not establish that the entire portfolio passed the same checks.

## 10. How would you make another engineer’s walkthrough reproducible?

Choose a tracked project or clone its independent repository; use the declared runtime and dependency manifest; run its test/evaluation fixtures; and document inputs, expected outputs, and configuration. Keep generated outputs and local credentials out of the portfolio commit.

## 11. What is the connection between cloud/SRE work and FDE work?

Cloud/SRE artifacts show deployment and operating judgment. FDE artifacts add discovery, customer constraints, success criteria, rollout, and handoff. In an interview I would connect these through one concrete project decision rather than list unrelated tools.

## 12. How would you extend this portfolio without weakening its structure?

Give each new project a clear user problem, README, architecture, acceptance checks, and interview walkthrough. Decide whether it belongs in this repository or a separate one, update the navigation accordingly, and describe implemented behavior separately from intended production work.
