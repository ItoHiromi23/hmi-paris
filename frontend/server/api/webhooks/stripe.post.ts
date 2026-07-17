import type Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const webhookSecret = config.stripeWebhookSecret as string
  if (!webhookSecret) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Stripe webhook secret is not configured',
    })
  }

  const signature = getHeader(event, 'stripe-signature')
  if (!signature) {
    throw createError({ statusCode: 400, statusMessage: 'Missing Stripe signature' })
  }

  const rawBody = await readRawBody(event)
  if (!rawBody) {
    throw createError({ statusCode: 400, statusMessage: 'Empty body' })
  }

  const stripe = useStripe()
  let stripeEvent: Stripe.Event
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid signature'
    throw createError({ statusCode: 400, statusMessage: message })
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session
    await fulfillPaidCheckoutSession(session, 'Paid via Stripe Checkout')
  }

  if (stripeEvent.type === 'checkout.session.expired') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session
    const meta = session.metadata || {}
    if (meta.orderNumber && meta.packageSlug) {
      await syncOrderToStrapi({
        orderNumber: meta.orderNumber,
        productType: meta.productType === 'event' ? 'event' : 'package',
        packageSlug: meta.packageSlug,
        packageTitle: meta.packageTitle || 'Package',
        slotsReserved: Math.max(1, Number(meta.slotsReserved || 1)),
        amount: session.amount_total != null ? session.amount_total / 100 : 0,
        currency: (session.currency || 'eur').toUpperCase(),
        customerName: meta.customerName || null,
        customerEmail: session.customer_email || null,
        customerPhone: meta.customerPhone || null,
        status: 'cancelled',
        stripeSessionId: session.id,
        notes: 'Checkout session expired',
      })
    }
  }

  return { received: true }
})
