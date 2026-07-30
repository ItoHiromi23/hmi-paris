import { sendContactEmail } from '../utils/contactEmail'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
/** Latin letters only (A–Z), with spaces, hyphens, apostrophes. */
const LATIN_NAME_RE = /^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/
const MAX = {
  name: 80,
  email: 254,
  description: 5000,
} as const

interface ContactBody {
  firstName?: unknown
  lastName?: unknown
  email?: unknown
  people?: unknown
  date?: unknown
  description?: unknown
  tourSlug?: unknown
  /** Honeypot — must stay empty */
  website?: unknown
}

function trimStr(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

function parsePeople(value: unknown): number | null {
  const n =
    typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? Number(value.trim())
        : Number(String(value ?? '').trim())
  if (!Number.isInteger(n) || n < 1 || n > 50) return null
  return n
}

/** Earliest allowed trip date: tomorrow (local calendar day). */
function minAllowedDate(): string {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 1)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

async function resolveTourRecipient(tourSlug: string): Promise<{
  to: string
  title: string
} | null> {
  const config = useRuntimeConfig()
  const strapiUrl = String(config.public.strapiUrl || '')
    .replace(/\/$/, '')
    .replace('://localhost', '://127.0.0.1')
  if (!strapiUrl || !tourSlug) return null

  try {
    const data = await $fetch<{
      data: Array<{ title?: string; enquiryEmail?: string | null }>
    }>(`${strapiUrl}/api/tour-packages`, {
      query: {
        locale: 'en',
        'filters[slug][$eq]': tourSlug,
        'fields[0]': 'title',
        'fields[1]': 'enquiryEmail',
        'pagination[pageSize]': 1,
      },
    })
    const item = data?.data?.[0]
    if (!item) return null
    return {
      to: String(item.enquiryEmail || '').trim(),
      title: String(item.title || tourSlug).trim(),
    }
  } catch (err) {
    console.error('[contact] Failed to resolve tour recipient', tourSlug, err)
    return null
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event).catch(() => null)

  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request body' })
  }

  // Honeypot: bots often fill hidden fields; treat as success without sending
  if (typeof body.website === 'string' && body.website.trim()) {
    return { ok: true }
  }

  const firstName = trimStr(body.firstName, MAX.name)
  const lastName = trimStr(body.lastName, MAX.name)
  const email = trimStr(body.email, MAX.email).toLowerCase()
  const people = parsePeople(body.people)
  const date = trimStr(body.date, 32)
  const description = trimStr(body.description, MAX.description)
  const tourSlug = trimStr(body.tourSlug, 120)

  const fieldErrors: Record<string, string> = {}

  if (!firstName) fieldErrors.firstName = 'required'
  else if (firstName.length < 2) fieldErrors.firstName = 'too_short'
  else if (!LATIN_NAME_RE.test(firstName)) fieldErrors.firstName = 'latin'

  if (!lastName) fieldErrors.lastName = 'required'
  else if (lastName.length < 2) fieldErrors.lastName = 'too_short'
  else if (!LATIN_NAME_RE.test(lastName)) fieldErrors.lastName = 'latin'

  if (!email) fieldErrors.email = 'required'
  else if (!EMAIL_RE.test(email)) fieldErrors.email = 'invalid'

  if (people === null) {
    fieldErrors.people =
      body.people === undefined || body.people === null || String(body.people).trim() === ''
        ? 'required'
        : 'invalid'
  }

  if (!date) fieldErrors.date = 'required'
  else if (!DATE_RE.test(date) || Number.isNaN(Date.parse(`${date}T12:00:00`))) {
    fieldErrors.date = 'invalid'
  } else if (date < minAllowedDate()) {
    fieldErrors.date = 'past'
  }

  if (!description) fieldErrors.description = 'required'
  else if (description.length < 10) fieldErrors.description = 'too_short'

  if (Object.keys(fieldErrors).length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: { fieldErrors },
    })
  }

  const config = useRuntimeConfig()
  const fallbackTo = String(config.contactTo || '').trim() || 'arditbhoti@gmail.com'

  let to = fallbackTo
  let tourTitle = ''
  if (tourSlug) {
    const tour = await resolveTourRecipient(tourSlug)
    if (!tour) {
      throw createError({ statusCode: 404, statusMessage: 'Tour not found' })
    }
    tourTitle = tour.title
    if (tour.to.includes('@')) to = tour.to
  }

  const result = await sendContactEmail({
    firstName,
    lastName,
    email,
    people: people!,
    date,
    description,
    to,
    tourTitle: tourTitle || undefined,
    tourSlug: tourSlug || undefined,
  })

  if (!result.sent) {
    if (result.reason === 'not_configured') {
      console.info('[contact] Accepted (email not configured)', {
        firstName,
        lastName,
        email,
        people,
        date,
        tourSlug,
      })
      return { ok: true, delivered: false, reason: 'not_configured' }
    }

    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to send message',
      data: { reason: result.reason || 'send_failed' },
    })
  }

  return { ok: true, delivered: true }
})
