import type { MainEvent, StrapiMainEvent } from '~/types/event'
import type { StrapiMedia } from '~/types/package'
import { computeAvailability } from '~/types/package'
import { fetchAvailability } from '~/composables/useAvailability'

function mediaUrl(strapiUrl: string, media?: StrapiMedia | null): string | null {
  if (!media?.url) return null
  if (media.url.startsWith('http')) return media.url
  return `${strapiUrl}${media.url}`
}

function mapEvent(strapiUrl: string, item: StrapiMainEvent): MainEvent {
  const capacity = computeAvailability({
    bookingUnlimited: item.bookingUnlimited,
    slotsTotal: item.slotsTotal ?? 20,
    slotsSold: item.slotsSold ?? 0,
  })

  return {
    id: item.documentId || item.id,
    documentId: item.documentId,
    title: item.title,
    slug: item.slug,
    label: item.label || '',
    badgeText: item.badgeText || '',
    category: item.category || '季節限定・特別イベント',
    summary: item.summary || '',
    description: item.description || '',
    inclusions: Array.isArray(item.inclusions) ? item.inclusions : [],
    heroImageUrl: mediaUrl(strapiUrl, item.heroImage) || item.heroImageUrl || null,
    eventDate: item.eventDate || null,
    venue: item.venue || '',
    priceFrom: item.priceFrom != null ? Number(item.priceFrom) : null,
    currency: item.currency || 'EUR',
    ctaLabel: item.ctaLabel || '詳細を見る',
    featured: Boolean(item.featured),
    sortOrder: item.sortOrder ?? 0,
    notes: item.notes || '',
    bookingUnlimited: capacity.bookingUnlimited,
    slotsTotal: capacity.slotsTotal,
    slotsSold: capacity.slotsSold,
    available: capacity.available,
    soldOut: capacity.soldOut,
  }
}

/** 日本語向け：例）2026年10月4日（日） */
export function formatJaDate(iso: string | null | undefined) {
  if (!iso) return ''
  const d = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  const weekdays = ['日', '月', '火', '水', '木', '金', '土']
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${weekdays[d.getDay()]}）`
}

export function useMainEvents() {
  const config = useRuntimeConfig()
  const strapiUrl = String(config.public.strapiUrl || 'http://127.0.0.1:1337')
    .replace(/\/$/, '')
    .replace('://localhost', '://127.0.0.1')
  const { formatPrice } = useTourPackages()

  async function fetchEvents(): Promise<MainEvent[]> {
    try {
      const data = await $fetch<{ data: StrapiMainEvent[] }>(`${strapiUrl}/api/main-events`, {
        query: {
          populate: 'heroImage',
          'filters[publishedAt][$notNull]': 'true',
          sort: 'sortOrder:asc,eventDate:asc',
        },
      })

      if (!data?.data?.length) return []
      return Promise.all(
        data.data.map(async (item) => {
          const base = mapEvent(strapiUrl, item)
          const live = await fetchAvailability('event', base.slug, strapiUrl)
          if (!live) return base
          return {
            ...base,
            bookingUnlimited: live.bookingUnlimited,
            slotsTotal: live.slotsTotal,
            slotsSold: live.slotsSold,
            available: live.available,
            soldOut: live.soldOut,
          }
        }),
      )
    } catch (err) {
      console.error('[events] Failed to load from Strapi', err)
      return []
    }
  }

  async function fetchEventBySlug(slug: string): Promise<MainEvent | null> {
    try {
      const data = await $fetch<{ data: StrapiMainEvent[] }>(`${strapiUrl}/api/main-events`, {
        query: {
          'filters[slug][$eq]': slug,
          populate: '*',
        },
      })

      const item = data?.data?.[0]
      if (!item) return null

      const mapped = mapEvent(strapiUrl, item)
      const live = await fetchAvailability('event', slug, strapiUrl)
      if (!live) return mapped
      return {
        ...mapped,
        bookingUnlimited: live.bookingUnlimited,
        slotsTotal: live.slotsTotal,
        slotsSold: live.slotsSold,
        available: live.available,
        soldOut: live.soldOut,
      }
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
