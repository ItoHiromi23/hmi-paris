import type {
  EventCancellationRow,
  EventDetailRow,
  EventHighlight,
  EventNavLink,
  EventScheduleItem,
  MainEvent,
  StrapiMainEvent,
} from '~/types/event'
import type { StrapiMedia } from '~/types/package'
import { normalizeCurrency } from '~/composables/useTourPackages'

function cmsLocale(code: string) {
  return code === 'ja' ? 'ja' : 'en'
}

function mediaUrl(strapiUrl: string, media?: StrapiMedia | null): string | null {
  if (!media?.url) return null
  if (media.url.startsWith('http')) return media.url
  return `${strapiUrl}${media.url}`
}

function asString(value: unknown) {
  return typeof value === 'string' ? value : ''
}

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.map((item) => String(item)).filter(Boolean)
}

function asNavLinks(value: unknown): EventNavLink[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const row = item as Record<string, unknown>
      const href = asString(row.href).trim()
      const label = asString(row.label).trim()
      if (!href || !label) return null
      return { href, label }
    })
    .filter((item): item is EventNavLink => Boolean(item))
}

function asHighlights(value: unknown): EventHighlight[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const row = item as Record<string, unknown>
      const title = asString(row.title).trim()
      const body = asString(row.body).trim()
      if (!title && !body) return null
      return {
        num: asString(row.num),
        title,
        body,
        caveat: asString(row.caveat),
      }
    })
    .filter((item): item is EventHighlight => Boolean(item))
}

function asSchedule(value: unknown): EventScheduleItem[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const row = item as Record<string, unknown>
      const time = asString(row.time).trim()
      const what = asString(row.what).trim()
      if (!time && !what) return null
      return { time, what }
    })
    .filter((item): item is EventScheduleItem => Boolean(item))
}

function asDetailRows(value: unknown): EventDetailRow[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const row = item as Record<string, unknown>
      const label = asString(row.label).trim()
      const valueText = asString(row.value).trim()
      if (!label && !valueText) return null
      return { label, value: valueText }
    })
    .filter((item): item is EventDetailRow => Boolean(item))
}

function asCancellationRows(value: unknown): EventCancellationRow[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const row = item as Record<string, unknown>
      const when = asString(row.when).trim()
      const fee = asString(row.fee).trim()
      if (!when && !fee) return null
      return { when, fee }
    })
    .filter((item): item is EventCancellationRow => Boolean(item))
}

function mapEvent(strapiUrl: string, item: StrapiMainEvent): MainEvent {
  return {
    id: item.documentId || item.id,
    documentId: item.documentId,
    title: item.title,
    slug: item.slug,
    label: asString(item.label),
    badgeText: asString(item.badgeText),
    category: asString(item.category),
    summary: asString(item.summary),
    description: asString(item.description),
    subLatin: asString(item.subLatin),
    edition: asString(item.edition),
    guideLabel: asString(item.guideLabel),
    navLinks: asNavLinks(item.navLinks),
    aboutKicker: asString(item.aboutKicker),
    aboutTitle: asString(item.aboutTitle),
    aboutLead: asString(item.aboutLead),
    aboutBody: asString(item.aboutBody),
    aboutImageUrl: mediaUrl(strapiUrl, item.aboutImage) || item.aboutImageUrl || null,
    aboutImageCaption: asString(item.aboutImageCaption),
    highlightsKicker: asString(item.highlightsKicker),
    highlightsTitle: asString(item.highlightsTitle),
    highlights: asHighlights(item.highlights),
    highlightsImageUrl:
      mediaUrl(strapiUrl, item.highlightsImage) || item.highlightsImageUrl || null,
    highlightsImageCaption: asString(item.highlightsImageCaption),
    tourKicker: asString(item.tourKicker),
    tourTitle: asString(item.tourTitle),
    inclusions: asStringList(item.inclusions),
    exclusions: asStringList(item.exclusions),
    exclusionsTitle: asString(item.exclusionsTitle),
    tourNote: asString(item.tourNote),
    flowKicker: asString(item.flowKicker),
    flowTitle: asString(item.flowTitle),
    schedule: asSchedule(item.schedule),
    meetingTitle: asString(item.meetingTitle),
    meetingBody: asString(item.meetingBody),
    meetingCaveat: asString(item.meetingCaveat),
    meetingImageUrl: mediaUrl(strapiUrl, item.meetingImage) || item.meetingImageUrl || null,
    meetingImageCaption: asString(item.meetingImageCaption),
    flowNote: asString(item.flowNote),
    detailsKicker: asString(item.detailsKicker),
    detailsTitle: asString(item.detailsTitle),
    detailRows: asDetailRows(item.detailRows),
    cancellationTitle: asString(item.cancellationTitle),
    cancellationHeaderWhen: asString(item.cancellationHeaderWhen),
    cancellationHeaderFee: asString(item.cancellationHeaderFee),
    cancellationRows: asCancellationRows(item.cancellationRows),
    detailsNote: asString(item.detailsNote),
    bookingKicker: asString(item.bookingKicker),
    bookingTitle: asString(item.bookingTitle),
    bookingSteps: asSchedule(item.bookingSteps),
    notesKicker: asString(item.notesKicker),
    notesTitle: asString(item.notesTitle),
    notesList: asStringList(item.notesList),
    ctaKicker: asString(item.ctaKicker),
    ctaTitle: asString(item.ctaTitle),
    ctaButton: asString(item.ctaButton),
    ctaScarce: asString(item.ctaScarce),
    heroImageUrl: mediaUrl(strapiUrl, item.heroImage) || item.heroImageUrl || null,
    eventDate: item.eventDate || null,
    venue: asString(item.venue),
    priceFrom: item.priceFrom != null ? Number(item.priceFrom) : null,
    currency: normalizeCurrency(item.currency),
    ctaLabel: asString(item.ctaLabel),
    featured: Boolean(item.featured),
    sortOrder: item.sortOrder ?? 0,
    notes: asString(item.notes),
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
  const { locale } = useI18n()
  const strapiUrl = String(config.public.strapiUrl || 'http://127.0.0.1:1337')
    .replace(/\/$/, '')
    .replace('://localhost', '://127.0.0.1')
  const { formatPrice } = useTourPackages()

  async function fetchEvents(localeCode?: string): Promise<MainEvent[]> {
    try {
      const data = await $fetch<{ data: StrapiMainEvent[] }>(`${strapiUrl}/api/main-events`, {
        query: {
          locale: cmsLocale(localeCode || locale.value),
          populate: 'heroImage',
          'filters[publishedAt][$notNull]': 'true',
          sort: 'sortOrder:asc,eventDate:asc',
        },
      })

      if (!data?.data?.length) return []
      return data.data.map((item) => mapEvent(strapiUrl, item))
    } catch (err) {
      console.error('[events] Failed to load from Strapi', err)
      return []
    }
  }

  async function fetchEventBySlug(slug: string, localeCode?: string): Promise<MainEvent | null> {
    try {
      const data = await $fetch<{ data: StrapiMainEvent[] }>(`${strapiUrl}/api/main-events`, {
        query: {
          locale: cmsLocale(localeCode || locale.value),
          'filters[slug][$eq]': slug,
          populate: '*',
        },
      })

      const item = data?.data?.[0]
      if (!item) return null
      return mapEvent(strapiUrl, item)
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
