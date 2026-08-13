import { getEventBySlug, getFeaturedEvent, mainEvents } from '~/data/events'
import { normalizeCurrency } from '~/composables/useTourPackages'

/** Locale-aware date: 4 Oct 2026 (Sun) / 2026年10月4日（日） */
export function formatJaDate(iso: string | null | undefined) {
  if (!iso) return ''
  const d = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(d.getTime())) return iso

  let locale = 'ja'
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
  const { formatPrice } = useTourPackages()

  return {
    events: mainEvents,
    getEventBySlug,
    getFeaturedEvent,
    formatJaDate,
    formatPrice,
    normalizeCurrency,
  }
}
