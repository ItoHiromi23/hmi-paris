import type Stripe from 'stripe'
import { sendBookingConfirmationEmail } from './bookingEmail'
import { syncOrderToStrapi } from './strapiOrders'

export async function fulfillPaidCheckoutSession(
  session: Stripe.Checkout.Session,
  notes: string,
) {
  const meta = session.metadata || {}
  const productType = meta.productType === 'event' ? 'event' : 'package'
  const slotsReserved = Math.max(1, Number(meta.slotsReserved || 1))
  const amountTotal = session.amount_total != null ? session.amount_total / 100 : 0
  const currency = (session.currency || 'eur').toUpperCase()
  const customerEmail =
    session.customer_details?.email || session.customer_email || null
  const customerName =
    meta.customerName || session.customer_details?.name || null
  const orderNumber =
    meta.orderNumber || `STRIPE-${session.id.slice(-8).toUpperCase()}`
  const packageSlug = meta.packageSlug || 'unknown'
  const packageTitle = meta.packageTitle || 'Package'

  await syncOrderToStrapi({
    orderNumber,
    productType,
    packageSlug,
    packageTitle,
    slotsReserved,
    sessionDocumentId: meta.sessionDocumentId || null,
    sessionStartsAt: meta.sessionStartsAt || null,
    sessionEndsAt: meta.sessionEndsAt || null,
    amount: amountTotal,
    currency,
    customerName,
    customerEmail,
    customerPhone: meta.customerPhone || session.customer_details?.phone || null,
    status: 'paid',
    stripeSessionId: session.id,
    stripePaymentIntentId:
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id || null,
    paidAt: new Date().toISOString(),
    notes: meta.sessionLabel
      ? `${notes} · ${meta.sessionLabel}`
      : notes,
  })

  let emailSent = false
  let emailReason: string | undefined

  if (customerEmail && meta.confirmationEmailSent !== 'true') {
    const config = useRuntimeConfig()
    const siteUrl = (config.public.siteUrl as string) || 'http://localhost:3000'
    const result = await sendBookingConfirmationEmail({
      to: customerEmail,
      customerName,
      orderNumber,
      packageTitle,
      productType,
      amount: amountTotal,
      currency,
      siteUrl,
      sessionLabel: meta.sessionLabel || null,
    })

    emailSent = result.sent
    emailReason = result.reason

    if (result.sent) {
      const stripe = useStripe()
      await stripe.checkout.sessions
        .update(session.id, {
          metadata: {
            ...meta,
            confirmationEmailSent: 'true',
          },
        })
        .catch((err) => {
          console.warn('[email] Could not mark session confirmationEmailSent', err)
        })
    }
  } else if (meta.confirmationEmailSent === 'true') {
    emailReason = 'already_sent'
  } else {
    emailReason = 'missing_recipient'
  }

  return {
    orderNumber,
    packageSlug,
    packageTitle,
    productType,
    customerEmail,
    amountTotal,
    currency,
    sessionLabel: meta.sessionLabel || null,
    sessionStartsAt: meta.sessionStartsAt || null,
    emailSent,
    emailReason,
  }
}
