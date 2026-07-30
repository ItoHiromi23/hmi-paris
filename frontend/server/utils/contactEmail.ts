import { Resend } from 'resend'

export interface ContactEmailPayload {
  firstName: string
  lastName: string
  email: string
  people: number
  date: string
  description: string
  to: string
  tourTitle?: string
  tourSlug?: string
}

export interface ContactEmailResult {
  sent: boolean
  provider: 'resend' | 'none'
  reason?: string
  id?: string
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatDateLabel(isoDate: string) {
  const d = new Date(`${isoDate}T12:00:00`)
  if (Number.isNaN(d.getTime())) return isoDate
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function fullName(payload: ContactEmailPayload) {
  return `${payload.firstName} ${payload.lastName}`.trim()
}

function buildHtml(payload: ContactEmailPayload) {
  const name = fullName(payload)
  const tourRow = payload.tourTitle
    ? `<tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #64748b;">Tour</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${escapeHtml(payload.tourTitle)}</td>
    </tr>`
    : ''

  return `<!DOCTYPE html>
<html>
<body style="font-family: Georgia, serif; color: #1a2332; line-height: 1.6; max-width: 560px; margin: 0 auto; padding: 24px;">
  <p style="letter-spacing: 0.2em; text-transform: uppercase; font-size: 11px; color: #0f766e;">HMI Paris</p>
  <h1 style="font-size: 28px; font-weight: 400; margin: 8px 0 16px;">New enquiry</h1>
  <table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 14px;">
    ${tourRow}
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #64748b;">First name</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${escapeHtml(payload.firstName)}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #64748b;">Last name</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${escapeHtml(payload.lastName)}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #64748b;">Email</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
        <a href="mailto:${escapeHtml(payload.email)}" style="color: #0f766e;">${escapeHtml(payload.email)}</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #64748b;">Number of people</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${payload.people}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #64748b;">Date</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${escapeHtml(formatDateLabel(payload.date))}</td>
    </tr>
  </table>
  <p style="font-size: 14px; color: #64748b; margin-bottom: 8px;">Description</p>
  <p style="white-space: pre-wrap; font-size: 15px; margin: 0;">${escapeHtml(payload.description)}</p>
  <p style="margin-top: 32px; font-size: 13px; color: #64748b;">
    Reply directly to this email to respond to ${escapeHtml(name)}.
  </p>
</body>
</html>`
}

function buildText(payload: ContactEmailPayload) {
  const lines = [
    'New enquiry from the HMI Paris website',
    '',
    payload.tourTitle ? `Tour: ${payload.tourTitle}` : null,
    `First name: ${payload.firstName}`,
    `Last name: ${payload.lastName}`,
    `Email: ${payload.email}`,
    `Number of people: ${payload.people}`,
    `Date: ${formatDateLabel(payload.date)}`,
    '',
    'Description:',
    payload.description,
    '',
    '— Reply to this email to respond to the sender.',
  ]
  return lines.filter((line) => line !== null).join('\n')
}

/**
 * Sends a contact-form enquiry via Resend when RESEND_API_KEY is set.
 * Sets replyTo to the visitor so studio staff can answer in-thread.
 */
export async function sendContactEmail(
  payload: ContactEmailPayload,
): Promise<ContactEmailResult> {
  const config = useRuntimeConfig()
  const apiKey = String(config.resendApiKey || '')
  const from = String(config.emailFrom || 'onboarding@resend.dev')

  if (!payload.to?.includes('@')) {
    return { sent: false, provider: 'none', reason: 'missing_recipient' }
  }

  if (!apiKey) {
    console.info(
      `[email] Skipped contact message from ${payload.email} (set RESEND_API_KEY to enable)`,
    )
    return { sent: false, provider: 'none', reason: 'not_configured' }
  }

  try {
    const resend = new Resend(apiKey)
    const name = fullName(payload)
    const subjectTour = payload.tourTitle ? ` — ${payload.tourTitle}` : ''
    const { data, error } = await resend.emails.send({
      from,
      to: payload.to,
      replyTo: payload.email,
      subject: `Enquiry: ${name}${subjectTour} — ${formatDateLabel(payload.date)} (${payload.people})`,
      html: buildHtml(payload),
      text: buildText(payload),
    })

    if (error) {
      console.error('[email] Resend error', error)
      return { sent: false, provider: 'resend', reason: 'send_failed' }
    }

    return { sent: true, provider: 'resend', id: data?.id }
  } catch (err) {
    console.error('[email] Failed to send contact message', err)
    return { sent: false, provider: 'resend', reason: 'send_failed' }
  }
}
