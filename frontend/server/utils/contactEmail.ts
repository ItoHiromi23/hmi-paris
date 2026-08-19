import { Resend } from 'resend'

export interface ContactEmailPayload {
  firstName: string
  lastName: string
  email: string
  people?: number | null
  date?: string
  description: string
  to: string
  tourTitle?: string
  tourSlug?: string
  formType?: 'enquiry' | 'reservation'
  service?: string
  preferredDate?: string
  secondDate?: string
  hotel?: string
  phone?: string
  source?: string
}

export interface ContactEmailResult {
  sent: boolean
  provider: 'resend' | 'none'
  reason?: string
  detail?: string
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
  if (!isoDate) return '未定'
  const d = new Date(`${isoDate}T12:00:00`)
  if (Number.isNaN(d.getTime())) return isoDate
  return d.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function fullName(payload: ContactEmailPayload) {
  return `${payload.firstName} ${payload.lastName}`.trim()
}

function row(label: string, value: string) {
  return `<tr>
      <td translate="no" style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #64748b;">${escapeHtml(label)}</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${value}</td>
    </tr>`
}

function buildReservationHtml(payload: ContactEmailPayload) {
  const name = fullName(payload)
  const people = payload.people ? String(payload.people) : '未定'
  return `<!DOCTYPE html>
<html lang="ja">
<body style="font-family: 'Hiragino Mincho ProN', Georgia, serif; color: #1a2332; line-height: 1.6; max-width: 560px; margin: 0 auto; padding: 24px;">
  <p style="letter-spacing: 0.2em; text-transform: uppercase; font-size: 11px; color: #a9854c;">HMI PARIS</p>
  <h1 translate="no" style="font-size: 28px; font-weight: 400; margin: 8px 0 16px;">ご予約・お問い合わせ</h1>
  <table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 14px;">
    ${row('ご希望のサービス／ツアー', escapeHtml(payload.service || '—'))}
    ${row('お名前', escapeHtml(name))}
    ${row('メールアドレス', `<a href="mailto:${escapeHtml(payload.email)}" style="color: #a9854c;">${escapeHtml(payload.email)}</a>`)}
    ${row('電話番号', escapeHtml(payload.phone || '—'))}
    ${row('ご希望日', escapeHtml(formatDateLabel(payload.preferredDate || '')))}
    ${row('第2希望日', escapeHtml(formatDateLabel(payload.secondDate || '')))}
    ${row('参加人数', escapeHtml(people))}
    ${row('ご宿泊ホテル', escapeHtml(payload.hotel || '—'))}
  </table>
  <p translate="no" style="font-size: 14px; color: #64748b; margin-bottom: 8px;">ご希望・お問い合わせ内容</p>
  <p style="white-space: pre-wrap; font-size: 15px; margin: 0;">${escapeHtml(payload.description)}</p>
  <p style="margin-top: 32px; font-size: 13px; color: #64748b;">
    このメールに返信すると ${escapeHtml(name)} 様へ直接届きます。
  </p>
</body>
</html>`
}

function buildReservationText(payload: ContactEmailPayload) {
  const name = fullName(payload)
  return [
    'HMI PARIS ご予約・お問い合わせ',
    '',
    `ご希望のサービス／ツアー: ${payload.service || '—'}`,
    `お名前: ${name}`,
    `メールアドレス: ${payload.email}`,
    `電話番号: ${payload.phone || '—'}`,
    `ご希望日: ${formatDateLabel(payload.preferredDate || '')}`,
    `第2希望日: ${formatDateLabel(payload.secondDate || '')}`,
    `参加人数: ${payload.people ?? '未定'}`,
    `ご宿泊ホテル: ${payload.hotel || '—'}`,
    '',
    'ご希望・お問い合わせ内容:',
    payload.description,
    '',
    '— このメールに返信すると送信者へ届きます。',
  ].join('\n')
}

function buildHtml(payload: ContactEmailPayload) {
  if (payload.formType === 'reservation') return buildReservationHtml(payload)

  const name = fullName(payload)
  const tourRow = payload.tourTitle ? row('Tour', escapeHtml(payload.tourTitle)) : ''

  return `<!DOCTYPE html>
<html>
<body style="font-family: Georgia, serif; color: #1a2332; line-height: 1.6; max-width: 560px; margin: 0 auto; padding: 24px;">
  <p style="letter-spacing: 0.2em; text-transform: uppercase; font-size: 11px; color: #0f766e;">HMI Paris</p>
  <h1 style="font-size: 28px; font-weight: 400; margin: 8px 0 16px;">New enquiry</h1>
  <table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 14px;">
    ${tourRow}
    ${row('First name', escapeHtml(payload.firstName))}
    ${row('Last name', escapeHtml(payload.lastName))}
    ${row('Email', `<a href="mailto:${escapeHtml(payload.email)}" style="color: #0f766e;">${escapeHtml(payload.email)}</a>`)}
    ${row('Number of people', String(payload.people ?? ''))}
    ${row('Date', escapeHtml(formatDateLabel(payload.date || '')))}
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
  if (payload.formType === 'reservation') return buildReservationText(payload)

  const lines = [
    'New enquiry from the HMI Paris website',
    '',
    payload.tourTitle ? `Tour: ${payload.tourTitle}` : null,
    `First name: ${payload.firstName}`,
    `Last name: ${payload.lastName}`,
    `Email: ${payload.email}`,
    `Number of people: ${payload.people}`,
    `Date: ${formatDateLabel(payload.date || '')}`,
    '',
    'Description:',
    payload.description,
    '',
    '— Reply to this email to respond to the sender.',
  ]
  return lines.filter((line) => line !== null).join('\n')
}

function env(name: string) {
  return String(process.env[name] || '').trim()
}

/**
 * Sends a contact-form enquiry via Resend when RESEND_API_KEY is set.
 * Sets replyTo to the visitor so studio staff can answer in-thread.
 */
export async function sendContactEmail(
  payload: ContactEmailPayload,
): Promise<ContactEmailResult> {
  const config = useRuntimeConfig()
  const apiKey =
    String(config.resendApiKey || '').trim() ||
    env('RESEND_API_KEY') ||
    env('NUXT_RESEND_API_KEY')
  const from =
    String(config.emailFrom || '').trim() ||
    env('EMAIL_FROM') ||
    env('NUXT_EMAIL_FROM') ||
    'HMI Paris <onboarding@resend.dev>'

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
    const subject =
      payload.formType === 'reservation'
        ? `ご予約・お問い合わせ: ${name} — ${payload.service || 'HMI Paris'}`
        : `Enquiry: ${name}${payload.tourTitle ? ` — ${payload.tourTitle}` : ''} — ${formatDateLabel(payload.date || '')} (${payload.people})`
    const { data, error } = await resend.emails.send({
      from,
      to: payload.to,
      replyTo: payload.email,
      subject,
      html: buildHtml(payload),
      text: buildText(payload),
    })

    if (error) {
      console.error('[email] Resend error', {
        name: error.name,
        message: error.message,
        from,
        to: payload.to,
      })
      return {
        sent: false,
        provider: 'resend',
        reason: 'send_failed',
        detail: error.message,
      }
    }

    return { sent: true, provider: 'resend', id: data?.id }
  } catch (err) {
    console.error('[email] Failed to send contact message', err)
    return {
      sent: false,
      provider: 'resend',
      reason: 'send_failed',
      detail: err instanceof Error ? err.message : 'send_failed',
    }
  }
}
