import { getPackageBySlug, tourPackages } from '~/data/packages'

/** ISO 4217 codes only — content sometimes stores labels like "DOLLARS". */
const CURRENCY_ALIASES: Record<string, string> = {
  EUR: 'EUR',
  EURO: 'EUR',
  EUROS: 'EUR',
  USD: 'USD',
  DOLLAR: 'USD',
  DOLLARS: 'USD',
  US$: 'USD',
  JPY: 'JPY',
  YEN: 'JPY',
  GBP: 'GBP',
  POUND: 'GBP',
  POUNDS: 'GBP',
}

export function normalizeCurrency(value?: string | null, fallback = 'EUR'): string {
  const raw = String(value || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
  if (!raw) return fallback
  if (CURRENCY_ALIASES[raw]) return CURRENCY_ALIASES[raw]
  if (/^[A-Z]{3}$/.test(raw)) return raw
  return fallback
}

export function formatPrice(amount: number, currency = 'EUR') {
  const code = normalizeCurrency(currency)
  try {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: code,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${Number(amount).toLocaleString('en-GB')} ${code}`
  }
}

export function useTourPackages() {
  return {
    packages: tourPackages,
    getPackageBySlug,
    formatPrice,
  }
}
