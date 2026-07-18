import type { Metadata } from 'next';
import { ContactSection } from '@/components/contact-section';
import { getProfile } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for platform engineering, DevOps, or MLOps roles and consulting.',
};

export default function ContactPage() {
  const profile = getProfile();
  return <ContactSection profile={profile} />;
}
