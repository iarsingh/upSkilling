const { spawnSync } = require("child_process");
const { itemForDate, nextDueItem, readCalendar } = require("./calendar");

function copyToClipboard(text) {
  const result = spawnSync("pbcopy", { input: text, encoding: "utf8" });
  return result.status === 0;
}

function printThread(item) {
  console.log(`${item.date} - ${item.topic}`);
  console.log("");
  item.thread.forEach((part, index) => {
    console.log(`Post ${index + 1}/${item.thread.length}`);
    console.log(part);
    console.log("");
  });
}

function usage() {
  console.log("Usage:");
  console.log("  npm run manual:next");
  console.log("  npm run manual:date -- YYYY-MM-DD");
  console.log("  npm run manual:copy -- YYYY-MM-DD 1");
}

function main() {
  const args = process.argv.slice(2);
  const flags = new Set(args);

  if (flags.has("--next")) {
    const item = nextDueItem();
    if (!item) {
      console.log("No due X thread found. Run npm run prepare:30 if the calendar is empty.");
      return;
    }
    printThread(item);
    if (copyToClipboard(item.thread[0])) {
      console.log("Copied Post 1 to clipboard. Paste it into X, then copy the next post with manual:copy.");
    }
    return;
  }

  if (flags.has("--date")) {
    const date = args[args.indexOf("--date") + 1];
    if (!date) {
      usage();
      process.exitCode = 1;
      return;
    }
    const item = itemForDate(date) || readCalendar().find((entry) => entry.date === date);
    if (!item) {
      console.log(`No X thread found for ${date}.`);
      return;
    }
    printThread(item);
    if (copyToClipboard(item.thread[0])) {
      console.log("Copied Post 1 to clipboard. Paste it into X, then copy the next post with manual:copy.");
    }
    return;
  }

  if (flags.has("--copy")) {
    const date = args[args.indexOf("--copy") + 1];
    const postNumber = Number(args[args.indexOf("--copy") + 2] || "1");
    if (!date || !Number.isInteger(postNumber)) {
      usage();
      process.exitCode = 1;
      return;
    }
    const item = readCalendar().find((entry) => entry.date === date);
    if (!item) {
      console.log(`No X thread found for ${date}.`);
      return;
    }
    const part = item.thread[postNumber - 1];
    if (!part) {
      console.log(`Post ${postNumber} not found. This thread has ${item.thread.length} posts.`);
      return;
    }
    if (copyToClipboard(part)) {
      console.log(`Copied ${date} Post ${postNumber}/${item.thread.length} to clipboard.`);
    } else {
      console.log(part);
    }
    return;
  }

  usage();
}

main();
