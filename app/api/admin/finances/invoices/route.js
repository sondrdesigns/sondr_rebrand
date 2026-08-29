import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function GET(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ configured: false });
  try {
    const res = await fetch('https://api.stripe.com/v1/invoices?limit=20', {
      headers: { Authorization: `Bearer ${key}` },
    });
    const data = await res.json();
    return NextResponse.json({ configured: true, invoices: data.data });
  } catch (err) {
    return NextResponse.json({ configured: true, error: err.message });
  }
}
