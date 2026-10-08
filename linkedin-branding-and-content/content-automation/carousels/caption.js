// Builds the LinkedIn caption for a carousel. The first two lines are what shows before "...see more",
// so they carry the title and the subtitle instead of the series label.

const fs = require("fs");
const path = require("path");

const NUMBERS = ["1\uFE0F\u20E3", "2\uFE0F\u20E3", "3\uFE0F\u20E3"];

function stripFrontmatter(md) {
  return md.replace(/^---\n[\s\S]*?\n---\n+/, "").trim();
}

function slideTitle(s) {
  return s.type === "quote" ? s.label : s.title;
}

function shortDate(date) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
}

function nextLine(c) {
  if (!c.next) return `That closes ${c.series.label}. Follow for the next series.`;
  return `Next in ${c.series.label}, ${shortDate(c.next.date)}: ${c.next.title.replace(/\.$/, "")}. Follow so it lands in your feed.`;
}

function engagement(c) {
  return [
    [`Or just reply 1, 2 or 3: which is hardest to get your team to do?`, ...c.points.map((p, i) => `${NUMBERS[i]} ${p}`)].join("\n"),
    `\uD83D\uDD16 Save this for your next ${c.series.saveFor}. \u267B\uFE0F Repost if it would help someone on your team.`,
    nextLine(c),
    `${c.series.label} \u00B7 #${c.issue} of ${c.total}`,
    c.series.hashtags.join(" "),
  ];
}

function handwrittenBody(c) {
  const lines = stripFrontmatter(fs.readFileSync(path.join(__dirname, "content", c.postFile), "utf8")).split("\n");
  const body = lines.filter((line, i) => {
    if (i === 0 && line.includes(" | #")) return false;
    if (/^Next:/.test(line)) return false;
    return !/^(#\w+\s*)+$/.test(line.trim());
  });
  return body.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function postText(c) {
  if (c.postFile) return [handwrittenBody(c), ...engagement(c)].join("\n\n");
  return [
    `${c.title}\n${c.sub}`,
    c.hook,
    ["Swipe the carousel \uD83D\uDC49", ...c.slides.map((s, i) => `${i + 1}. ${slideTitle(s)}`)].join("\n"),
    `The takeaway: ${c.takeaway}`,
    c.question,
    ...engagement(c),
  ].join("\n\n");
}

module.exports = { postText, stripFrontmatter };
