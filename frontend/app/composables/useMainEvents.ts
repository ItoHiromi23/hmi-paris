import type { MainEvent, StrapiMainEvent } from '~/types/event'
import type { StrapiMedia } from '~/types/package'

function cmsLocale(code: string) {
  return code === 'ja' ? 'ja' : 'en'
}

function mediaUrl(strapiUrl: string, media?: StrapiMedia | null): string | null {
  if (!media?.url) return null
  if (media.url.startsWith('http')) return media.url
  return `${strapiUrl}${media.url}`
}

function mapEvent(strapiUrl: string, item: StrapiMainEvent): MainEvent {
  return {
    id: item.documentId || item.id,
    documentId: item.documentId,
    title: item.title,
    slug: item.slug,
    label: item.label || '',
    badgeText: item.badgeText || '',
    category: item.category || '',
    summary: item.summary || '',
    description: item.description || '',
    inclusions: Array.isArray(item.inclusions) ? item.inclusions : [],
    heroImageUrl: mediaUrl(strapiUrl, item.heroImage) || item.heroImageUrl || null,
    eventDate: item.eventDate || null,
    venue: item.venue || '',
    priceFrom: item.priceFrom != null ? Number(item.priceFrom) : null,
    currency: item.currency || 'EUR',
    ctaLabel: item.ctaLabel || '',
    featured: Boolean(item.featured),
    sortOrder: item.sortOrder ?? 0,
    notes: item.notes || '',
  }
}

/** Locale-aware date: 4 Oct 2026 (Sun) / 2026年10月4日（日） */
export function formatJaDate(iso: string | null | undefined) {
  if (!iso) return ''
  const d = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(d.getTime())) return iso

  let locale = 'en'
  try {
    locale = useI18n().locale.value
  } catch {
    /* outside setup */
  }

  if (locale === 'ja') {
    const weekdays = ['日', '月', '火', '水', '木', '金', '土']
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${weekdays[d.getDay()]}）`
  }

  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    weekday: 'short',
  })
}

export function useMainEvents() {
  const config = useRuntimeConfig()
  const { t, locale } = useI18n()
  const strapiUrl = String(config.public.strapiUrl || 'http://127.0.0.1:1337')
    .replace(/\/$/, '')
    .replace('://localhost', '://127.0.0.1')
  const { formatPrice } = useTourPackages()

  function withFallbacks(event: MainEvent): MainEvent {
    return {
      ...event,
      category: event.category || t('events.categoryFallback'),
      ctaLabel: event.ctaLabel || t('events.detailCta'),
    }
  }

  async function fetchEvents(): Promise<MainEvent[]> {
    try {
      const data = await $fetch<{ data: StrapiMainEvent[] }>(`${strapiUrl}/api/main-events`, {
        query: {
          locale: cmsLocale(locale.value),
          populate: 'heroImage',
          'filters[publishedAt][$notNull]': 'true',
          sort: 'sortOrder:asc,eventDate:asc',
        },
      })

      if (!data?.data?.length) return []
      return data.data.map((item) => withFallbacks(mapEvent(strapiUrl, item)))
    } catch (err) {
      console.error('[events] Failed to load from Strapi', err)
      return []
    }
  }

  async function fetchEventBySlug(slug: string): Promise<MainEvent | null> {
    try {
      const data = await $fetch<{ data: StrapiMainEvent[] }>(`${strapiUrl}/api/main-events`, {
        query: {
          locale: cmsLocale(locale.value),
          'filters[slug][$eq]': slug,
          populate: '*',
        },
      })

      const item = data?.data?.[0]
      if (!item) return null
      return withFallbacks(mapEvent(strapiUrl, item))
    } catch (err) {
      console.error('[events] Failed to load event from Strapi', slug, err)
      return null
    }
  }

  return {
    fetchEvents,
    fetchEventBySlug,
    formatJaDate,
    formatPrice,
  }
}
