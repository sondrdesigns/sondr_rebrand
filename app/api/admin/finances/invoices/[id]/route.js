import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

function stripe(key, path, method = 'GET', body = null) {
  const opts = { method, headers: { Authorization: `Bearer ${key}` } };
  if (body) {
    opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    opts.body = new URLSearchParams(body).toString();
  }
  return fetch(`https://api.stripe.com/v1${path}`, opts).then(r => r.json());
}

export async function DELETE(request, { params }) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 });

  const { id } = params;
  if (!id || !/^in_[a-zA-Z0-9]+$/.test(id)) {
    return NextResponse.json({ error: 'Invalid invoice ID' }, { status: 400 });
  }

  try {
    const result = await stripe(key, `/invoices/${id}/void`, 'POST');
    if (result.error) throw new Error(result.error.message);
    return NextResponse.json({ ok: true, status: result.status });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
