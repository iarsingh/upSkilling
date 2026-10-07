// Series metadata, publishing order and dates for the carousel calendar.

const SERIES = {
  ai: {
    label: "Platform AI Transformation Playbook",
    short: "AI TRANSFORMATION PLAYBOOK",
    accent: "#7c9cff",
    hashtags: ["#AgenticAI", "#PlatformEngineering", "#DevSecOps", "#AIArchitecture", "#MLOps"],
  },
  fde: {
    label: "FDE Field Notes",
    short: "FDE FIELD NOTES",
    accent: "#f5a860",
    hashtags: ["#ForwardDeployedEngineer", "#SolutionsEngineering", "#MLOps", "#PlatformEngineering", "#InterviewPrep"],
  },
  k8s: {
    label: "Kubernetes in Production",
    short: "KUBERNETES IN PRODUCTION",
    accent: "#4cc3f5",
    hashtags: ["#Kubernetes", "#PlatformEngineering", "#DevOps", "#CloudNative", "#SRE"],
  },
  devsecops: {
    label: "DevSecOps & Platform",
    short: "DEVSECOPS & PLATFORM",
    accent: "#4fd18b",
    hashtags: ["#DevSecOps", "#PlatformEngineering", "#GitOps", "#Terraform", "#SRE"],
  },
  mlops: {
    label: "MLOps in Production",
    short: "MLOPS IN PRODUCTION",
    accent: "#b294ff",
    hashtags: ["#MLOps", "#MachineLearning", "#Kubernetes", "#AIEngineering", "#DataScience"],
  },
  python: {
    label: "Python for Platform Engineers",
    short: "PYTHON FOR PLATFORM ENGINEERS",
    accent: "#f2cf5b",
    hashtags: ["#Python", "#DevOps", "#Automation", "#PlatformEngineering", "#SRE"],
  },
  projects: {
    label: "Lab Notes",
    short: "LAB NOTES",
    accent: "#ff8a7a",
    hashtags: ["#PlatformEngineering", "#Portfolio", "#DevOps", "#MLOps", "#OpenSource"],
  },
};

const SERIES_ORDER = ["ai", "fde", "k8s", "devsecops", "mlops", "python", "projects"];
const START_DATE = "2026-10-08";
const PUBLISH_WEEKDAYS = [2, 4]; // Tuesday, Thursday
const SLOT = "08:00";

function loadSeries() {
  return Object.fromEntries(SERIES_ORDER.map((key) => [key, require(`./content/${key}.js`)]));
}

function addDays(dateString, days) {
  const d = new Date(`${dateString}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function publishDates(count) {
  const dates = [];
  let cursor = START_DATE;
  while (dates.length < count) {
    if (PUBLISH_WEEKDAYS.includes(new Date(`${cursor}T12:00:00Z`).getUTCDay())) dates.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return dates;
}

// Spread each series evenly across the calendar instead of running them back to back.
function buildPlan() {
  const bySeries = loadSeries();
  const slots = [];
  for (const key of SERIES_ORDER) {
    bySeries[key].forEach((carousel, i) => {
      slots.push({ key, i, position: (i + 0.5) / bySeries[key].length, rank: SERIES_ORDER.indexOf(key) });
    });
  }
  slots.sort((a, b) => a.position - b.position || a.rank - b.rank);

  const dates = publishDates(slots.length);
  const plan = slots.map((slot, n) => {
    const carousel = bySeries[slot.key][slot.i];
    const issue = String(slot.i + 1).padStart(2, "0");
    return {
      ...carousel,
      seriesKey: slot.key,
      series: SERIES[slot.key],
      issue,
      total: bySeries[slot.key].length,
      date: dates[n],
      id: `${dates[n]}-carousel-${slot.key}-${issue}`,
      fileStem: `${dates[n]}-${slot.key}-${issue}-${carousel.slug}`,
    };
  });

  for (const item of plan) {
    const next = plan.find((p) => p.seriesKey === item.seriesKey && Number(p.issue) === Number(item.issue) + 1);
    item.nextLabel = next ? `Next in the series: #${next.issue} ${next.title.replace(/\.$/, "")}` : `Series complete \u2014 save it for your next review`;
  }
  return plan;
}

module.exports = { SERIES, SLOT, buildPlan };
