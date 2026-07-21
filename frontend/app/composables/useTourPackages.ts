import type { StrapiMedia, StrapiTourPackage, TourPackage } from '~/types/package'

function cmsLocale(code: string) {
  return code === 'ja' ? 'ja' : 'en'
}

function mediaUrl(strapiUrl: string, media?: StrapiMedia | null): string | null {
  if (!media?.url) return null
  if (media.url.startsWith('http')) return media.url
  return `${strapiUrl}${media.url}`
}

function mapPackage(strapiUrl: string, item: StrapiTourPackage): TourPackage {
  return {
    id: item.documentId || item.id,
    documentId: item.documentId,
    title: item.title,
    slug: item.slug,
    summary: item.summary || '',
    description: item.description || '',
    destination: item.destination,
    region: item.region || '',
    durationDays: item.durationDays,
    priceFrom: Number(item.priceFrom),
    currency: normalizeCurrency(item.currency),
    featured: Boolean(item.featured),
    difficulty: item.difficulty || 'moderate',
    highlights: Array.isArray(item.highlights) ? item.highlights : [],
    heroImageUrl: mediaUrl(strapiUrl, item.heroImage),
  }
}

/** ISO 4217 codes only — CMS sometimes stores labels like "DOLLARS". */
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
  const config = useRuntimeConfig()
  const { locale } = useI18n()
  const strapiUrl = String(config.public.strapiUrl || 'http://127.0.0.1:1337')
    .replace(/\/$/, '')
    .replace('://localhost', '://127.0.0.1')

  async function fetchPackages(localeCode?: string): Promise<TourPackage[]> {
    try {
      const data = await $fetch<{ data: StrapiTourPackage[] }>(`${strapiUrl}/api/tour-packages`, {
        query: {
          locale: cmsLocale(localeCode || locale.value),
          populate: 'heroImage',
          'filters[publishedAt][$notNull]': 'true',
          sort: 'featured:desc,title:asc',
        },
      })

      if (!data?.data?.length) return []
      return data.data.map((item) => mapPackage(strapiUrl, item))
    } catch (err) {
      console.error('[packages] Failed to load from Strapi', err)
      return []
    }
  }

  async function fetchPackageBySlug(slug: string, localeCode?: string): Promise<TourPackage | null> {
    try {
      const data = await $fetch<{ data: StrapiTourPackage[] }>(`${strapiUrl}/api/tour-packages`, {
        query: {
          locale: cmsLocale(localeCode || locale.value),
          'filters[slug][$eq]': slug,
          populate: '*',
        },
      })

      const item = data?.data?.[0]
      if (!item) return null
      return mapPackage(strapiUrl, item)
    } catch (err) {
      console.error('[packages] Failed to load package from Strapi', slug, err)
      return null
    }
  }

  return {
    fetchPackages,
    fetchPackageBySlug,
    formatPrice,
  }
}
