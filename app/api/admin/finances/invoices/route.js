import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

function stripe(key, path, method = 'GET', body = null) {
  const opts = {
    method,
    headers: { Authorization: `Bearer ${key}` },
  };
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
    const data = await stripe(key, '/invoices?limit=20');
    return NextResponse.json({ configured: true, invoices: data.data });
  } catch (err) {
    return NextResponse.json({ configured: true, error: err.message });
  }
}

export async function POST(request) {
  const authErr = await requireAuth(request);
  if (authErr) return authErr;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 });

  const { projectId, customerEmail, customerName, amountCents, description, dueDateUnix, currency = 'usd' } = await request.json();

  if (!customerEmail || !amountCents || amountCents <= 0) {
    return NextResponse.json({ error: 'customerEmail and amount are required' }, { status: 400 });
  }

  try {
    // 1. Find or create Stripe customer by email
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

    // 2. Add invoice line item
    const itemBody = {
      customer: customerId,
      amount: String(Math.round(amountCents)),
      currency,
      description: description || 'Design services',
    };
    const item = await stripe(key, '/invoiceitems', 'POST', itemBody);
    if (item.error) throw new Error(item.error.message);

    // 3. Create the invoice
    const invoiceBody = {
      customer: customerId,
      collection_method: 'send_invoice',
      description: description || 'Design services',
    };
    if (dueDateUnix) {
      invoiceBody.due_date = String(dueDateUnix);
    } else {
      invoiceBody.days_until_due = '30';
    }
    if (projectId) invoiceBody['metadata[project_id]'] = projectId;

    const invoice = await stripe(key, '/invoices', 'POST', invoiceBody);
    if (invoice.error) throw new Error(invoice.error.message);

    // 4. Finalize so it gets a number and hosted URL
    const finalized = await stripe(key, `/invoices/${invoice.id}/finalize`, 'POST');
    if (finalized.error) throw new Error(finalized.error.message);

    return NextResponse.json({
      id: finalized.id,
      number: finalized.number,
      url: finalized.hosted_invoice_url,
      status: finalized.status,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
