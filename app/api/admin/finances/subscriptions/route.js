import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getGETaxPercent, getGETaxRateId } from '@/lib/stripe-tax';

function stripe(key, path, method = 'GET', body = null) {
  const opts = { method, headers: { Authorization: `Bearer ${key}` } };
  if (body) {
    opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    opts.body = new URLSearchParams(body).toString();
  }
  return fetch(`https://api.stripe.com/v1${path}`, opts).then(r => r.json());
}

export async function GET(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ configured: false });

  try {
    const data = await stripe(key, '/subscriptions?limit=20&expand%5B%5D=data.customer');
    return NextResponse.json({ configured: true, subscriptions: data.data || [] });
  } catch (err) {
    return NextResponse.json({ configured: true, error: err.message });
  }
}

export async function POST(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 });

  const {
    customerEmail, customerName, planName,
    amountCents, currency = 'usd', interval = 'month', projectId,
  } = await request.json();

  if (!customerEmail || !amountCents || amountCents <= 0) {
    return NextResponse.json({ error: 'customerEmail and amount are required' }, { status: 400 });
  }

  try {
    // Find or create customer
    const search = await stripe(key, `/customers?email=${encodeURIComponent(customerEmail)}&limit=1`);
    let customerId;
    if (search.data?.length > 0) {
      customerId = search.data[0].id;
    } else {
      const customer = await stripe(key, '/customers', 'POST', {
        email: customerEmail,
        ...(customerName ? { name: customerName } : {}),
      });
      if (customer.error) throw new Error(customer.error.message);
      customerId = customer.id;
    }

    const name = planName || 'Retainer';
    const geTaxRateId = await getGETaxRateId(key, stripe);
    const subBody = {
      customer: customerId,
      'items[0][price_data][currency]': currency,
      'items[0][price_data][unit_amount]': String(Math.round(amountCents)),
      'items[0][price_data][recurring][interval]': interval,
      'items[0][price_data][product_data][name]': name,
      'default_tax_rates[0]': geTaxRateId,
      collection_method: 'send_invoice',
      days_until_due: '30',
      'metadata[plan_name]': name,
      'metadata[ge_tax_rate_id]': geTaxRateId,
      'metadata[ge_tax_percent]': String(getGETaxPercent()),
    };
    if (projectId) subBody['metadata[project_id]'] = projectId;

    const sub = await stripe(key, '/subscriptions', 'POST', subBody);
    if (sub.error) throw new Error(sub.error.message);

    return NextResponse.json({
      id: sub.id,
      status: sub.status,
      currentPeriodEnd: sub.current_period_end,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
