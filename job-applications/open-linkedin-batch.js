const { spawn } = require("child_process");

const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const urls = [
  "https://www.linkedin.com/jobs/search/?keywords=MLOps%20Engineer&location=India&f_E=3%2C4&f_TPR=r604800",
  "https://www.linkedin.com/jobs/search/?keywords=ML%20Platform%20Engineer&location=India&f_E=3%2C4&f_TPR=r604800",
  "https://www.linkedin.com/jobs/search/?keywords=AI%20Infrastructure%20Engineer&location=India&f_E=3%2C4&f_TPR=r604800",
  "https://www.linkedin.com/jobs/search/?keywords=DevOps%20Engineer%20Kubernetes%20Terraform%20GCP&location=India&f_E=3%2C4&f_TPR=r604800",
  "https://www.linkedin.com/jobs/search/?keywords=Platform%20Engineer%20Kubernetes%20Cloud&location=India&f_E=3%2C4&f_TPR=r604800",
  "https://www.linkedin.com/jobs/search/?keywords=GCP%20Engineer%20DevOps%20Kubernetes&location=India&f_E=3%2C4&f_TPR=r604800",
  "https://www.linkedin.com/jobs/search/?keywords=Kubernetes%20Engineer%20DevOps&location=India&f_E=3%2C4&f_TPR=r604800",
  "https://www.linkedin.com/jobs/search/?keywords=Site%20Reliability%20Engineer%20SRE%20Kubernetes&location=India&f_E=3%2C4&f_TPR=r604800"
];

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  for (const url of urls) {
    const child = spawn(chrome, [url], {
      detached: true,
      stdio: "ignore"
    });
    child.unref();
    console.log(`Opened: ${url}`);
    await sleep(900);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
