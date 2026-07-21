import { sendContactEmail } from '../utils/contactEmail'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX = {
  name: 120,
  email: 254,
  interest: 200,
  message: 5000,
} as const

interface ContactBody {
  name?: unknown
  email?: unknown
  interest?: unknown
  message?: unknown
  /** Honeypot — must stay empty */
  website?: unknown
}

function trimStr(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
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

  const name = trimStr(body.name, MAX.name)
  const email = trimStr(body.email, MAX.email).toLowerCase()
  const interest = trimStr(body.interest, MAX.interest)
  const message = trimStr(body.message, MAX.message)

  const fieldErrors: Record<string, string> = {}

  if (!name) fieldErrors.name = 'required'
  else if (name.length < 2) fieldErrors.name = 'too_short'

  if (!email) fieldErrors.email = 'required'
  else if (!EMAIL_RE.test(email)) fieldErrors.email = 'invalid'

  if (!message) fieldErrors.message = 'required'
  else if (message.length < 10) fieldErrors.message = 'too_short'

  if (Object.keys(fieldErrors).length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: { fieldErrors },
    })
  }

  const config = useRuntimeConfig()
  const to = String(config.contactTo || '').trim() || 'arditbhoti@gmail.com'

  const result = await sendContactEmail({
    name,
    email,
    interest: interest || undefined,
    message,
    to,
  })

  if (!result.sent) {
    if (result.reason === 'not_configured') {
      // Dev-friendly: accept the message so the UI can be tested without Resend
      console.info('[contact] Accepted (email not configured)', { name, email, interest })
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
