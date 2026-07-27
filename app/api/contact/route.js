import { NextResponse } from 'next/server';

export async function POST(req) {
  const { name, email, project } = await req.json();

  if (!name || !email || !project) {
    return NextResponse.json({ error: 'all fields are required.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'email service not configured.' }, { status: 503 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'website@sondrdesigns.com',
      to: 'studio@sondrdesigns.com',
      reply_to: email,
      subject: `new message from ${name}`,
      text: `name: ${name}\nemail: ${email}\n\n${project}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'failed to send.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
