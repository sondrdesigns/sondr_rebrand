const DEFAULT_GE_TAX_PERCENT = 4.712;
const GE_TAX_DISPLAY_NAME = 'Hawaii GE Tax';

function normalizePercent(value) {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100) {
    return DEFAULT_GE_TAX_PERCENT;
  }
  return parsed;
}

export function getGETaxPercent() {
  return normalizePercent(process.env.STRIPE_GE_TAX_PERCENT);
}

function samePercent(a, b) {
  return Math.abs(Number(a) - Number(b)) < 0.0001;
}

export async function getGETaxRateId(key, stripe) {
  if (process.env.STRIPE_GE_TAX_RATE_ID) {
    return process.env.STRIPE_GE_TAX_RATE_ID;
  }

  const percent = getGETaxPercent();
  const existing = await stripe(key, '/tax_rates?active=true&limit=100');
  if (existing.error) throw new Error(existing.error.message);

  const match = existing.data?.find(rate =>
    rate.display_name === GE_TAX_DISPLAY_NAME &&
    rate.inclusive === false &&
    rate.country === 'US' &&
    rate.state === 'HI' &&
    samePercent(rate.percentage, percent)
  );
  if (match) return match.id;

  const created = await stripe(key, '/tax_rates', 'POST', {
    display_name: GE_TAX_DISPLAY_NAME,
    inclusive: 'false',
    percentage: String(percent),
    country: 'US',
    state: 'HI',
    jurisdiction: 'Hawaii',
    description: 'Hawaii General Excise Tax pass-through',
  });
  if (created.error) throw new Error(created.error.message);

  return created.id;
}
