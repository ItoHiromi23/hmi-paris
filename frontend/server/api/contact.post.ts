import { getPackageBySlug } from '~/data/packages'
import { sendContactEmail } from '../utils/contactEmail'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const PHONE_RE = /^\+?[0-9][0-9\s().-]{6,38}$/
/** Latin letters only (A–Z), with spaces, hyphens, apostrophes. */
const LATIN_NAME_RE = /^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/
const MAX = {
  name: 80,
  email: 254,
  description: 5000,
  hotel: 160,
  phone: 40,
  service: 80,
} as const

const ALLOWED_SERVICES = new Set([
  'パリ街歩きツアー',
  'モンサンミッシェル',
  'ジヴェルニー＆ヴェトゥイユ',
  'オーヴェル＝シュル＝オワーズ',
  'ヴェルサイユ宮殿',
  'シャンパーニュ地方',
  '凱旋門賞2026 観戦バスツアー',
  '専用車＆日本語ガイド',
  '空港送迎',
  '通訳・アテンド・視察同行',
  'オーダーメイド手配',
  'その他',
])

interface ContactBody {
  formType?: unknown
  firstName?: unknown
  lastName?: unknown
  email?: unknown
  people?: unknown
  date?: unknown
  description?: unknown
  tourSlug?: unknown
  name?: unknown
  service?: unknown
  preferredDate?: unknown
  secondDate?: unknown
  partySize?: unknown
  hotel?: unknown
  phone?: unknown
  message?: unknown
  source?: unknown
  /** Honeypot — must stay empty */
  website?: unknown
}

function trimStr(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

function parsePeople(value: unknown, max = 50): number | null {
  const n =
    typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? Number(value.trim())
        : Number(String(value ?? '').trim())
  if (!Number.isInteger(n) || n < 1 || n > max) return null
  return n
}

function isEmpty(value: unknown): boolean {
  return value === undefined || value === null || String(value).trim() === ''
}

function parseOptionalDate(value: unknown): { date: string; error?: string } {
  const date = trimStr(value, 32)
  if (!date) return { date: '' }
  if (!DATE_RE.test(date) || Number.isNaN(Date.parse(`${date}T12:00:00`))) {
    return { date, error: 'invalid' }
  }
  if (date < todayIso()) return { date, error: 'past' }
  return { date }
}

/** Today (local calendar day) — reservation dates may be today or later. */
function todayIso(): string {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
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

function resolveTourRecipient(tourSlug: string): { to: string; title: string } | null {
  if (!tourSlug) return null
  const tour = getPackageBySlug(tourSlug)
  if (!tour) return null
  return {
    to: String(tour.enquiryEmail || '').trim(),
    title: String(tour.title || tourSlug).trim(),
  }
}

async function deliver(payload: Parameters<typeof sendContactEmail>[0]) {
  const result = await sendContactEmail(payload)

  if (!result.sent) {
    if (result.reason === 'not_configured') {
      console.info('[contact] Accepted (email not configured)', {
        formType: payload.formType || 'enquiry',
        email: payload.email,
        service: payload.service,
        tourSlug: payload.tourSlug,
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

  const config = useRuntimeConfig()
  const fallbackTo = String(config.contactTo || '').trim() || 'arditbhoti@gmail.com'

  if (body.formType === 'reservation') {
    const name = trimStr(body.name, MAX.name)
    const email = trimStr(body.email, MAX.email).toLowerCase()
    const service = trimStr(body.service, MAX.service)
    const message = trimStr(body.message, MAX.description)
    const hotel = trimStr(body.hotel, MAX.hotel)
    const phone = trimStr(body.phone, MAX.phone)
    const preferred = parseOptionalDate(body.preferredDate)
    const second = parseOptionalDate(body.secondDate)
    const partyEmpty = isEmpty(body.partySize)
    const partySize = partyEmpty ? null : parsePeople(body.partySize, 30)

    const fieldErrors: Record<string, string> = {}
    if (!name) fieldErrors.name = 'required'
    else if (name.length < 2) fieldErrors.name = 'too_short'
    if (!email) fieldErrors.email = 'required'
    else if (!EMAIL_RE.test(email)) fieldErrors.email = 'invalid'
    if (!service || !ALLOWED_SERVICES.has(service)) fieldErrors.service = 'required'
    if (!message) fieldErrors.message = 'required'
    if (!partyEmpty && partySize === null) fieldErrors.partySize = 'invalid'
    if (phone && !PHONE_RE.test(phone)) fieldErrors.phone = 'invalid'
    if (preferred.error) fieldErrors.preferredDate = preferred.error
    if (second.error) fieldErrors.secondDate = second.error
    if (
      preferred.date &&
      second.date &&
      !preferred.error &&
      !second.error &&
      second.date < preferred.date
    ) {
      fieldErrors.secondDate = 'order'
    }

    if (Object.keys(fieldErrors).length) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation failed',
        data: { fieldErrors },
      })
    }

    return deliver({
      formType: 'reservation',
      firstName: name,
      lastName: '',
      email,
      people: partySize,
      date: preferred.date,
      description: message,
      to: fallbackTo,
      service,
      preferredDate: preferred.date,
      secondDate: second.date,
      hotel,
      phone,
      source: trimStr(body.source, 80),
    })
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
    fieldErrors.people = isEmpty(body.people) ? 'required' : 'invalid'
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

  let to = fallbackTo
  let tourTitle = ''
  if (tourSlug) {
    const tour = resolveTourRecipient(tourSlug)
    if (!tour) {
      throw createError({ statusCode: 404, statusMessage: 'Tour not found' })
    }
    tourTitle = tour.title
    if (tour.to.includes('@')) to = tour.to
  }

  return deliver({
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
})
