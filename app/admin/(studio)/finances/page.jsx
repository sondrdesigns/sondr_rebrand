'use client';
import { useState, useEffect } from 'react';

const labelStyle = {
  fontSize: 9,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--ink-soft)',
  fontFamily: 'var(--font-mono)',
  marginBottom: 6,
  display: 'block',
};

function cents(amount, currency = 'usd') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount / 100);
}

function StatTile({ label, value, sub }) {
  return (
    <div style={{
      background: 'rgb(255,255,255)',
      border: '1px solid var(--ink)',
      padding: '28px 24px',
      flex: 1,
    }}>
      <span style={labelStyle}>{label}</span>
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 36,
        fontWeight: 400,
        color: 'var(--ink)',
        lineHeight: 1,
        marginBottom: 8,
      }}>
        {value}
      </div>
      {sub && (
        <div style={{
          fontSize: 11,
          color: 'var(--ink-soft)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.06em',
        }}>
          {sub}
        </div>
      )}
    </div>
  );
}

export default function FinancesPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/finances/overview').then(r => r.json()),
      fetch('/api/admin/finances/invoices').then(r => r.json()),
    ]).then(([overview, inv]) => {
      setData(overview);
      setInvoices(inv);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        letterSpacing: '0.18em',
        color: 'var(--ink-soft)',
      }}>
        loading finances…
      </div>
    );
  }

  if (!data?.configured) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--paper)', fontFamily: 'var(--font-mono)' }}>
        <div style={{
          padding: '40px 56px 32px',
          borderBottom: '1.5px solid var(--ink)',
        }}>
          <div style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 6 }}>
            financial records
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 28, fontWeight: 400 }}>
            Finances
          </div>
        </div>
        <div style={{
          maxWidth: 540,
          margin: '80px auto',
          textAlign: 'center',
          border: '1px solid var(--ink)',
          padding: '56px 48px',
          background: 'rgb(255,255,255)',
        }}>
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 28,
            marginBottom: 16,
          }}>
            Connect Stripe
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            color: 'var(--ink-soft)',
            lineHeight: 1.75,
            marginBottom: 32,
          }}>
            Add your Stripe secret key to unlock financial records, invoice history, and revenue tracking.
          </div>
          <pre style={{
            background: 'rgba(0,0,0,0.04)',
            padding: '16px 20px',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            textAlign: 'left',
            marginBottom: 32,
            letterSpacing: '0.04em',
          }}>
            {`# .env.local\nSTRIPE_SECRET_KEY=sk_live_...`}
          </pre>
          <a
            href="https://dashboard.stripe.com/apikeys"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              borderBottom: '1px solid var(--ink)',
              paddingBottom: 2,
              textDecoration: 'none',
            }}
          >
            Get your key from Stripe Dashboard →
          </a>
        </div>
      </div>
    );
  }

  const available = data.balance?.available?.[0];
  const pending = data.balance?.pending?.[0];
  const recentCharges = data.charges || [];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', fontFamily: 'var(--font-mono)' }}>
      {/* Header */}
      <div style={{
        padding: '40px 56px 32px',
        borderBottom: '1.5px solid var(--ink)',
      }}>
        <div style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 6 }}>
          financial records
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 28, fontWeight: 400 }}>
          Finances
        </div>
      </div>

      <div style={{ padding: '40px 56px' }}>
        {/* Balance tiles */}
        <div style={{ display: 'flex', gap: 1, marginBottom: 48 }}>
          <StatTile
            label="Available Balance"
            value={available ? cents(available.amount, available.currency) : '—'}
            sub={available?.currency?.toUpperCase()}
          />
          <StatTile
            label="Pending"
            value={pending ? cents(pending.amount, pending.currency) : '—'}
            sub="awaiting settlement"
          />
          <StatTile
            label="Recent Charges"
            value={recentCharges.length}
            sub="last 5"
          />
        </div>

        {/* Recent Charges */}
        {recentCharges.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <div style={{
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
              marginBottom: 16,
              paddingBottom: 12,
              borderBottom: '1px solid rgba(0,0,0,0.1)',
            }}>
              Recent Charges
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  {['Description', 'Amount', 'Status', 'Date'].map(h => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        padding: '0 24px 12px 0',
                        fontSize: 9,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-soft)',
                        fontWeight: 400,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentCharges.map(charge => (
                  <tr key={charge.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <td style={{ padding: '14px 24px 14px 0', fontSize: 14, letterSpacing: '0.04em' }}>
                      {charge.description || charge.statement_descriptor || '—'}
                    </td>
                    <td style={{ padding: '14px 24px 14px 0', fontSize: 14 }}>
                      {cents(charge.amount, charge.currency)}
                    </td>
                    <td style={{ padding: '14px 24px 14px 0' }}>
                      <span style={{
                        fontSize: 10,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: charge.status === 'succeeded' ? 'rgb(0,0,0)' : 'var(--ink-soft)',
                      }}>
                        {charge.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 0', fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>
                      {new Date(charge.created * 1000).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Invoices */}
        {invoices?.invoices?.length > 0 && (
          <div>
            <div style={{
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
              marginBottom: 16,
              paddingBottom: 12,
              borderBottom: '1px solid rgba(0,0,0,0.1)',
            }}>
              Invoices
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  {['Number', 'Customer', 'Amount Due', 'Status', 'Due'].map(h => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        padding: '0 24px 12px 0',
                        fontSize: 9,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-soft)',
                        fontWeight: 400,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.invoices.map(inv => (
                  <tr key={inv.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <td style={{ padding: '14px 24px 14px 0', fontSize: 13, letterSpacing: '0.06em' }}>
                      {inv.number || inv.id.slice(0, 8)}
                    </td>
                    <td style={{ padding: '14px 24px 14px 0', fontSize: 13, color: 'var(--ink-soft)' }}>
                      {inv.customer_email || '—'}
                    </td>
                    <td style={{ padding: '14px 24px 14px 0', fontSize: 14 }}>
                      {cents(inv.amount_due, inv.currency)}
                    </td>
                    <td style={{ padding: '14px 24px 14px 0' }}>
                      <span style={{
                        fontSize: 10,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: inv.status === 'paid' ? 'rgb(0,0,0)' : inv.status === 'open' ? 'var(--ikb)' : 'var(--ink-soft)',
                      }}>
                        {inv.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 0', fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>
                      {inv.due_date
                        ? new Date(inv.due_date * 1000).toLocaleDateString('en-GB', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })
                        : '—'}
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
