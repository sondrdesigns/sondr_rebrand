'use client';
import { useState, useEffect } from 'react';

const label = {
  fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
  color: 'var(--ink-soft)', fontFamily: 'var(--font-mono)', marginBottom: 8, display: 'block',
};

const inp = {
  display: 'block', width: '100%', boxSizing: 'border-box',
  background: 'transparent', border: '1px solid rgba(0,0,0,0.2)',
  padding: '11px 14px', fontSize: 13, fontFamily: 'var(--font-mono)',
  color: 'var(--ink)', letterSpacing: '0.04em', outline: 'none',
};

const CURRENCIES = ['usd', 'gbp', 'eur', 'aud', 'cad'];

function fmt(amount, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: currency.toUpperCase(), minimumFractionDigits: 2,
  }).format(amount / 100);
}

function fmtDate(unix) {
  if (!unix) return '—';
  return new Date(unix * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
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

function HeaderBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 20px',
        background: active ? 'var(--ink)' : 'transparent',
        color: active ? 'rgb(255,251,240)' : 'var(--ink)',
        border: '1.5px solid var(--ink)', cursor: 'pointer',
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
      }}
    >
      {children}
    </button>
  );
}

function SectionHead({ children }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
      {children}
    </div>
  );
}

function ColHead({ children }) {
  return (
    <th style={{ textAlign: 'left', padding: '0 20px 12px 0', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', fontWeight: 400 }}>
      {children}
    </th>
  );
}

const BLANK_INV = { projectId: '', customerEmail: '', customerName: '', amount: '', description: '', dueDate: '', currency: 'usd' };
const BLANK_SUB = { customerEmail: '', customerName: '', planName: '', amount: '', currency: 'usd', interval: 'month', projectId: '' };

export default function FinancesPage() {
  const [data, setData]             = useState(null);
  const [invoices, setInvoices]     = useState(null);
  const [subs, setSubs]             = useState(null);
  const [loading, setLoading]       = useState(true);
  const [showPanel, setShowPanel]   = useState(null); // null | 'invoice' | 'retainer'
  const [projects, setProjects]     = useState([]);

  const [invForm, setInvForm]       = useState(BLANK_INV);
  const [creating, setCreating]     = useState(false);
  const [createError, setCreateError] = useState('');
  const [created, setCreated]       = useState(null);

  const [subForm, setSubForm]       = useState(BLANK_SUB);
  const [creatingSub, setCreatingSub] = useState(false);
  const [subError, setSubError]     = useState('');
  const [createdSub, setCreatedSub] = useState(null);

  const [voidingId, setVoidingId]   = useState(null);
  const [cancelingId, setCancelingId] = useState(null);

  function loadInvoices() {
    return fetch('/api/admin/finances/invoices').then(r => r.json()).then(setInvoices);
  }
  function loadSubs() {
    return fetch('/api/admin/finances/subscriptions').then(r => r.json()).then(setSubs);
  }

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/finances/overview').then(r => r.json()),
      loadInvoices(),
      loadSubs(),
    ]).then(([overview]) => {
      setData(overview);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (showPanel && projects.length === 0) {
      fetch('/api/admin/projects').then(r => r.json()).then(p => setProjects(p || []));
    }
  }, [showPanel]);

  function setInv(k, v) { setInvForm(f => ({ ...f, [k]: v })); }
  function setSub(k, v) { setSubForm(f => ({ ...f, [k]: v })); }

  function handleProjectSelect(projectId) {
    const p = projects.find(x => x.id === projectId);
    if (p) {
      setInvForm(f => ({
        ...f, projectId,
        description: p.client ? `Design services — ${p.name} (${p.client})` : `Design services — ${p.name}`,
        amount: p.budget ? String(p.budget) : f.amount,
        customerName: p.client || f.customerName,
      }));
    } else {
      setInv('projectId', projectId);
    }
  }

  async function handleCreateInvoice(e) {
    e.preventDefault();
    setCreating(true); setCreateError(''); setCreated(null);
    try {
      const res = await fetch('/api/admin/finances/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: invForm.projectId || null,
          customerEmail: invForm.customerEmail.trim(),
          customerName: invForm.customerName.trim(),
          amountCents: Math.round(parseFloat(invForm.amount) * 100),
          description: invForm.description.trim(),
          dueDateUnix: invForm.dueDate ? Math.floor(new Date(invForm.dueDate).getTime() / 1000) : null,
          currency: invForm.currency,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed');
      setCreated(result); setInvForm(BLANK_INV); loadInvoices();
    } catch (err) { setCreateError(err.message); }
    finally { setCreating(false); }
  }

  async function handleVoid(invoiceId) {
    if (!confirm('Void this invoice? The client will no longer be able to pay it.')) return;
    setVoidingId(invoiceId);
    try {
      const res = await fetch(`/api/admin/finances/invoices/${invoiceId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      loadInvoices();
    } catch (err) { alert(err.message); }
    finally { setVoidingId(null); }
  }

  async function handleCreateSub(e) {
    e.preventDefault();
    setCreatingSub(true); setSubError(''); setCreatedSub(null);
    try {
      const res = await fetch('/api/admin/finances/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: subForm.customerEmail.trim(),
          customerName: subForm.customerName.trim(),
          planName: subForm.planName.trim(),
          amountCents: Math.round(parseFloat(subForm.amount) * 100),
          currency: subForm.currency,
          interval: subForm.interval,
          projectId: subForm.projectId || null,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed');
      setCreatedSub(result); setSubForm(BLANK_SUB); loadSubs();
    } catch (err) { setSubError(err.message); }
    finally { setCreatingSub(false); }
  }

  async function handleCancelSub(subId) {
    if (!confirm('Cancel this retainer? The subscription will end at the current billing period.')) return;
    setCancelingId(subId);
    try {
      const res = await fetch(`/api/admin/finances/subscriptions/${subId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      loadSubs();
    } catch (err) { alert(err.message); }
    finally { setCancelingId(null); }
  }

  function togglePanel(panel) {
    setShowPanel(p => p === panel ? null : panel);
    setCreated(null); setCreateError('');
    setCreatedSub(null); setSubError('');
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
  const subList   = subs?.subscriptions || [];
  const invList   = invoices?.invoices || [];

  const activeSubCount = subList.filter(s => s.status === 'active' && !s.cancel_at_period_end).length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', fontFamily: 'var(--font-mono)' }}>

      {/* Header */}
      <div style={{ padding: '40px 56px 32px', borderBottom: '1.5px solid var(--ink)', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 6 }}>financial records</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 28, fontWeight: 400 }}>Finances</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <HeaderBtn active={showPanel === 'invoice'} onClick={() => togglePanel('invoice')}>
            {showPanel === 'invoice' ? '✕ Close' : '+ New Invoice'}
          </HeaderBtn>
          <HeaderBtn active={showPanel === 'retainer'} onClick={() => togglePanel('retainer')}>
            {showPanel === 'retainer' ? '✕ Close' : '+ New Retainer'}
          </HeaderBtn>
        </div>
      </div>

      {/* Invoice creation panel */}
      {showPanel === 'invoice' && (
        <div style={{ borderBottom: '1.5px solid rgba(0,0,0,0.12)', background: '#fff', padding: '40px 56px' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 20, marginBottom: 32 }}>Create Invoice</div>
          {created ? (
            <div style={{ maxWidth: 520 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ikb, rgb(0,47,167))' }} />
                <span style={{ fontSize: 13, letterSpacing: '0.06em' }}>Invoice {created.number} created</span>
              </div>
              {created.url && (
                <div style={{ marginBottom: 24 }}>
                  <span style={label}>Hosted Invoice Link</span>
                  <a href={created.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--ikb, rgb(0,47,167))', letterSpacing: '0.04em', wordBreak: 'break-all' }}>
                    {created.url}
                  </a>
                </div>
              )}
              <div style={{ display: 'flex', gap: 12 }}>
                {created.url && (
                  <button onClick={() => navigator.clipboard.writeText(created.url)} style={{ padding: '10px 20px', background: 'var(--ink)', color: 'rgb(255,251,240)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    Copy Link
                  </button>
                )}
                <button onClick={() => { setCreated(null); setInvForm(BLANK_INV); }} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(0,0,0,0.2)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
                  New Invoice
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreateInvoice} style={{ maxWidth: 720 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 40px', marginBottom: 28 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={label}>Project</span>
                  <select value={invForm.projectId} onChange={e => handleProjectSelect(e.target.value)} style={{ ...inp, appearance: 'none', cursor: 'pointer' }}>
                    <option value="">— Select a project (optional) —</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name}{p.client ? ` — ${p.client}` : ''}{p.budget ? ` (£${p.budget.toLocaleString()})` : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <span style={label}>Customer Email *</span>
                  <input type="email" required placeholder="client@company.com" value={invForm.customerEmail} onChange={e => setInv('customerEmail', e.target.value)} style={inp} />
                </div>
                <div>
                  <span style={label}>Customer / Company Name</span>
                  <input type="text" placeholder="e.g. Acme Corp" value={invForm.customerName} onChange={e => setInv('customerName', e.target.value)} style={inp} />
                </div>
                <div>
                  <span style={label}>Amount ({invForm.currency.toUpperCase()}) *</span>
                  <input type="number" required min="0.01" step="0.01" placeholder="0.00" value={invForm.amount} onChange={e => setInv('amount', e.target.value)} style={inp} />
                </div>
                <div>
                  <span style={label}>Currency</span>
                  <select value={invForm.currency} onChange={e => setInv('currency', e.target.value)} style={{ ...inp, appearance: 'none', cursor: 'pointer' }}>
                    {CURRENCIES.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                  </select>
                </div>
                <div>
                  <span style={label}>Due Date (default 30 days)</span>
                  <input type="date" value={invForm.dueDate} onChange={e => setInv('dueDate', e.target.value)} style={inp} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={label}>Description</span>
                  <input type="text" placeholder="Design services — Project name" value={invForm.description} onChange={e => setInv('description', e.target.value)} style={inp} />
                </div>
              </div>
              {createError && <div style={{ marginBottom: 20, fontSize: 12, color: 'rgb(180,0,0)', letterSpacing: '0.04em' }}>{createError}</div>}
              <button type="submit" disabled={creating} style={{ padding: '14px 36px', background: 'var(--ink)', color: 'rgb(255,251,240)', border: 'none', cursor: creating ? 'default' : 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                {creating ? 'Creating…' : 'Create Invoice'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Retainer creation panel */}
      {showPanel === 'retainer' && (
        <div style={{ borderBottom: '1.5px solid rgba(0,0,0,0.12)', background: '#fff', padding: '40px 56px' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 20, marginBottom: 8 }}>New Retainer</div>
          <div style={{ fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.04em', marginBottom: 32 }}>
            Creates a recurring subscription in Stripe. The first invoice is sent immediately; subsequent invoices auto-generate each billing period.
          </div>
          {createdSub ? (
            <div style={{ maxWidth: 520 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgb(0,140,80)' }} />
                <span style={{ fontSize: 13, letterSpacing: '0.06em' }}>Retainer activated — {createdSub.id}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.04em', marginBottom: 24 }}>
                First invoice has been sent. Next billing period ends {fmtDate(createdSub.currentPeriodEnd)}.
              </div>
              <button onClick={() => { setCreatedSub(null); setSubForm(BLANK_SUB); }} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(0,0,0,0.2)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
                New Retainer
              </button>
            </div>
          ) : (
            <form onSubmit={handleCreateSub} style={{ maxWidth: 720 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 40px', marginBottom: 28 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={label}>Plan Name *</span>
                  <input type="text" required placeholder="e.g. Security Retainer, Maintenance Plan" value={subForm.planName} onChange={e => setSub('planName', e.target.value)} style={inp} />
                </div>
                <div>
                  <span style={label}>Customer Email *</span>
                  <input type="email" required placeholder="client@company.com" value={subForm.customerEmail} onChange={e => setSub('customerEmail', e.target.value)} style={inp} />
                </div>
                <div>
                  <span style={label}>Customer / Company Name</span>
                  <input type="text" placeholder="e.g. Acme Corp" value={subForm.customerName} onChange={e => setSub('customerName', e.target.value)} style={inp} />
                </div>
                <div>
                  <span style={label}>Amount per Period ({subForm.currency.toUpperCase()}) *</span>
                  <input type="number" required min="0.01" step="0.01" placeholder="0.00" value={subForm.amount} onChange={e => setSub('amount', e.target.value)} style={inp} />
                </div>
                <div>
                  <span style={label}>Currency</span>
                  <select value={subForm.currency} onChange={e => setSub('currency', e.target.value)} style={{ ...inp, appearance: 'none', cursor: 'pointer' }}>
                    {CURRENCIES.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                  </select>
                </div>
                <div>
                  <span style={label}>Billing Interval</span>
                  <select value={subForm.interval} onChange={e => setSub('interval', e.target.value)} style={{ ...inp, appearance: 'none', cursor: 'pointer' }}>
                    <option value="month">Monthly</option>
                    <option value="year">Yearly</option>
                  </select>
                </div>
                <div>
                  <span style={label}>Linked Project (optional)</span>
                  <select value={subForm.projectId} onChange={e => setSub('projectId', e.target.value)} style={{ ...inp, appearance: 'none', cursor: 'pointer' }}>
                    <option value="">— None —</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}{p.client ? ` — ${p.client}` : ''}</option>)}
                  </select>
                </div>
              </div>
              {subError && <div style={{ marginBottom: 20, fontSize: 12, color: 'rgb(180,0,0)', letterSpacing: '0.04em' }}>{subError}</div>}
              <button type="submit" disabled={creatingSub} style={{ padding: '14px 36px', background: 'var(--ink)', color: 'rgb(255,251,240)', border: 'none', cursor: creatingSub ? 'default' : 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                {creatingSub ? 'Activating…' : 'Activate Retainer'}
              </button>
            </form>
          )}
        </div>
      )}

      <div style={{ padding: '40px 56px' }}>

        {/* Balance tiles */}
        <div style={{ display: 'flex', gap: 1, marginBottom: 48 }}>
          <StatTile label="Available Balance" value={available ? fmt(available.amount, available.currency) : '—'} sub={available?.currency?.toUpperCase()} />
          <StatTile label="Pending" value={pending ? fmt(pending.amount, pending.currency) : '—'} sub="awaiting settlement" />
          <StatTile label="Active Retainers" value={activeSubCount} sub={activeSubCount === 1 ? 'subscription' : 'subscriptions'} />
          <StatTile label="Recent Charges" value={recentCharges.length} sub="last 5" />
        </div>

        {/* Subscriptions */}
        <div style={{ marginBottom: 48 }}>
          <SectionHead>Retainers &amp; Subscriptions</SectionHead>
          {subList.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <ColHead>Plan</ColHead>
                  <ColHead>Customer</ColHead>
                  <ColHead>Amount</ColHead>
                  <ColHead>Interval</ColHead>
                  <ColHead>Status</ColHead>
                  <ColHead>Next Bill / Ends</ColHead>
                  <ColHead></ColHead>
                </tr>
              </thead>
              <tbody>
                {subList.map(sub => {
                  const price    = sub.items?.data?.[0]?.price;
                  const planName = sub.metadata?.plan_name || price?.nickname || 'Retainer';
                  const email    = typeof sub.customer === 'object' ? sub.customer?.email : null;
                  const canceling = sub.cancel_at_period_end;
                  const isActive  = sub.status === 'active' || sub.status === 'trialing';
                  return (
                    <tr key={sub.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      <td style={{ padding: '14px 20px 14px 0', fontSize: 13, letterSpacing: '0.06em' }}>{planName}</td>
                      <td style={{ padding: '14px 20px 14px 0', fontSize: 13, color: 'var(--ink-soft)' }}>{email || '—'}</td>
                      <td style={{ padding: '14px 20px 14px 0', fontSize: 14 }}>
                        {price ? fmt(price.unit_amount, price.currency) : '—'}
                      </td>
                      <td style={{ padding: '14px 20px 14px 0', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
                        {price?.recurring?.interval || '—'}
                      </td>
                      <td style={{ padding: '14px 20px 14px 0' }}>
                        <span style={{
                          fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                          color: canceling ? 'rgb(160,90,0)' : isActive ? 'rgb(0,120,60)' : sub.status === 'past_due' ? 'rgb(180,0,0)' : 'var(--ink-soft)',
                        }}>
                          {canceling ? 'canceling' : sub.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px 14px 0', fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>
                        {canceling ? `ends ${fmtDate(sub.cancel_at)}` : fmtDate(sub.current_period_end)}
                      </td>
                      <td style={{ padding: '14px 0' }}>
                        {isActive && !canceling && (
                          <button
                            onClick={() => handleCancelSub(sub.id)}
                            disabled={cancelingId === sub.id}
                            style={{ padding: '6px 14px', background: 'transparent', border: '1px solid rgba(180,0,0,0.3)', cursor: cancelingId === sub.id ? 'default' : 'pointer', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgb(180,0,0)' }}
                          >
                            {cancelingId === sub.id ? 'canceling…' : 'Cancel'}
                          </button>
                        )}
                        {canceling && (
                          <span style={{ fontSize: 10, color: 'var(--ink-soft)', letterSpacing: '0.1em' }}>period end</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', fontStyle: 'italic', fontFamily: 'var(--font-serif)', paddingTop: 24 }}>
              No retainers yet.
            </div>
          )}
        </div>

        {/* Invoices */}
        <div style={{ marginBottom: 48 }}>
          <SectionHead>Invoices</SectionHead>
          {invList.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <ColHead>Number</ColHead>
                  <ColHead>Customer</ColHead>
                  <ColHead>Amount</ColHead>
                  <ColHead>Status</ColHead>
                  <ColHead>Due</ColHead>
                  <ColHead></ColHead>
                </tr>
              </thead>
              <tbody>
                {invList.map(inv => (
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
                        color: inv.status === 'paid' ? 'rgb(0,120,60)' : inv.status === 'open' ? 'var(--ikb, rgb(0,47,167))' : inv.status === 'void' ? 'var(--ink-soft)' : 'var(--ink)',
                      }}>
                        {inv.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px 14px 0', fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>
                      {fmtDate(inv.due_date)}
                    </td>
                    <td style={{ padding: '14px 0', display: 'flex', gap: 12, alignItems: 'center' }}>
                      {inv.hosted_invoice_url && (
                        <a href={inv.hosted_invoice_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ikb, rgb(0,47,167))', textDecoration: 'none' }}>
                          View →
                        </a>
                      )}
                      {inv.status === 'open' && (
                        <button
                          onClick={() => handleVoid(inv.id)}
                          disabled={voidingId === inv.id}
                          style={{ padding: '6px 14px', background: 'transparent', border: '1px solid rgba(0,0,0,0.15)', cursor: voidingId === inv.id ? 'default' : 'pointer', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}
                        >
                          {voidingId === inv.id ? 'voiding…' : 'Void'}
                        </button>
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
            <SectionHead>Recent Charges</SectionHead>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <ColHead>Description</ColHead>
                  <ColHead>Amount</ColHead>
                  <ColHead>Status</ColHead>
                  <ColHead>Date</ColHead>
                </tr>
              </thead>
              <tbody>
                {recentCharges.map(charge => (
                  <tr key={charge.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <td style={{ padding: '14px 20px 14px 0', fontSize: 14, letterSpacing: '0.04em' }}>{charge.description || charge.statement_descriptor || '—'}</td>
                    <td style={{ padding: '14px 20px 14px 0', fontSize: 14 }}>{fmt(charge.amount, charge.currency)}</td>
                    <td style={{ padding: '14px 20px 14px 0' }}>
                      <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: charge.status === 'succeeded' ? 'rgb(0,120,60)' : 'var(--ink-soft)' }}>
                        {charge.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 0', fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>
                      {fmtDate(charge.created)}
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
