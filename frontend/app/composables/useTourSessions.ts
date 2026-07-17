export interface TourSessionSlot {
  sessionDocumentId: string
  packageSlug: string
  startsAt: string
  endsAt: string
  status: string
  label: string | null
  capacity: number
  sold: number
  pending: number
  available: number
  soldOut: boolean
}

export interface SessionDayOption {
  key: string
  label: string
  weekday: string
  dayNum: string
  month: string
  total: number
  open: number
  busy: boolean
}

function strapiBaseUrl() {
  const config = useRuntimeConfig()
  return String(config.public.strapiUrl || 'http://127.0.0.1:1337')
    .replace(/\/$/, '')
    .replace('://localhost', '://127.0.0.1')
}

export async function fetchTourSessions(slug: string): Promise<TourSessionSlot[]> {
  const strapiUrl = strapiBaseUrl()
  try {
    const res = await $fetch<{ data: TourSessionSlot[] }>(
      `${strapiUrl}/api/inventory/sessions`,
      { query: { slug } },
    )
    return res?.data || []
  } catch {
    return []
  }
}

/** YYYY-MM-DD in Europe/Paris */
export function sessionDateKey(iso: string) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(iso))
}

export function formatSessionDay(iso: string) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(new Date(iso))
}

export function formatSessionTime(iso: string) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

/** Group sessions by calendar day — include busy (fully reserved) days */
export function buildSessionDayOptions(sessions: TourSessionSlot[]): SessionDayOption[] {
  const map = new Map<
    string,
    { key: string; startsAt: string; total: number; open: number }
  >()

  for (const s of sessions) {
    const key = sessionDateKey(s.startsAt)
    const existing = map.get(key)
    if (existing) {
      existing.total += 1
      if (!s.soldOut) existing.open += 1
    } else {
      map.set(key, {
        key,
        startsAt: s.startsAt,
        total: 1,
        open: s.soldOut ? 0 : 1,
      })
    }
  }

  return [...map.values()]
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((day) => {
      const weekday = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Paris',
        weekday: 'short',
      }).format(new Date(day.startsAt))
      const dayNum = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Paris',
        day: 'numeric',
      }).format(new Date(day.startsAt))
      const month = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Paris',
        month: 'short',
      }).format(new Date(day.startsAt))
      return {
        key: day.key,
        label: formatSessionDay(day.startsAt),
        weekday,
        dayNum,
        month,
        total: day.total,
        open: day.open,
        busy: day.open === 0,
      }
    })
}

export function useTourSessions() {
  return {
    fetchTourSessions,
    sessionDateKey,
    formatSessionDay,
    formatSessionTime,
    buildSessionDayOptions,
  }
}
