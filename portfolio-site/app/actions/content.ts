"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { checkSession } from "@/lib/dal";

async function requireAuth() {
  const session = await checkSession();
  if (!session) throw new Error("Unauthorized");
}

function linesToArray(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

// ---- Profile ----

export async function updateProfile(formData: FormData) {
  await requireAuth();

  await prisma.profile.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      fullName: String(formData.get("fullName") ?? ""),
      headline: String(formData.get("headline") ?? ""),
      summary: String(formData.get("summary") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      location: String(formData.get("location") ?? ""),
      linkedin: String(formData.get("linkedin") ?? ""),
      github: String(formData.get("github") ?? ""),
      kaggle: String(formData.get("kaggle") ?? "") || null,
      hackerrank: String(formData.get("hackerrank") ?? "") || null,
      credly: String(formData.get("credly") ?? "") || null,
    },
    update: {
      fullName: String(formData.get("fullName") ?? ""),
      headline: String(formData.get("headline") ?? ""),
      summary: String(formData.get("summary") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      location: String(formData.get("location") ?? ""),
      linkedin: String(formData.get("linkedin") ?? ""),
      github: String(formData.get("github") ?? ""),
      kaggle: String(formData.get("kaggle") ?? "") || null,
      hackerrank: String(formData.get("hackerrank") ?? "") || null,
      credly: String(formData.get("credly") ?? "") || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin");
}

// ---- Projects ----

export async function createProject(formData: FormData) {
  await requireAuth();

  await prisma.project.create({
    data: {
      title: String(formData.get("title") ?? ""),
      slug: String(formData.get("slug") ?? "").trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
      summary: String(formData.get("summary") ?? ""),
      description: String(formData.get("description") ?? ""),
      tags: linesToArray(formData.get("tags")),
      repoUrl: String(formData.get("repoUrl") ?? "") || null,
      liveUrl: String(formData.get("liveUrl") ?? "") || null,
      featured: formData.get("featured") === "on",
      order: Number(formData.get("order") ?? 0),
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();

  await prisma.project.update({
    where: { id },
    data: {
      title: String(formData.get("title") ?? ""),
      slug: String(formData.get("slug") ?? "").trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
      summary: String(formData.get("summary") ?? ""),
      description: String(formData.get("description") ?? ""),
      tags: linesToArray(formData.get("tags")),
      repoUrl: String(formData.get("repoUrl") ?? "") || null,
      liveUrl: String(formData.get("liveUrl") ?? "") || null,
      featured: formData.get("featured") === "on",
      order: Number(formData.get("order") ?? 0),
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
}

export async function deleteProject(id: string) {
  await requireAuth();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
}

// ---- Experience ----

export async function createExperience(formData: FormData) {
  await requireAuth();

  await prisma.experience.create({
    data: {
      title: String(formData.get("title") ?? ""),
      company: String(formData.get("company") ?? ""),
      location: String(formData.get("location") ?? ""),
      startDate: String(formData.get("startDate") ?? ""),
      endDate: String(formData.get("endDate") ?? ""),
      highlights: linesToArray(formData.get("highlights")),
      order: Number(formData.get("order") ?? 0),
    },
  });

  revalidatePath("/experience");
  revalidatePath("/admin");
}

export async function updateExperience(id: string, formData: FormData) {
  await requireAuth();

  await prisma.experience.update({
    where: { id },
    data: {
      title: String(formData.get("title") ?? ""),
      company: String(formData.get("company") ?? ""),
      location: String(formData.get("location") ?? ""),
      startDate: String(formData.get("startDate") ?? ""),
      endDate: String(formData.get("endDate") ?? ""),
      highlights: linesToArray(formData.get("highlights")),
      order: Number(formData.get("order") ?? 0),
    },
  });

  revalidatePath("/experience");
  revalidatePath("/admin");
}

export async function deleteExperience(id: string) {
  await requireAuth();
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/experience");
  revalidatePath("/admin");
}

// ---- Skills ----

export async function createSkill(formData: FormData) {
  await requireAuth();

  await prisma.skill.create({
    data: {
      name: String(formData.get("name") ?? ""),
      category: String(formData.get("category") ?? "General"),
      order: Number(formData.get("order") ?? 0),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteSkill(id: string) {
  await requireAuth();
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

// ---- Certifications ----

export async function createCertification(formData: FormData) {
  await requireAuth();

  await prisma.certification.create({
    data: {
      name: String(formData.get("name") ?? ""),
      issuer: String(formData.get("issuer") ?? ""),
      year: String(formData.get("year") ?? "") || null,
      url: String(formData.get("url") ?? "") || null,
      order: Number(formData.get("order") ?? 0),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteCertification(id: string) {
  await requireAuth();
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}
