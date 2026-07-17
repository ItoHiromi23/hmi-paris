export interface BookingEmailPayload {
  to: string
  customerName?: string | null
  orderNumber: string
  packageTitle: string
  productType: 'package' | 'event'
  amount: number
  currency: string
  siteUrl: string
  sessionLabel?: string | null
}

export interface BookingEmailResult {
  sent: boolean
  provider: 'resend' | 'none'
  reason?: string
  id?: string
}

function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount)
  } catch {
    return `${amount} ${currency.toUpperCase()}`
  }
}

function buildHtml(payload: BookingEmailPayload) {
  const name = payload.customerName?.trim() || 'there'
  const kind = payload.productType === 'event' ? 'event' : 'package'
  const money = formatMoney(payload.amount, payload.currency)
  const site = payload.siteUrl.replace(/\/$/, '')

  return `<!DOCTYPE html>
<html>
<body style="font-family: Georgia, serif; color: #1a2332; line-height: 1.6; max-width: 560px; margin: 0 auto; padding: 24px;">
  <p style="letter-spacing: 0.2em; text-transform: uppercase; font-size: 11px; color: #0f766e;">HMI Paris</p>
  <h1 style="font-size: 28px; font-weight: 400; margin: 8px 0 16px;">Booking confirmed</h1>
  <p>Hi ${escapeHtml(name)},</p>
  <p>Thank you for your payment. Your ${kind} booking is confirmed.</p>
  <table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 14px;">
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #64748b;">Order</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right; font-family: monospace;">${escapeHtml(payload.orderNumber)}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #64748b;">Product</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${escapeHtml(payload.packageTitle)}</td>
    </tr>
    ${
      payload.sessionLabel
        ? `<tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #64748b;">Date & time</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${escapeHtml(payload.sessionLabel)}</td>
    </tr>`
        : ''
    }
    <tr>
      <td style="padding: 8px 0; color: #64748b;">Amount paid</td>
      <td style="padding: 8px 0; text-align: right; color: #0f766e; font-weight: 600;">${escapeHtml(money)}</td>
    </tr>
  </table>
  <p style="font-size: 14px; color: #64748b;">
    A payment receipt from Stripe may arrive separately.
    Questions? Reply to this email or write to
    <a href="mailto:info@hmiparis.com" style="color: #0f766e;">info@hmiparis.com</a>.
  </p>
  <p style="margin-top: 32px;">
    <a href="${escapeHtml(site)}" style="color: #0f766e;">Visit HMI Paris</a>
  </p>
</body>
</html>`
}

function buildText(payload: BookingEmailPayload) {
  const name = payload.customerName?.trim() || 'there'
  const kind = payload.productType === 'event' ? 'event' : 'package'
  const money = formatMoney(payload.amount, payload.currency)
  return [
    `Hi ${name},`,
    '',
    `Thank you for your payment. Your ${kind} booking is confirmed.`,
    '',
    `Order: ${payload.orderNumber}`,
    `Product: ${payload.packageTitle}`,
    ...(payload.sessionLabel ? [`Date & time: ${payload.sessionLabel}`] : []),
    `Amount paid: ${money}`,
    '',
    'A payment receipt from Stripe may arrive separately.',
    'Questions? Contact info@hmiparis.com',
    '',
    '— HMI Paris',
  ].join('\n')
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Sends a booking confirmation via Resend when RESEND_API_KEY is set.
 * Returns { sent: false } when email is not configured (safe for local/dev).
 */
export async function sendBookingConfirmationEmail(
  payload: BookingEmailPayload,
): Promise<BookingEmailResult> {
  const config = useRuntimeConfig()
  const apiKey = String(config.resendApiKey || '')
  const from = String(config.emailFrom || 'HMI Paris <onboarding@resend.dev>')

  if (!payload.to?.includes('@')) {
    return { sent: false, provider: 'none', reason: 'missing_recipient' }
  }

  if (!apiKey) {
    console.info(
      `[email] Skipped booking confirmation to ${payload.to} (set RESEND_API_KEY to enable)`,
      { orderNumber: payload.orderNumber },
    )
    return { sent: false, provider: 'none', reason: 'not_configured' }
  }

  try {
    const res = await $fetch<{ id?: string }>('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: {
        from,
        to: [payload.to],
        subject: `Booking confirmed — ${payload.packageTitle}`,
        html: buildHtml(payload),
        text: buildText(payload),
      },
    })

    return { sent: true, provider: 'resend', id: res?.id }
  } catch (err) {
    console.error('[email] Failed to send booking confirmation', err)
    return { sent: false, provider: 'resend', reason: 'send_failed' }
  }
}
