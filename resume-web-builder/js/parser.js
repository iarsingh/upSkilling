import { lines, sectionText, titleCase } from "./utils.js";

const knownSectionLabels = [
  "PROFESSIONAL SUMMARY",
  "SUMMARY",
  "PROFILE",
  "TECHNICAL SKILLS",
  "SKILLS",
  "PROFESSIONAL EXPERIENCE",
  "EXPERIENCE",
  "PROJECTS",
  "PROJECT",
  "EDUCATION",
  "CERTIFICATIONS"
];

export function detectDynamicSections(text) {
  const rawLines = text.replace(/\r/g, "").split("\n");
  const headings = [];

  rawLines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.length > 42) return;
    const normalized = trimmed.replace(/[:\-]+$/, "").toUpperCase();
    if (!/^[A-Z][A-Z0-9 &/+-]{2,}$/.test(normalized)) return;
    headings.push({ index, label: normalized, title: titleCase(normalized) });
  });

  return headings
    .filter((heading) => !knownSectionLabels.includes(heading.label))
    .map((heading) => {
      const next = headings.find((candidate) => candidate.index > heading.index);
      const endIndex = next ? next.index : rawLines.length;
      const content = rawLines
        .slice(heading.index + 1, endIndex)
        .map((line) => line.trim())
        .filter(Boolean)
        .join("\n");

      return {
        id: crypto.randomUUID(),
        title: heading.title,
        content: content || `Add ${heading.title.toLowerCase()} details here.`
      };
    })
    .filter((section, index, sections) => section.content && sections.findIndex((item) => item.title === section.title) === index);
}

export function parseResume(text, previousResume) {
  const clean = text.replace(/\r/g, "").replace(/[ \t]+/g, " ").trim();
  const allLines = lines(clean);
  const email = clean.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";
  const phone = clean.match(/(?:\+?\d[\s-]?){8,15}/)?.[0]?.trim() || "";
  const linkedin = clean.match(/https?:\/\/(?:www\.)?linkedin\.com\/[^\s]+/i)?.[0] || "";
  const github = clean.match(/https?:\/\/(?:www\.)?github\.com\/[^\s]+/i)?.[0] || "";
  const headerLines = allLines.slice(0, 8);
  const name =
    headerLines.find((line) => line.length > 4 && !line.includes("@") && !/\d{5,}/.test(line) && line === line.toUpperCase()) ||
    allLines[0] ||
    "";
  const title =
    headerLines.find((line) => /engineer|developer|architect|devops|mlops|platform|cloud/i.test(line) && line !== name) ||
    "";

  const summary = sectionText(clean, ["PROFESSIONAL SUMMARY", "SUMMARY", "PROFILE"], [
    "PROFESSIONAL EXPERIENCE",
    "EXPERIENCE",
    "TECHNICAL SKILLS",
    "SKILLS",
    "PROJECTS",
    "EDUCATION"
  ]);
  const skills = sectionText(clean, ["TECHNICAL SKILLS", "SKILLS"], [
    "PROFESSIONAL EXPERIENCE",
    "EXPERIENCE",
    "PROJECTS",
    "CERTIFICATIONS",
    "EDUCATION"
  ]);
  const experience = sectionText(clean, ["PROFESSIONAL EXPERIENCE", "EXPERIENCE"], [
    "TECHNICAL SKILLS",
    "SKILLS",
    "PROJECTS",
    "CERTIFICATIONS",
    "EDUCATION"
  ]);
  const projects = sectionText(clean, ["PROJECTS", "PROJECT"], ["CERTIFICATIONS", "EDUCATION", "TECHNICAL SKILLS"]);
  const education = sectionText(clean, ["EDUCATION", "CERTIFICATIONS"], ["PROJECTS"]);
  const detectedCustomSections = detectDynamicSections(clean);

  return {
    ...previousResume,
    name: name || previousResume.name,
    title: title || previousResume.title,
    email: email || previousResume.email,
    phone: phone || previousResume.phone,
    location: /Noida/i.test(clean) ? "Noida, India" : previousResume.location,
    linkedin: linkedin || previousResume.linkedin,
    github: github || previousResume.github,
    summary: summary || previousResume.summary,
    skills: skills || previousResume.skills,
    experience: experience || previousResume.experience,
    projects: projects || previousResume.projects,
    education: education || previousResume.education,
    customSections: detectedCustomSections.length ? detectedCustomSections : previousResume.customSections || []
  };
}

export async function extractPdf(file) {
  const pdfjs = await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: buffer }).promise;
  const chunks = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    chunks.push(content.items.map((item) => item.str).join(" "));
  }
  return chunks.join("\n");
}

export async function extractDocx(file) {
  if (!window.mammoth) {
    throw new Error("DOCX parser is still loading. Please try again.");
  }
  const buffer = await file.arrayBuffer();
  const result = await window.mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value;
}

export async function extractFile(file) {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf")) return extractPdf(file);
  if (name.endsWith(".docx") || name.endsWith(".doc")) return extractDocx(file);
  return file.text();
}
