const fs = require("fs");
const path = require("path");
const { publishPost } = require("./linkedin");

function linkedinTextFromMarkdown(filePath) {
  const markdown = fs.readFileSync(filePath, "utf8").trim();
  return markdown
    .replace(/^#\s+/gm, "")
    .replace(/^##\s+/gm, "")
    .replace(/^```[a-zA-Z]*\n/gm, "")
    .replace(/^```\n/gm, "")
    .trim();
}

async function main() {
  const fileArg = process.argv[2];
  if (!fileArg) {
    throw new Error("Usage: node src/publish-markdown-file.js <markdown-file>");
  }

  const filePath = path.resolve(fileArg);
  const text = linkedinTextFromMarkdown(filePath);
  const linkedInId = await publishPost(text);
  console.log(`Published ${filePath} to LinkedIn: ${linkedInId}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
