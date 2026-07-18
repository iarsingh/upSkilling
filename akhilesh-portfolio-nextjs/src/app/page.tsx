import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { SkillsSection } from '@/components/skills-section';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { FeaturedProjectsSection } from '@/components/featured-projects-section';
import { CertificationsSection } from '@/components/certifications-section';
import { ExploreCtaSection } from '@/components/explore-cta-section';
import { ContactSection } from '@/components/contact-section';
import { getCertifications, getExperience, getProfile, getProjects, getSkills } from '@/lib/content';

export default function HomePage() {
  const profile = getProfile();
  const skills = getSkills();
  const experience = getExperience();
  const projects = getProjects();
  const certifications = getCertifications();

  return (
    <>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <SkillsSection categories={skills} />
      <ExperienceTimeline entries={experience} />
      <FeaturedProjectsSection projects={projects} />
      <CertificationsSection certifications={certifications} profile={profile} />
      <ExploreCtaSection />
      <ContactSection profile={profile} />
    </>
  );
}
