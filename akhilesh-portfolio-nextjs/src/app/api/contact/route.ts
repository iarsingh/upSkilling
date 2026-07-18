import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getProfile } from '@/lib/content';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ sent: false, error: 'Missing fields' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No email provider configured — the client falls back to a mailto link.
    return NextResponse.json({ sent: false, reason: 'not_configured' });
  }

  try {
    const resend = new Resend(apiKey);
    const profile = getProfile();
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Portfolio Contact Form <onboarding@resend.dev>',
      to: profile.email,
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `${message}\n\n— ${name} (${email})`,
    });
    return NextResponse.json({ sent: true });
  } catch (error) {
    console.error('Failed to send contact email', error);
    return NextResponse.json({ sent: false, reason: 'send_failed' });
  }
}
