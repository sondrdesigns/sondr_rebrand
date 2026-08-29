import { NextResponse } from 'next/server';

export async function GET() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ configured: false });

  try {
    const [balanceRes, chargesRes] = await Promise.all([
      fetch('https://api.stripe.com/v1/balance', {
        headers: { Authorization: `Bearer ${key}` },
      }),
      fetch('https://api.stripe.com/v1/charges?limit=5', {
        headers: { Authorization: `Bearer ${key}` },
      }),
    ]);
    const [balance, charges] = await Promise.all([
      balanceRes.json(),
      chargesRes.json(),
    ]);
    return NextResponse.json({ configured: true, balance, charges: charges.data });
  } catch (err) {
    return NextResponse.json({ configured: true, error: err.message });
  }
}
