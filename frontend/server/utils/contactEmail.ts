import { Resend } from 'resend'

export interface ContactEmailPayload {
  name: string
  email: string
  interest?: string
  message: string
  to: string
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

function buildHtml(payload: ContactEmailPayload) {
  const interestRow = payload.interest
    ? `<tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #64748b;">Interest</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${escapeHtml(payload.interest)}</td>
    </tr>`
    : ''

  return `<!DOCTYPE html>
<html>
<body style="font-family: Georgia, serif; color: #1a2332; line-height: 1.6; max-width: 560px; margin: 0 auto; padding: 24px;">
  <p style="letter-spacing: 0.2em; text-transform: uppercase; font-size: 11px; color: #0f766e;">HMI Paris</p>
  <h1 style="font-size: 28px; font-weight: 400; margin: 8px 0 16px;">New contact message</h1>
  <table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 14px;">
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #64748b;">Name</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${escapeHtml(payload.name)}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #64748b;">Email</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
        <a href="mailto:${escapeHtml(payload.email)}" style="color: #0f766e;">${escapeHtml(payload.email)}</a>
      </td>
    </tr>
    ${interestRow}
  </table>
  <p style="font-size: 14px; color: #64748b; margin-bottom: 8px;">Message</p>
  <p style="white-space: pre-wrap; font-size: 15px; margin: 0;">${escapeHtml(payload.message)}</p>
  <p style="margin-top: 32px; font-size: 13px; color: #64748b;">
    Reply directly to this email to respond to ${escapeHtml(payload.name)}.
  </p>
</body>
</html>`
}

function buildText(payload: ContactEmailPayload) {
  return [
    'New contact message from the HMI Paris website',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    ...(payload.interest ? [`Interest: ${payload.interest}`] : []),
    '',
    'Message:',
    payload.message,
    '',
    '— Reply to this email to respond to the sender.',
  ].join('\n')
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
    const subjectInterest = payload.interest?.trim()
      ? ` — ${payload.interest.trim().slice(0, 60)}`
      : ''

    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from,
      to: payload.to,
      replyTo: payload.email,
      subject: `Contact: ${payload.name}${subjectInterest}`,
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
