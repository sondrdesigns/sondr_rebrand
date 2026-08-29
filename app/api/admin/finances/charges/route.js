import { NextResponse } from 'next/server';

export async function GET() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ configured: false });

  try {
    const res = await fetch('https://api.stripe.com/v1/charges?limit=20', {
      headers: { Authorization: `Bearer ${key}` },
    });
    const data = await res.json();
    return NextResponse.json({ configured: true, charges: data.data });
  } catch (err) {
    return NextResponse.json({ configured: true, error: err.message });
  }
}
