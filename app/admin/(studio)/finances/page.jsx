'use client';
import { useState, useEffect } from 'react';

const label = {
  fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
  color: 'var(--ink-soft)', fontFamily: 'var(--font-mono)', marginBottom: 8, display: 'block',
};

const input = {
  display: 'block', width: '100%', boxSizing: 'border-box',
  background: 'transparent', border: '1px solid rgba(0,0,0,0.2)',
  padding: '11px 14px', fontSize: 13, fontFamily: 'var(--font-mono)',
  color: 'var(--ink)', letterSpacing: '0.04em', outline: 'none',
};

function fmt(amount, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: currency.toUpperCase(), minimumFractionDigits: 2,
  }).format(amount / 100);
}

function StatTile({ label: lbl, value, sub }) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--ink)', padding: '28px 24px', flex: 1 }}>
      <span style={label}>{lbl}</span>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 400, color: 'var(--ink)', lineHeight: 1, marginBottom: 8 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 11, color: 'var(--ink-soft)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>{sub}</div>}
    </div>
  );
}

const BLANK_FORM = {
  projectId: '', customerEmail: '', customerName: '',
  amount: '', description: '', dueDate: '', currency: 'usd',
};

export default function FinancesPage() {
  const [data, setData]       = useState(null);
  const [invoices, setInvoices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [form, setForm]       = useState(BLANK_FORM);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [created, setCreated] = useState(null);

  function loadInvoices() {
    return fetch('/api/admin/finances/invoices').then(r => r.json()).then(setInvoices);
  }

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/finances/overview').then(r => r.json()),
      loadInvoices(),
    ]).then(([overview]) => {
      setData(overview);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (showForm && projects.length === 0) {
      fetch('/api/admin/projects').then(r => r.json()).then(p => setProjects(p || []));
    }
  }, [showForm]);

  function setField(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function handleProjectSelect(projectId) {
    const p = projects.find(x => x.id === projectId);
    if (p) {
      setForm(f => ({
        ...f,
        projectId,
        description: p.client
          ? `Design services — ${p.name} (${p.client})`
          : `Design services — ${p.name}`,
        amount: p.budget ? String(p.budget) : f.amount,
        customerName: p.client || f.customerName,
      }));
    } else {
      setField('projectId', projectId);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    setCreating(true);
    setCreateError('');
    setCreated(null);
    try {
      const amountCents = Math.round(parseFloat(form.amount) * 100);
      const res = await fetch('/api/admin/finances/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: form.projectId || null,
          customerEmail: form.customerEmail.trim(),
          customerName: form.customerName.trim(),
          amountCents,
          description: form.description.trim(),
          dueDateUnix: form.dueDate
            ? Math.floor(new Date(form.dueDate).getTime() / 1000)
            : null,
          currency: form.currency,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to create invoice');
      setCreated(result);
      setForm(BLANK_FORM);
      loadInvoices();
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.18em', color: 'var(--ink-soft)' }}>
        loading finances…
      </div>
    );
  }

  if (!data?.configured) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--paper)', fontFamily: 'var(--font-mono)' }}>
        <div style={{ padding: '40px 56px 32px', borderBottom: '1.5px solid var(--ink)' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 6 }}>financial records</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 28, fontWeight: 400 }}>Finances</div>
        </div>
        <div style={{ maxWidth: 540, margin: '80px auto', textAlign: 'center', border: '1px solid var(--ink)', padding: '56px 48px', background: '#fff' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 28, marginBottom: 16 }}>Connect Stripe</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: 32 }}>
            Add your Stripe secret key to unlock financial records, invoice history, and revenue tracking.
          </div>
          <pre style={{ background: 'rgba(0,0,0,0.04)', padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: 12, textAlign: 'left', marginBottom: 32, letterSpacing: '0.04em' }}>
            {`STRIPE_SECRET_KEY=sk_live_...`}
          </pre>
        </div>
      </div>
    );
  }

  const available = data.balance?.available?.[0];
  const pending   = data.balance?.pending?.[0];
  const recentCharges = data.charges || [];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', fontFamily: 'var(--font-mono)' }}>
      {/* Header */}
      <div style={{ padding: '40px 56px 32px', borderBottom: '1.5px solid var(--ink)', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 6 }}>financial records</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 28, fontWeight: 400 }}>Finances</div>
        </div>
        <button
          onClick={() => { setShowForm(v => !v); setCreated(null); setCreateError(''); }}
          style={{
            padding: '12px 24px', background: showForm ? 'var(--ink)' : 'transparent',
            color: showForm ? 'rgb(255,251,240)' : 'var(--ink)',
            border: '1.5px solid var(--ink)', cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
          }}
        >
          {showForm ? '✕ Cancel' : '+ New Invoice'}
        </button>
      </div>

      {/* Invoice creation panel */}
      {showForm && (
        <div style={{ borderBottom: '1.5px solid rgba(0,0,0,0.12)', background: '#fff', padding: '40px 56px' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 20, fontWeight: 400, marginBottom: 32 }}>
            Create Invoice
          </div>

          {created ? (
            <div style={{ maxWidth: 520 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ikb, rgb(0,47,167))' }} />
                <span style={{ fontSize: 13, letterSpacing: '0.06em' }}>
                  Invoice {created.number} created
                </span>
              </div>
              {created.url && (
                <div style={{ marginBottom: 24 }}>
                  <span style={label}>Hosted Invoice Link</span>
                  <a
                    href={created.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 12, color: 'var(--ikb, rgb(0,47,167))', letterSpacing: '0.04em', wordBreak: 'break-all' }}
                  >
                    {created.url}
                  </a>
                </div>
              )}
              <div style={{ display: 'flex', gap: 12 }}>
                {created.url && (
                  <button
                    onClick={() => navigator.clipboard.writeText(created.url)}
                    style={{ padding: '10px 20px', background: 'var(--ink)', color: 'rgb(255,251,240)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }}
                  >
                    Copy Link
                  </button>
                )}
                <button
                  onClick={() => { setCreated(null); setForm(BLANK_FORM); }}
                  style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(0,0,0,0.2)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}
                >
                  New Invoice
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreate} style={{ maxWidth: 720 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 40px', marginBottom: 28 }}>

                {/* Project */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={label}>Project</span>
                  <select
                    value={form.projectId}
                    onChange={e => handleProjectSelect(e.target.value)}
                    style={{ ...input, appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="">— Select a project (optional) —</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name}{p.client ? ` — ${p.client}` : ''}{p.budget ? ` (£${p.budget.toLocaleString()})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Customer email */}
                <div>
                  <span style={label}>Customer Email *</span>
                  <input
                    type="email"
                    required
                    placeholder="client@company.com"
                    value={form.customerEmail}
                    onChange={e => setField('customerEmail', e.target.value)}
                    style={input}
                  />
                </div>

                {/* Customer name */}
                <div>
                  <span style={label}>Customer / Company Name</span>
                  <input
                    type="text"
                    placeholder="e.g. Acme Corp"
                    value={form.customerName}
                    onChange={e => setField('customerName', e.target.value)}
                    style={input}
                  />
                </div>

                {/* Amount */}
                <div>
                  <span style={label}>Amount ({form.currency.toUpperCase()}) *</span>
                  <input
                    type="number"
                    required
                    min="0.01"
                    step="0.01"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={e => setField('amount', e.target.value)}
                    style={input}
                  />
                </div>

                {/* Currency */}
                <div>
                  <span style={label}>Currency</span>
                  <select
                    value={form.currency}
                    onChange={e => setField('currency', e.target.value)}
                    style={{ ...input, appearance: 'none', cursor: 'pointer' }}
                  >
                    {['usd', 'gbp', 'eur', 'aud', 'cad'].map(c => (
                      <option key={c} value={c}>{c.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                {/* Due date */}
                <div>
                  <span style={label}>Due Date (default 30 days)</span>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={e => setField('dueDate', e.target.value)}
                    style={input}
                  />
                </div>

                {/* Description */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={label}>Description</span>
                  <input
                    type="text"
                    placeholder="Design services — Project name"
                    value={form.description}
                    onChange={e => setField('description', e.target.value)}
                    style={input}
                  />
                </div>
              </div>

              {createError && (
                <div style={{ marginBottom: 20, fontSize: 12, color: 'rgb(180,0,0)', letterSpacing: '0.04em' }}>
                  {createError}
                </div>
              )}

              <button
                type="submit"
                disabled={creating}
                style={{
                  padding: '14px 36px', background: 'var(--ink)', color: 'rgb(255,251,240)',
                  border: 'none', cursor: creating ? 'default' : 'pointer',
                  fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                }}
              >
                {creating ? 'Creating…' : 'Create Invoice'}
              </button>
            </form>
          )}
        </div>
      )}

      <div style={{ padding: '40px 56px' }}>
        {/* Balance tiles */}
        <div style={{ display: 'flex', gap: 1, marginBottom: 48 }}>
          <StatTile
            label="Available Balance"
            value={available ? fmt(available.amount, available.currency) : '—'}
            sub={available?.currency?.toUpperCase()}
          />
          <StatTile
            label="Pending"
            value={pending ? fmt(pending.amount, pending.currency) : '—'}
            sub="awaiting settlement"
          />
          <StatTile
            label="Recent Charges"
            value={recentCharges.length}
            sub="last 5"
          />
        </div>

        {/* Invoices */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
            Invoices
          </div>
          {invoices?.invoices?.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  {['Number', 'Customer', 'Amount', 'Status', 'Due', ''].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0 20px 12px 0', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', fontWeight: 400 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.invoices.map(inv => (
                  <tr key={inv.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <td style={{ padding: '14px 20px 14px 0', fontSize: 13, letterSpacing: '0.06em' }}>
                      {inv.number || inv.id.slice(0, 8)}
                    </td>
                    <td style={{ padding: '14px 20px 14px 0', fontSize: 13, color: 'var(--ink-soft)' }}>
                      {inv.customer_email || '—'}
                    </td>
                    <td style={{ padding: '14px 20px 14px 0', fontSize: 14 }}>
                      {fmt(inv.amount_due, inv.currency)}
                    </td>
                    <td style={{ padding: '14px 20px 14px 0' }}>
                      <span style={{
                        fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                        color: inv.status === 'paid' ? 'rgb(0,0,0)' : inv.status === 'open' ? 'var(--ikb, rgb(0,47,167))' : 'var(--ink-soft)',
                      }}>
                        {inv.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px 14px 0', fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>
                      {inv.due_date ? new Date(inv.due_date * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td style={{ padding: '14px 0' }}>
                      {inv.hosted_invoice_url && (
                        <a
                          href={inv.hosted_invoice_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ikb, rgb(0,47,167))', textDecoration: 'none' }}
                        >
                          View →
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', fontStyle: 'italic', fontFamily: 'var(--font-serif)', paddingTop: 24 }}>
              No invoices yet.
            </div>
          )}
        </div>

        {/* Recent Charges */}
        {recentCharges.length > 0 && (
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
              Recent Charges
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  {['Description', 'Amount', 'Status', 'Date'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0 20px 12px 0', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', fontWeight: 400 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentCharges.map(charge => (
                  <tr key={charge.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <td style={{ padding: '14px 20px 14px 0', fontSize: 14, letterSpacing: '0.04em' }}>{charge.description || charge.statement_descriptor || '—'}</td>
                    <td style={{ padding: '14px 20px 14px 0', fontSize: 14 }}>{fmt(charge.amount, charge.currency)}</td>
                    <td style={{ padding: '14px 20px 14px 0' }}>
                      <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: charge.status === 'succeeded' ? 'rgb(0,0,0)' : 'var(--ink-soft)' }}>
                        {charge.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 0', fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>
                      {new Date(charge.created * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
