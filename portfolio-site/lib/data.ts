import { prisma } from "@/lib/prisma";

export async function getProfile() {
  return prisma.profile.findUnique({ where: { id: 1 } });
}

export async function getExperience() {
  return prisma.experience.findMany({ orderBy: { order: "asc" } });
}

export async function getSkills() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
  const byCategory = new Map<string, string[]>();
  for (const s of skills) {
    const list = byCategory.get(s.category) ?? [];
    list.push(s.name);
    byCategory.set(s.category, list);
  }
  return byCategory;
}

export async function getProjects() {
  return prisma.project.findMany({ orderBy: { order: "asc" } });
}

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { featured: true },
    orderBy: { order: "asc" },
  });
}

export async function getCertifications() {
  return prisma.certification.findMany({ orderBy: { order: "asc" } });
}
