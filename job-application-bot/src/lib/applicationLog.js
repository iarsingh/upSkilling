const fs = require("fs");
const path = require("path");
const { applicationLogPath } = require("./config");

function load() {
  if (!fs.existsSync(applicationLogPath)) {
    fs.mkdirSync(path.dirname(applicationLogPath), { recursive: true });
    fs.writeFileSync(applicationLogPath, "[]");
    return [];
  }
  return JSON.parse(fs.readFileSync(applicationLogPath, "utf8"));
}

function save(entries) {
  fs.writeFileSync(applicationLogPath, JSON.stringify(entries, null, 2));
}

// jobKey should uniquely identify a posting, e.g. `${site}:${jobId or url}`.
function hasApplied(jobKey) {
  return load().some((entry) => entry.jobKey === jobKey);
}

function record(entry) {
  const entries = load();
  entries.push({ appliedAt: new Date().toISOString(), ...entry });
  save(entries);
}

function stats(site) {
  const entries = load().filter((e) => !site || e.site === site);
  return {
    total: entries.length,
    today: entries.filter((e) => e.appliedAt.slice(0, 10) === new Date().toISOString().slice(0, 10)).length
  };
}

module.exports = { hasApplied, record, stats, load };
